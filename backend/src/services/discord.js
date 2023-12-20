import { Router } from 'express';
import axios from 'axios';
import { db } from "../global.js";

export const router = Router();

export const id = 'discord';
export const name = 'Discord';
export const description = 'Discord service';
export const color = '#7289da';
export const icon = '/discord.png';


export const triggers = [
    {
        id: 1,
        name: 'New message',
        description: 'Triggers when a new message is sent to a channel',
        fields: [
            {
                id: 'channel_id',
                name: 'Channel name',
                description: 'Channel id to watch for new messages',
                type: 'text'
            }
        ],
    },
    {
        id: 2,
        name: 'New member',
        description: 'Triggers when a new member joins a guild',
        fields: [
            {
                id: 'guild_id',
                name: 'Guild name',
                description: 'Guild id to watch for new members',
                type: 'text'
            }
        ],
    }
];

export const reactions = [
    {
        id: 1,
        name: 'Send message',
        description: 'Send a message to a channel',
        fields: [
            {
                id: 'channel_id',
                name: 'Channel ID',
                description: 'The channel to send the message to',
                type: 'text'
            },
            {
                id: 'message',
                name: 'Message',
                description: 'The message to send',
                type: 'text'
            }
        ],
    },
    {
        id: 2,
        name: 'Create a channel',
        description: 'Create a new channel',
        fields: [
            {
                id: 'guild_id',
                name: 'Guild ID',
                description: 'The guild to create the channel in',
                type: 'text'
            },
            {
                id: 'channel_name',
                name: 'Channel name',
                description: 'The name of the channel to create',
                type: 'text'
            }
        ],
    }
];
