import { Router, response } from 'express';
import axios from 'axios';
import { db } from "../global.js";

export const id = 'youtube';
export const name = 'Youtube';
export const description = 'Youtube service';
export const color = '#ff0000';
export const icon = '/youtube.png';

async function refreshToken(userId, refreshToken) {
    console.log('Refreshing token...');
    const { youtubeClientId, youtubeClientSecret } = process.env;
    try {
        const response = await axios.post('https://oauth2.googleapis.com/token', {
            client_id: youtubeClientId,
            client_secret: youtubeClientSecret,
            refresh_token: refreshToken,
            // redirect_uri: `http://localhost:6500/fr/service/oauth/${id}/callback`,
            grant_type: 'refresh_token',
        }, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json',
            },
        })
        const newToken = JSON.stringify({ access_token: response?.data?.access_token || undefined, refresh_token: response?.data?.refresh_token || refreshToken, });
        console.log(newToken);
        await db.updateServiceOauth(userId, id, newToken);
        console.log('Token refreshed, trying next time.');
        return newToken;
    } catch (error) {
        console.log(error);
        return null;
    }
}

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
            access_type: 'offline',
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

        return { status: "success", action: htmlResponse, token: JSON.stringify({ access_token: response?.data?.access_token || undefined, refresh_token: response?.data?.refresh_token || undefined, }) };
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
            const { access_token, refresh_token } = JSON.parse(token);
            try {   
                console.log("token: ",token);
                console.log("access_token: ", access_token);
                console.log("refresh_token: ", refresh_token);

                console.log(`${name} trigger 1 checking...`);
                const resp = await axios.get(`https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails&myRating=like&maxResults=1`, {
                    headers: {
                        Authorization: `Bearer ${access_token}`,
                        Accept: '*/*',
                        'Content-Type': 'application/json',
                    }
                });
                const likedVideo = resp.data.items[0];
                if (!likedVideo)
                    return null;
                const lastLikedVideo = likedVideo.id;
                console.log(lastLikedVideo);
                console.log(checkData.lastLikedVideo);
                if (checkData.lastLikedVideo && lastLikedVideo === checkData.lastLikedVideo)
                    return null;
                db.updateAutomation(userData.id, autoId, `trigger_check_data = '${JSON.stringify({ lastLikedVideo: lastLikedVideo })}'`);
                return {
                    text: `New video liked : ${lastLikedVideo} on youtube`,
                    data: lastLikedVideo
                };
            } catch (error) {
                if (error.response.status === 401)
                    await refreshToken(userData.id, refresh_token);
                else
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
            const { access_token, refresh_token } = JSON.parse(token);
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
                        "Authorization": `Bearer ${access_token}`,
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
