import { Router, json } from 'express';
import axios from 'axios';

export const id = 'notion';
export const name = 'Notion';
export const description = 'Notion service';
export const color = '#999999';
export const icon = '/NotionLogo.png';

export const connect = async (userId) => {
    const redirectUri = `${process.env.API_PUBLIC_URL}/en/service/oauth/${id}/callback`;
    const clientId = process.env.notionClientId;

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
    const clientId = process.env.notionClientId;
    const secret = process.env.notionClientSecret;
    const auth = Buffer.from(`${clientId}:${secret}`).toString("base64");

    const accessTokenUrl = 'https://api.notion.com/v1/oauth/token';
    try {
        const response = await axios.post(accessTokenUrl, {
            code: code,
            grant_type: 'authorization_code',
            redirect_uri: `${process.env.API_PUBLIC_URL}/en/service/oauth/${id}/callback`,
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
        return { status: "success", action: htmlResponse, token: response?.data?.access_token};
    } catch (error) {
        console.error(error);
        return { status: "error", msg: error };
    }
};

export const triggers = [
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
    //     check: async (autoId, userData, params, checkData, token) => {
    //         return null;
    //     }
    // }
];

export const reactions = [
    {
        id: 1,
        name: 'Create a new database',
        description: 'Create a new database',
        fields: [
            {
                id: 'page_id',
                name: 'Parent page ID',
                description: 'The ID of the parent page',
                type: 'text'
            },
            {
                id: 'title',
                name: 'Database Title',
                description: 'The title of your brand new database',
                type: 'text'
            },
        ],
        execute: async (userData, params, token, triggerData) => {
            const apiKey = process.env.notionClientId;
            try {
                const resp = await axios.post('https://api.notion.com/v1/databases', {
                title: [
                        {
                            text: {
                                content: `${params.title}`,
                            }
                        },
                    ],
                parent: {
                    type: "page_id",
                    page_id: params.page_id,
                },
                properties: {
                    Name: {
                      title: {},
                    },
                    Description: {
                      rich_text: {},
                    },
                }
                }, {
                headers: {
                        'Content-Type': 'application/json',
                        'Notion-Version': '2021-08-16',
                        'Authorization': 'Bearer ' + token,
                    },
                });
            } catch (error) {
                console.error(error);
                return null;
            }
        }
    },
    {
        id: 2,
        name: 'Create a new page',
        description: 'Create a new page',
        fields: [
            {
                id: 'page_id',
                name: 'Parent page ID',
                description: 'The ID of the parent page',
                type: 'text'
            },
            {
                id: 'title',
                name: 'Page Title',
                description: 'The title of your brand new database',
                type: 'text'
            },
        ],
        execute: async (userData, params, token, triggerData) => {
            try {
                const resp = await axios.post('https://api.notion.com/v1/pages', {
                parent: {
                    type: "page_id",
                    page_id: params.page_id,
                },
                properties: {
                    "title": [
                        {
                            "text": {
                                "content": `${params.title}`,
                            }
                        }
                    ]
                }
                }, {
                headers: {
                        'Content-Type': 'application/json',
                        'Notion-Version': '2021-08-16',
                        'Authorization': 'Bearer ' + token,
                    },
                });
            } catch (error) {
                console.error(error);
                return null;
            }
        }
    }
];

export const router = Router();
