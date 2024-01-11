import { Router } from 'express';
import axios from 'axios';
import queryString from 'query-string';
import { db } from "../global.js";

export const id = 'spotify';
export const name = 'Spotify';
export const description = 'Spotify Music service';
export const color = '#18d860';
export const icon = '/spotify.png';

export const connect = async (userId) => {
    const { spotifyClientId } = process.env;

    var state = userId;
    var scope = 'user-read-private user-read-email user-read-playback-state user-modify-playback-state';

    try {
        const url = 'https://accounts.spotify.com/authorize?';
        const params = {
            response_type: 'code',
            client_id: spotifyClientId,
            scope: scope,
            redirect_uri: `http://${process.env.API_PUBLIC_URL}/en/service/oauth/${id}/callback`,
            state: state
        };
        const query = url + queryString.stringify(params);
        return { status: "success", url: query };
    } catch (error) {
        return { status: "error", msg: error };
    }
};

export const callback = async (code) => {
    const { spotifyClientId, spotifyClientSecret } = process.env;
    try {
        const response = await axios.post('https://accounts.spotify.com/api/token', queryString.stringify({
            grant_type: 'authorization_code',
            redirect_uri: `http://${process.env.API_PUBLIC_URL}/en/service/oauth/${id}/callback`,
            code: code,
        }), {
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic ' + (new Buffer.from(spotifyClientId + ':' + spotifyClientSecret).toString('base64'))
            }
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
        console.log("RESPONSE : ", response);
        return { status: "success", action: htmlResponse, token: response?.data?.access_token || undefined };
    } catch (error) {
        return { status: "error", msg: error };
    }
};

export const triggers = [
    {
        id: 1,
        name: 'New song played',
        description: 'Current song playing changed',
        fields: [
        ],
        check: async (autoId, userData, params, checkData, token) => {
            try {

                const resp = await axios.get(`https://api.spotify.com/v1/me/player/currently-playing`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                const curr_id = resp?.data?.item;
                if (!curr_id)
                    return null;

                if (checkData.lastSongId && curr_id.id === checkData.lastSongId)
                    return null;

                console.log(`${name} : Switch song from ${checkData.lastSongId} to ${curr_id.id} !`);
                db.updateAutomation(userData.id, autoId, `trigger_check_data = '${JSON.stringify({ lastSongId: curr_id.id })}'`);
                return {
                    text: `Switch song from ${checkData.lastSongId} to ${curr_id.id}`,
                    data: { ...curr_id.id, id: curr_id.id }
                };
            } catch (error) {
                console.error(error);
                return null;
            }
        }
    },
    {
        id: 2,
        name: 'Paused/played song',
        description: 'Current song playing paused or played',
        fields: [
        ],
        check: async (autoId, userData, params, checkData, token) => {
            try {
                const resp = await axios.get(`https://api.spotify.com/v1/me/player`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                const curr_state = resp?.data?.is_playing;
                if (curr_state === undefined)
                    return null;

                if (checkData.currentState === curr_state)
                    return null;

                console.log(`${name} : Song playback state changed !`);
                db.updateAutomation(userData.id, autoId, `trigger_check_data = '${JSON.stringify({ currentState: curr_state })}'`);
                return {
                    text: `Song playback state changed from ${checkData.currentState} to ${curr_state}`,
                    data: { ...curr_state }
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
        name: 'Start/Resume Playback',
        description: 'Resume current playback on current spotify device',
        fields: [
        ],
        execute: async (userData, params, token, triggerData) => {
            console.log(`${name} action 1 ...`);

            const headers = {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            };

            try {
                await axios.put(`https://api.spotify.com/v1/me/player/play`, {}, headers);
            } catch (error) {
            }
        }
    }
];

export const router = Router();
