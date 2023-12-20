import { Router } from 'express';
import axios from 'axios';
import { db } from "../global.js";
import { Client, GatewayIntentBits, ChannelType, PermissionFlagsBits } from 'discord.js';
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


// Discord bot

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMembers] });
let chan_survery_list = [];

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

setInterval(() => {
    getVariables().then((data) => {
        chan_survery_list = [];
        data.forEach(element => {
            chan_survery_list.push(element.channel_id);
        });
    }).catch((error) => {
        console.error('Error:', error);
    });
}, 5000);



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

function sendMessages(channel_id, message) {
    const channel = client.channels.cache.get(channel_id);
    channel.send(message);
}

async function createChannelText(guild_id, channel_name) {
    if (!channel_name) {
        console.error('Channel name is required');
        return;
    }
    const guild = await client.guilds.fetch(guild_id);
    if (!guild) {
        console.error(`Guild with ID ${guild_id} not found`);
        return;
    }
    await guild.channels.create({
        name: channel_name,
        type: ChannelType.GuildText,
    });
}

async function createChannelVoice(guild_id, channel_name) {
    if (!channel_name) {
        console.error('Channel name is required');
        return;
    }
    const guild = await client.guilds.fetch(guild_id);
    if (!guild) {
        console.error(`Guild with ID ${guild_id} not found`);
        return;
    }
    await guild.channels.create({
        name: channel_name,
        type: ChannelType.GuildVoice,
    });
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
        name: 'Create a text channel',
        description: 'Create a new text channel',
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
    },
    {
        id: 3,
        name: 'Create a voice channel',
        description: 'Create a new voice channel',
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
    },
];


client.login(process.env.discordClientSecret);
