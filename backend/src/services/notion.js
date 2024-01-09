import { Router, json } from 'express';
import axios from 'axios';

export const id = 'notion';
export const name = 'Notion';
export const description = 'Notion service';
export const color = '#000000';
export const icon = '/NotionLogo.png';

export const connect = async (userId) => {
    const redirectUri = `${process.env.API_PUBLIC_URL}/en/service/oauth/${id}/callback`;
    const clientId = process.env.NOTION_API_CLIENT_ID;
    
    console.log(userId.toString());
    console.log(JSON.stringify(userId));
    console.log(JSON.stringify(`${userId}`));

    try {

        const url = 'https://api.notion.com/v1/oauth/authorize'
        const params={
            client_id: clientId,
            response_type: 'code',
            redirect_uri: redirectUri,
            owner: 'user',
            state: JSON.stringify(`${userId}`),
        }
        
        const query = Object.keys(params).map((key) => `${key}=${encodeURIComponent(params[key])}`).join('&');
        return { status: "success", url: `${url}?${query}`, auth: true };
    } catch (error) {
        return { status: "error", msg: error };
    }
};

export const callback = async (code) => {
    // const redirectUri = `${process.env.API_PUBLIC_URL}/en/service/oauth/${id}/callback`;
    const clientId = process.env.NOTION_API_CLIENT_ID;
    const secret = process.env.NOTION_API_SECRET;
    const auth = Buffer.from(`${clientId}:${secret}`).toString("base64");

    const accessTokenUrl = 'https://api.notion.com/v1/oauth/token';
    try {
        const response = await axios.post(accessTokenUrl, {
            code: code,
            grant_type: 'authorization_code',
            redirect_uri: 'http://localhost:6500/en/service/oauth/notion/callback',
        }, {
            headers: {
                Accept: 'application/json',
                "Content-Type": "application/json",
                Authorization: `Basic ${auth}`,
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
        console.log(response)
        return { status: "success", action: htmlResponse, token: response?.data?.access_token};
        // return { status: "success", action: htmlResponse, token: JSON.stringify({ access_token: response?.data?.access_token || undefined, refresh_token: response?.data?.refresh_token || undefined, }) };
    } catch (error) {
        console.log(error);
        return { status: "error", msg: error };
    }
};

export const triggers = [
    {
        id: 1,
        name: '',
        description: '',
        fields: [
            {
                id: '',
                name: '',
                description: '',
                type: 'text'
            }
        ],
        check: async (autoId, userData, params, checkData, token) => {
            return null;
        }
    }
];

export const reactions = [
    {
        id: 1,
        name: '',
        description: '',
        fields: [
            {
                id: '',
                name: '',
                description: '',
                type: 'text'
            }
        ],
        execute: async (userData, params, token, triggerData) => {
        }
    }
];

export const router = Router();
