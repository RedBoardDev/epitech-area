import { Router } from 'express';
import axios from 'axios';

export const id = 'twitch';
export const name = 'Twitch';
export const description = 'Twitch service';
export const color = '#000000';
export const icon = '/serviceIcon.svg';

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
        return { status: "success", action: htmlResponse, token: response?.data?.access_token || undefined };
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
            return null;
        }
    },
    {
        id: 2,
        name: 'Stream started by followed user',
        description: 'Triggers when any followed user starts streaming',
        fields: [],
        check: async (autoId, userData, params, checkData, token) => {
            return null;
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
