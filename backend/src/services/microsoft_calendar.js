import { Router } from 'express';
import axios from 'axios';

export const id = 'microsoft_calendar';
export const name = 'Microsoft Calendar';
export const description = 'Microsoft Calendar service';
export const color = '#4e2735';
export const icon = '/microsoft-calendar.png';

export const connect = async (userId) => {
    const { microsoftCalendarTenantId, microsoftCalendarClientId, microsoftCalendarClientSecret } = process.env;

    try {
        const authorizeUrl = `https://login.microsoftonline.com/${microsoftCalendarTenantId}/oauth2/v2.0/authorize`;
        const authParams = {
            client_id: microsoftCalendarClientId,
            redirect_uri: `${process.env.API_PUBLIC_URL}/service/oauth/${id}/callback`,
            response_type: 'code',
            scope: 'Calendars.ReadWrite',
            state: userId,
        };
        console.log(authParams);
        const url = Object.keys(authParams).map(key => `${encodeURIComponent(key)}=${encodeURIComponent(authParams[key])}`).join('&');
        const authUrl = `${authorizeUrl}?${url}`;
        return { status: "success", url: authUrl, auth: true };
    } catch (error) {
        return { status: "error", msg: error };
    }
};

export const callback = async (code) => {
    const { microsoftCalendarTenantId, microsoftCalendarClientId, microsoftCalendarClientSecret } = process.env;

    try {
        const tokenParams = {
            client_id: microsoftCalendarClientId,
            client_secret: microsoftCalendarClientSecret,
            code: code,
            redirect_uri: `${process.env.API_PUBLIC_URL}/service/oauth/${id}/callback`, // TO SEE IF IT WORKS
            grant_type: 'authorization_code',
        };

        const tokenUrl = `https://login.microsoftonline.com/${microsoftCalendarTenantId}/oauth2/v2.0/token`;
        const url = Object.keys(tokenParams).map(key => `${encodeURIComponent(key)}=${encodeURIComponent(tokenParams[key])}`).join('&');

        const tokenResponse = await axios.post(tokenUrl, url, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });
        const accessToken = tokenResponse.data.access_token;

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
        return { status: "success", action: htmlResponse, token: accessToken };
    } catch (error) {
        return { status: "error", msg: error };
    }
};

export const triggers = [
    {
        id: 1,
        name: 'New event created',
        description: 'Triggers when a new event is created',
        fields: [
            {
                id: 'calendar_id',
                name: 'Calendar ID',
                description: 'The ID of the calendar',
                type: 'text'
            }
        ],
        check: async (autoId, userData, params, checkData, token) => {
            try {

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
        name: 'Create event',
        description: 'Creates a new event',
        fields: [
            {
                id: 'calendar_id',
                name: 'Calendar ID',
                description: 'The ID of the calendar',
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
    }
];

export const router = Router();