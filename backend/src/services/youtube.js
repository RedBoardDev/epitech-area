import { Router, response } from 'express';
import axios from 'axios';
import { db } from "../global.js";

export const id = 'youtube';
export const name = 'Youtube';
export const description = 'Youtube service';
export const color = '#ff0000';
export const icon = '/youtube.png';

export const connect = async (userId) => {
    const { youtubeClientId, youtubeClientSecret } = process.env;

    try {
        const scopes = [
            'https://www.googleapis.com/auth/youtube.readonly',
            'https://www.googleapis.com/auth/youtube.force-ssl',
        ];        
        const params = {
            client_id: youtubeClientId,
            redirect_uri: `http://localhost:6500/fr/service/oauth/${id}/callback`,
            response_type: 'code',
            scope: scopes.join(' '),
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
        name: 'Create a comment',
        description: 'Create a comment on a youtube video',
        fields: [
            {
                id: 'id_video',
                name: 'Video ID',
                description: 'The id of video to create a comment',
                type: 'text'
            },
            {
                id: 'comment_text',
                name: 'Text',
                description: 'The text to comment the video',
                type: 'text'
            },
        ],
        execute: async (userData, params, token, triggerData) => {
            try {
                const options = {
                    snippet: {
                        videoId: params.id_video,
                        topLevelComment: {
                            snippet: {
                                textOriginal: params.comment_text
                            }
                        }
                    }
                };
                const headers = {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Accept": 'application/json',
                        "Content-Type": "application/json",
                    }
                };
                axios.post(`https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet`, options, headers);
                return {
                    text: `New comment created : ${params.id_video} on youtube`,
                    data: params.id_video
                };
            } catch(error) {
                console.error(error);
                return null;
            }
        }
    },
];

export const router = Router();
