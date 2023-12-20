import { Router } from 'express';
import axios from 'axios';
import { db } from "../global.js";
import { Client, GatewayIntentBits } from 'discord.js';
export const router = Router();
export const id = 'discord';
export const name = 'Discord';
export const description = 'Discord service';
export const color = '#7289da';
export const icon = '/discord.png';

async function createVariable(channel_id) {
    const query = `INSERT INTO discord_channels_survey_ids (channel_id) VALUES ('${channel_id}')`;
    try {
        await db.executeQuery(query);
    } catch (error) {
        console.error(`Error creating variable: ${error}`);
    }
}

async function deleteVariable(channel_id) {
    const query = `DELETE FROM discord_channels_survey_ids WHERE channel_id = '${channel_id}'`;
    try {
        await db.executeQuery(query);
    } catch (error) {
        console.error(`Error deleting variable: ${error}`);
    }
}

async function getVariables() {
    const query = `SELECT * FROM discord_channels_survey_ids`;
    try {
        const result = await db.executeQuery(query);
        return result;
    } catch (error) {
        console.error(`Error getting variables: ${error}`);
    }
}

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
        callback: async (data) => {
            await createVariable(data.channel_id);
        }
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

// Discord bot

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });
let chan_survery_list = [];

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

getVariables().then((data) => {
    data.forEach(element => {
        chan_survery_list.push(element.channel_id);
    });
    console.log(chan_survery_list);
}).catch((error) => {
    console.error('Error:', error);
});


client.on('messageCreate', async (message) => {
    if (message.author.bot) return;
    console.log(message.channelId + ' ' + chan_survery_list.includes(message.channel.id));
    if (chan_survery_list.includes(message.channel.id)) {
        await message.react('🇷');
        await message.react('🅰');
        await message.react('🇹');
        await message.react('🇮');
        await message.react('🇴');
    }
});

client.login(process.env.discordClientSecret);