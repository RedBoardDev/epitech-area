import axios from "axios";

export function getGithubToken(code) {
    const { githubClientId, githubClientSecret } = process.env;

    return new Promise((resolve, reject) => {
        axios.post('https://github.com/login/oauth/access_token', {
            client_id: githubClientId,
            client_secret: githubClientSecret,
            code: code,
        }, {
            headers: {
                Accept: 'application/json',
            },
        }).then((response) => {
            const token = response?.data?.access_token || null;
            if (!token)
                reject("No token found");
            resolve(token);
        }).catch((err) => {
            reject(err);
        });
    });
}

export function getGithubEmail(token) {
    return new Promise((resolve, reject) => {
        axios.get('https://api.github.com/user/emails', {
            headers: {
                Authorization: `token ${token}`,
                Accept: 'application/json',
            },
        }).then((response) => {
            if (response.data.length === 0) {
                reject("No email found");
            }
            resolve(response.data.find((email) => email.primary).email);
        }).catch((err) => {
            reject(err);
        });
    });
}

export function getGithubInfos(token) {
    return new Promise((resolve, reject) => {
        axios.get('https://api.github.com/user', {
            headers: {
                Authorization: `token ${token}`,
                Accept: 'application/json',
            },
        }).then((response) => {
            const res = {
                username: response.data.login,
                avatar_url: response.data.avatar_url,
            }
            resolve(res);
        }).catch((err) => {
            reject(err);
        });
    });
}