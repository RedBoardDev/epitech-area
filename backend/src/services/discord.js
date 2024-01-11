import { Router } from 'express';
import axios from 'axios';
import { db } from "../global.js";
import { Client, GatewayIntentBits, ChannelType, PermissionFlagsBits } from 'discord.js';
export const router = Router();
export const id = 'discord';
export const name = 'Discord';
export const description = 'Discord service';
export const color = '#5865f2';
export const icon = '/discord.png';

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMembers] });
const newMessages = {};
const newMembers = {};

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('messageCreate', async (message) => {
    if (message.author.bot) return;
    if (!newMessages[message.channel.id])
        newMessages[message.channel.id] = [];
    newMessages[message.channel.id].push(message);
});

client.on('guildMemberAdd', async (member) => {
    if (!newMembers[member.guild.id])
        newMembers[member.guild.id] = [];
    newMembers[member.guild.id].push(member);
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

export const connect = async (userId) => {
    try {
        const url = 'https://discord.com/api/oauth2/authorize?client_id=1187073736449462342&permissions=8&scope=bot';
        return { status: "success", url: `${url}`, auth: false };
    } catch (error) {
        return { status: "error", msg: error };
    }
};

export const triggers = [
    {
        id: 1,
        name: 'New message',
        description: 'Triggers when a new message is sent to a channel',
        fields: [
            {
                id: 'channel_id',
                name: 'Channel ID',
                description: 'Channel id to watch for new messages',
                type: 'text'
            }
        ],
        check: async (autoId, userData, params, checkData, token) => {
            if (newMessages[params.channel_id] && newMessages[params.channel_id].length > 0) {
                const message = newMessages[params.channel_id].shift();
                console.log(`New message from ${message.author.username}: ${message.content}`);
                return {
                    text: `New message from ${message.author.username}: ${message.content}`,
                    data: message
                };
            }
            return null;
        }
    },
    {
        id: 2,
        name: 'New member',
        description: 'Triggers when a new member joins a guild',
        fields: [
            {
                id: 'guild_id',
                name: 'Guild ID',
                description: 'Guild id to watch for new members',
                type: 'text'
            }
        ],
        check: async (autoId, userData, params, checkData, token) => {
            if (newMembers[params.guild_id] && newMembers[params.guild_id].length > 0) {
                const member = newMembers[params.guild_id].shift();
                console.log(`New member: ${member.user.username}`);
                return {
                    text: `New member: ${member.user.username}`,
                    data: member
                };
            }
            return null;
        }
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
        execute: async (userData, params, token, triggerData) => {
            sendMessages(params.channel_id, params.message);
        }
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
        execute: async (userData, params, token, triggerData) => {
            createChannelText(params.guild_id, params.channel_name);
        }
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
        execute: async (userData, params, token, triggerData) => {
            createChannelVoice(params.guild_id, params.channel_name);
        }
    },
];


client.login(process.env.discordClientSecret);
