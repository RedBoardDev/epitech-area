import { Router } from 'express';
import axios from 'axios';
import { db } from "../global.js";

export const id = 'youtube';
export const name = 'Youtube';
export const description = 'Youtube service';
export const color = 'black';
export const icon = '/youtube.png';

export const connect = async (userId) => {
    const { youtubeClientId, youtubeClientSecret } = process.env;

    try {
        const scope = 'https://www.googleapis.com/auth/youtube.readonly';
        const params = {
            client_id: youtubeClientId,
            redirect_uri: `http://localhost:6500/fr/service/oauth/${id}/callback`,
            response_type: 'code',
            scope: scope,
            state: userId,
        };

        const query = Object.keys(params).map((key) => `${key}=${encodeURIComponent(params[key])}`).join('&');
        return { status: "success", url: `https://accounts.google.com/o/oauth2/auth?${query}`, auth: true };
    } catch (error) {
        return { status: "error", msg: error };
    }
}

export const callback = async (code) => {
    const { youtubeClientId, youtubeClientSecret } = process.env;

    try {
        const response = await axios.post('https://oauth2.googleapis.com/token', null, {
            params: {
                code: code,
                client_id: youtubeClientId,
                client_secret: youtubeClientSecret,
                redirect_uri: `http://localhost:6500/fr/service/oauth/${id}/callback`,
                grant_type: 'authorization_code',
            },
            headers: {
                accept: 'application/json',
            },
        });
        const htmlResponse = `
            <html>
                <body>
                    <p>You can now close this window.</p>
                    <script>
                        window.close();
                    </script>
                </body>
            </html>
        `;

        return { status: "success", action: htmlResponse, token: response?.data?.access_token || undefined };
    } catch (error) {
        console.error('Error fetching access token:', error);

        return { status: "error", msg: 'Error fetching access token' };
    }
};

export const triggers = [
    {
        id: 1,
        name: 'New liked video',
        description: 'Trigger when a new video is liked on youtube',
        fields: [
            {
                id: '',
                name: '',
                description: '',
                type: 'text'
            }
        ],
        check: async (autoId, userData, params, checkData, token) => {
            try {
                console.log(`${name} trigger 1 checking...`);
                const resp = await axios.get(`https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails&myRating=like&maxResults=1`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        Accept: '*/*',
                        'Content-Type': 'application/json',
                    }
                });
                const likedVideo = resp.data.items[0];
                if (!likedVideo)
                    return null;
                const lastLikedVideo = likedVideo.id;
                if (checkData.lastLikedVideo && lastLikedVideo === checkData.lastLikedVideo)
                    return null;
                db.updateAutomation(userData.id, autoId, `trigger_check_data = '${JSON.stringify({ lastLikedVideo: lastLikedVideo })}'`);
                return {
                    text: `New video liked : ${lastLikedVideo} on youtube`,
                    data: lastLikedVideo
                };
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
