import { Router } from 'express';
import axios from 'axios';
import { db } from "../global.js";

export const id = 'microsoft_calendar';
export const name = 'Microsoft Calendar';
export const description = 'Microsoft Calendar service';
export const color = '#6264a7';
export const icon = '/microsoft-calendar.png';

export const connect = async (userId) => {
    const { microsoftCalendarTenantId, microsoftCalendarClientId, microsoftCalendarClientSecret } = process.env;

    try {
        const authorizeUrl = `https://login.microsoftonline.com/${microsoftCalendarTenantId}/oauth2/v2.0/authorize`;
        const authParams = {
            client_id: microsoftCalendarClientId,
            redirect_uri: `${process.env.API_PUBLIC_URL}/en/service/oauth/${id}/callback`,
            response_type: 'code',
            scope: 'Calendars.ReadWrite',
            state: userId,
        };
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
            redirect_uri: `${process.env.API_PUBLIC_URL}/en/service/oauth/${id}/callback`, // TO SEE IF IT WORKS
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
                const apiUrl = 'https://graph.microsoft.com/v1.0/me/events?$top=1&$orderby=createdDateTime desc';

                const rsp = await axios.get(apiUrl, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                const events = rsp.data
                if (!events || !events.value || !events.value.length) return null;
                const latestEvent = events.value[0];
                if (checkData.latestEventID && latestEvent.id === checkData.latestEventID)
                    return null;
                db.updateAutomation(userData.id, autoId, `trigger_check_data = '${JSON.stringify({ latestEventID: latestEvent.id })}'`);
                return {
                    text: `New event created: ${latestEvent.subject} by ${latestEvent.organizer}`,
                    data: latestEvent,
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
        name: 'Create event',
        description: 'Creates a new event',
        fields: [
            {
                id: 'name',
                name: 'Event name',
                description: 'The name of the event',
                type: 'text'
            },
            {
                id: 'date_start',
                name: 'Start date',
                description: 'The start date of the event',
                type: 'text'
            },
            {
                id: 'date_end',
                name: 'End date',
                description: 'The end date of the event',
                type: 'text'
            }
        ],
        execute: async (userData, params, token, triggerData) => {
            console.log(triggerData.text);
            const eventParams = {
                subject: params.name,
                start: {
                    dateTime: params.date_start,
                    timeZone: 'UTC',
                },
                end: {
                    dateTime: params.date_end,
                    timeZone: 'UTC',
                },
            };
            axios.post('https://graph.microsoft.com/v1.0/me/events', eventParams, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });
        }
    }
];

export const router = Router();
