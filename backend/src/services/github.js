import { Router } from 'express';
import axios from 'axios';
import { db } from "../global.js";

export const router = Router();

export const id = 'github';
export const name = 'Github';
export const description = 'Github service';
export const color = '#999999';
export const icon = '/github.png';

export const connect = async (userId) => {
    const { githubClientId, githubClientSecret } = process.env;

    try {
        const url = 'https://github.com/login/oauth/authorize';
        const params = {
            client_id: githubClientId,
            redirect_uri: `${process.env.API_PUBLIC_URL}/en/service/oauth/${id}/callback?userId=${userId}`,
            scope: 'user repo',
        };
        const query = Object.keys(params).map((key) => `${key}=${encodeURIComponent(params[key])}`).join('&');
        return { status: "success", url: `${url}?${query}`, auth: true };
    } catch (error) {
        return { status: "error", msg: error };
    }
};

export const callback = async (code) => {
    const { githubClientId, githubClientSecret } = process.env;
    try {
        const response = await axios.post('https://github.com/login/oauth/access_token', {
            client_id: githubClientId,
            client_secret: githubClientSecret,
            code: code,
        }, {
            headers: {
                accept: 'application/json',
            },
        });
        const htmlResponse = `
            <html>
                <body>
                    <p>Vou can now close this window.</p>
                    <script>
                        window.close();
                    </script>
                </body>
            </html>
        `;
        return { status: "success", action: htmlResponse, token: response?.data?.access_token || undefined };
    } catch (error) {
        console.error(error);
        return { status: "error", msg: error };
    }
};

export const triggers = [
    {
        id: 1,
        name: 'New commit',
        description: 'Triggers when a new commit is pushed to a repository',
        fields: [
            {
                id: 'repository_name',
                name: 'Repository',
                description: 'The repository to watch',
                type: 'text'
            }
        ],
        check: async (autoId, userData, params, checkData, token) => {
            try {
                const resp = await axios.get(`https://api.github.com/repos/${params.repository_name}/commits`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        Accept: 'application/vnd.github+json'
                    }
                });
                const commits = resp.data;
                if (!commits || !commits.length)
                    return null;
                const lastCommit = commits[0];
                if (checkData.lastCommitSha && lastCommit.sha === checkData.lastCommitSha)
                    return null;
                db.updateAutomation(userData.id, autoId, `trigger_check_data = '${JSON.stringify({ lastCommitSha: lastCommit.sha })}'`);
                return {
                    text: `New commit from ${lastCommit.commit.author.name} in the repository ${params.repository_name}: \`${lastCommit.commit.message}\``,
                    data: { ...lastCommit.commit, sha: lastCommit.sha }
                };
            } catch (error) {
                console.error(error);
                return null;
            }
        }
    },
    // {
    //     id: 2,
    //     name: 'New issue',
    //     description: 'Triggers when a new issue is created',
    //     fields: [
    //         {
    //             id: 'repository_name',
    //             name: 'Repository',
    //             description: 'The repository to watch',
    //             type: 'text'
    //         }
    //     ],
    //     check: async (autoId, userData, params, checkData, token) => {
    //         return null;
    //     }
    // },
    // {
    //     id: 3,
    //     name: 'New pull request',
    //     description: 'Triggers when a new pull request is created',
    //     fields: [
    //         {
    //             id: 'repository_name',
    //             name: 'Repository',
    //             description: 'The repository to watch',
    //             type: 'text'
    //         }
    //     ],
    //     check: async (autoId, userData, params, checkData, token) => {
    //         return null;
    //     }
    // },
    {
        id: 4,
        name: 'New branch',
        description: 'Triggers when a new branch is created to a repository',
        fields: [
            {
                id: 'repository_name',
                name: 'Repository',
                description: 'The repository to watch',
                type: 'text'
            }
        ],
        check: async (autoId, userData, params, checkData, token) => {
            try {
                const resp = await axios.get(`https://api.github.com/repos/${params.repository_name}/branches`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        Accept: 'application/vnd.github+json'
                    }
                });
                const branches = resp.data;
                if (!branches || !branches.length)
                    return null;
                if (!checkData.knownBranches)
                    checkData.knownBranches = [];
                for (const branch of branches) {
                    if (checkData.knownBranches.includes(branch.name))
                        continue;
                    checkData.knownBranches.push(branch.name);
                    db.updateAutomation(userData.id, autoId, `trigger_check_data = '${JSON.stringify(checkData)}'`);
                    return {
                        text: `New branch created: ${branch.name} in the repository ${params.repository_name}`,
                        data: branch
                    };
                }
            } catch (error) {
                console.error(error);
                return null;
            }
        }
    }
];

export const reactions = [
    {
        id: 1,
        name: 'Create repository',
        description: 'Creates a new repository in your personal account',
        fields: [
            {
                id: 'name',
                name: 'Name',
                description: 'The name of the repository to create',
                type: 'text'
            }
        ],
        execute: async (userData, params, token, triggerData) => {
            axios.post('https://api.github.com/user/repos', {
                name: params.name,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: 'application/vnd.github+json',
                    "X-GitHub-Api-Version": "2022-11-28"
                }
            }).then((response) => {
                console.log("Repository created");
            }).catch((error) => {
                if (error.response.status === 422)
                    console.log("Repository already exists");
                else
                    console.error("error:", error);
            });
        }
    },
    {
        id: 2,
        name: 'Create issue',
        description: 'Creates a new issue in a repository',
        fields: [
            {
                id: 'repository_name',
                name: 'Repository',
                description: 'The repository to create the branch in',
                type: 'text'
            },
            {
                id: 'title',
                name: 'Title',
                description: 'The title of the issue',
                type: 'text'
            }
        ],
        execute: async (userData, params, token, triggerData) => {
            axios.post(`https://api.github.com/repos/${params.repository_name}/issues`, {
                title: (params.title && params.title.length ? params.title : triggerData.text),
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: 'application/vnd.github+json',
                    "X-GitHub-Api-Version": "2022-11-28"
                }
            }).then((response) => {
                console.log("Issue created");
            }).catch((error) => {
                console.error("error when creating issue:", error);
            });
        }
    },
    {
        id: 3,
        name: 'Write file',
        description: 'Creates or update file in a repository',
        fields: [
            {
                id: 'repository_name',
                name: 'Repository',
                description: 'The repository to create the file in',
                type: 'text'
            },
            {
                id: 'commit_msg',
                name: 'Commit message',
                description: 'The message of the commit that will create or update the file',
                type: 'text'
            },
            {
                id: 'filename',
                name: 'Filename',
                description: 'The name of the file',
                type: 'text'
            },
            {
                id: 'body',
                name: 'Body',
                description: 'The content of the file',
                type: 'text'
            }
        ],
        execute: async (userData, params, token, triggerData) => {
            const createOrUpdateFile = async (sha = null) => {
                const options = {
                    message: params.commit_msg,
                    content: Buffer.from(params.body && params.body.length ? params.body : triggerData.text).toString('base64'),
                };
                const headers = {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Accept": 'application/vnd.github+json',
                        "X-GitHub-Api-Version": "2022-11-28"
                    }
                };
                if (sha)
                    options.sha = sha;
                axios.put(`https://api.github.com/repos/${params.repository_name}/contents/${params.filename}`, options, headers)
                    .then((response) => {
                        if (sha)
                            console.log("File updated");
                        else
                            console.log("File created");
                    }).catch((error) => {
                        console.error("error:", error);
                    });
            }

            axios.get(`https://api.github.com/repos/${params.repository_name}/contents/${params.filename}`, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Accept": 'application/vnd.github+json',
                    "X-GitHub-Api-Version": "2022-11-28"
                }
            }).then((response) => {
                createOrUpdateFile(response.data.sha);
            }).catch((error) => {
                createOrUpdateFile();
            });
        }
    }
];
