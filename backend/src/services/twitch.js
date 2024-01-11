import { Router } from 'express';
import axios from 'axios';
import { db } from "../global.js";

export const id = 'twitch';
export const name = 'Twitch';
export const description = 'Twitch service';
export const color = '#623fa1';
export const icon = '/twitch.png';

async function refreshToken(userId, refreshToken) {
    console.log('Refreshing token...');
    const { twitchClientId, twitchClientSecret } = process.env;
    try {
        const response = await axios.post('https://id.twitch.tv/oauth2/token', {
            client_id: twitchClientId,
            client_secret: twitchClientSecret,
            refresh_token: refreshToken,
            grant_type: 'refresh_token',
        }, {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
        });
        const newToken = JSON.stringify({ access_token: response?.data?.access_token || undefined, refresh_token: response?.data?.refresh_token || undefined, });
        await db.updateServiceOauth(userId, id, newToken);
        console.log('Token refreshed, trying next time.');
        return newToken;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export const connect = async (userId) => {
    const { twitchClientId } = process.env;

    try {
        const url = 'https://id.twitch.tv/oauth2/authorize';
        const params = {
            client_id: twitchClientId,
            redirect_uri: `${process.env.API_PUBLIC_URL}/en/service/oauth/${id}/callback`,
            response_type: 'code',
            scope: 'user:read:follows',
            state: userId,
        };
        const query = Object.keys(params).map((key) => `${key}=${encodeURIComponent(params[key])}`).join('&');
        return { status: "success", url: `${url}?${query}` };
    } catch (error) {
        return { status: "error", msg: error };
    }
};

export const callback = async (code) => {
    const { twitchClientId, twitchClientSecret } = process.env;
    try {
        const response = await axios.post('https://id.twitch.tv/oauth2/token', {
            client_id: twitchClientId,
            client_secret: twitchClientSecret,
            code: code,
            grant_type: 'authorization_code',
            redirect_uri: process.env.API_PUBLIC_URL,
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
        return { status: "success", action: htmlResponse, token: JSON.stringify({ access_token: response?.data?.access_token || undefined, refresh_token: response?.data?.refresh_token || undefined, }) };
    } catch (error) {
        console.log(error);
        return { status: "error", msg: error };
    }
};


export const triggers = [
    {
        id: 1,
        name: 'Stream started by specific user',
        description: 'Triggers when a specific user starts streaming',
        fields: [
            {
                id: 'pseudo',
                name: 'Pseudo',
                description: 'The pseudo of the user to watch',
                type: 'text'
            }
        ],
        check: async (autoId, userData, params, checkData, token) => {
            const { access_token, refresh_token } = JSON.parse(token);
            try {
                const resp = await axios.get(`https://api.twitch.tv/helix/streams?user_login=${params.pseudo}`, {
                    headers: {
                        'Authorization': 'Bearer ' + access_token,
                        'Client-ID': process.env.twitchClientId
                    },
                });
                const data = resp.data.data[0];
                if (!data)
                    return null;
                if (checkData && checkData.sentStreams && checkData.sentStreams.includes(data.id))
                    return null;

                if (!checkData.sentStreams)
                    checkData.sentStreams = [];
                checkData.sentStreams.push(data.id);
                db.updateAutomation(userData.id, autoId, `trigger_check_data = '${JSON.stringify(checkData)}'`);
                return {
                    text: `${data.user_name} is now live on twitch playing ${data.game_name}! (https://twitch.tv/${data.user_login})`,
                    data: data
                };
            } catch (error) {
                if (error.response.status === 401)
                    await refreshToken(userData.id, refresh_token);
                else
                    console.log(error);
                return null;
            }
        }
    },
    {
        id: 2,
        name: 'Stream started by followed user',
        description: 'Triggers when any followed user starts streaming',
        fields: [],
        check: async (autoId, userData, params, checkData, token) => {
            const { access_token, refresh_token } = JSON.parse(token);
            try {
                if (!checkData.userId) {
                    const userInfo = await axios.get('https://api.twitch.tv/helix/users', {
                        headers: {
                            Authorization: `Bearer ${access_token}`,
                            "Client-Id": process.env.twitchClientId,
                        },
                    });
                    const twitchUserId = userInfo.data.data[0].id;
                    checkData.userId = twitchUserId;
                    await db.updateAutomation(userData.id, autoId, `trigger_check_data = '${JSON.stringify(checkData)}'`);
                }
                const resp = await axios.get(`https://api.twitch.tv/helix/streams/followed?user_id=${checkData.userId}`, {
                    headers: {
                        'Authorization': 'Bearer ' + access_token,
                        'Client-ID': process.env.twitchClientId
                    },
                });
                const data = resp.data.data;
                for (const stream of data) {
                    if (checkData && checkData.sentStreams && checkData.sentStreams.includes(stream.id))
                        continue;

                    if (!checkData.sentStreams)
                        checkData.sentStreams = [];
                    checkData.sentStreams.push(stream.id);
                    db.updateAutomation(userData.id, autoId, `trigger_check_data = '${JSON.stringify(checkData)}'`);
                    return {
                        text: `${stream.user_name} is now live on twitch playing ${stream.game_name}! (https://twitch.tv/${stream.user_login})`,
                        data: stream
                    };
                }
                return null;
            } catch (error) {
                if (error.response.status === 401)
                    await refreshToken(userData.id, refresh_token);
                else
                    console.log(error);
                return null;
            }
        }
    }
];

export const reactions = [
    // {
    //     id: 1,
    //     name: '',
    //     description: '',
    //     fields: [
    //         {
    //             id: '',
    //             name: '',
    //             description: '',
    //             type: 'text'
    //         }
    //     ],
    //     execute: async (userData, params, token, triggerData) => {
    //     }
    // }
];

export const router = Router();
