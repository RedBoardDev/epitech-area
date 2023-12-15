import { Router } from 'express';
import axios from 'axios';
import { db } from "../global.js";

export const router = Router();

export const id = 'github';
export const name = 'Github';
export const description = 'Github service';
export const color = '#6e5494';
export const icon = '/github.png';

export const connect = async (userId) => {
    const { githubClientId, githubClientSecret } = process.env;

    try {
        const url = 'https://github.com/login/oauth/authorize';
        const params = {
            client_id: githubClientId,
            redirect_uri: `${process.env.PROTOCOLE}://${process.env.HOST_NAME}:${process.env.PORT}/service/oauth/${id}/callback?userId=${userId}`,
            scope: 'user repo',
        };
        const query = Object.keys(params).map((key) => `${key}=${encodeURIComponent(params[key])}`).join('&');
        return { status: "success", url: `${url}?${query}` };
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
        return { status: "success", url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', token: response?.data?.access_token || undefined };
    } catch (error) {
        console.log(error);
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
                name: 'Repository name',
                description: 'The repository to watch',
                type: 'text'
            }
        ],
        check: async (autoId, userData, params, checkData, token) => {
            try {
                console.log(`${name} trigger 1 checking...`);
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
    {
        id: 2,
        name: 'New issue',
        description: 'Triggers when a new issue is created',
        fields: [
            {
                id: 'repository_name',
                name: 'Repository name',
                description: 'The repository to watch',
                type: 'text'
            }
        ],
        check: async (autoId, userData, params, checkData, token) => {
            console.log(`${name} trigger 2 check`);
            console.log('userData:', userData);
            console.log('params:', params);
            console.log('token:', token);
            return null;
        }
    },
    {
        id: 3,
        name: 'New pull request',
        description: 'Triggers when a new pull request is created',
        fields: [
            {
                id: 'repository_name',
                name: 'Repository name',
                description: 'The repository to watch',
                type: 'text'
            }
        ],
        check: async (autoId, userData, params, checkData, token) => {
            console.log(`${name} trigger 3 check`);
            console.log('userData:', userData);
            console.log('params:', params);
            console.log('token:', token);
            return null;
        }
    }
];

export const reactions = [
    {
        id: 1,
        name: 'Create issue',
        description: 'Creates a new issue',
        fields: [
            {
                id: 'repository_name',
                name: 'Repository',
                description: 'The repository to create the issue in',
                type: 'text'
            },
            {
                id: 'title',
                name: 'Title',
                description: 'The title of the issue',
                type: 'text'
            },
            {
                id: 'body',
                name: 'Body',
                description: 'The body of the issue',
                type: 'text'
            }
        ],
        execute: async (userData, params, token, triggerData) => {
            console.log(triggerData.text);
            // console.log(`${name} reaction 1 execute`);
            // console.log('userData:', userData);
            // console.log('params:', params);
            // console.log('token:', token);
            // console.log('triggerData:', triggerData);
        }
    },
    {
        id: 2,
        name: 'Create pull request',
        description: 'Creates a new pull request',
        fields: [
            {
                id: 'repository_name',
                name: 'Repository',
                description: 'The repository to create the pull request in',
                type: 'text'
            },
            {
                id: 'title',
                name: 'Title',
                description: 'The title of the pull request',
                type: 'text'
            },
            {
                id: 'body',
                name: 'Body',
                description: 'The body of the pull request',
                type: 'text'
            }
        ],
        execute: async (userData, params, token, triggerData) => {
            console.log(triggerData.text);
            // console.log(`${name} reaction 2 execute`);
            // console.log('userData:', userData);
            // console.log('params:', params);
            // console.log('token:', token);
            // console.log('triggerData:', triggerData);
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
                id: 'title',
                name: 'Title',
                description: 'The title of the pull request',
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
            console.log(triggerData.text);

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
                        console.log("error:", error);
                    });
            }

            axios.get(`https://api.github.com/repos/${params.repository_name}/contents/${params.filename}`, {
                headers: {
                    "Authorization": `Bearer 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`,
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
