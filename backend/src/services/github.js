import { Router } from 'express';
import axios from 'axios';

export const router = Router();

// router.get('/oauth', async (req, res) => {
//     res.status(200).json({ msg: 'TODO' });
// });

// router.get('/oauth/callback', async (req, res) => {
//     res.status(200).json({ msg: 'TODO' });
// });

export const id = 'github';
export const name = 'Github';
export const description = 'Github service';
export const color = '#6e5494';
export const icon = '/github.png';

export const triggers = [
    {
        id: 1,
        name: 'New commit',
        description: 'Triggers when a new commit is pushed to a repository',
        fields: [
            {
                name: 'Repository',
                description: 'The repository to watch',
                type: 'text'
            }
        ],
        check: async (userData, params, token) => {
            console.log(`${name} trigger 1 check`);
            console.log('userData:', userData);
            console.log('params:', params);
            console.log('token:', token);
            return null;
        }
    },
    {
        id: 2,
        name: 'New issue',
        description: 'Triggers when a new issue is created',
        fields: [
            {
                name: 'Repository',
                description: 'The repository to watch',
                type: 'text'
            }
        ],
        check: async (userData, params, token) => {
            console.log(`${name} trigger 2 check`);
            console.log('userData:', userData);
            console.log('params:', params);
            console.log('token:', token);
            return null;
        }
    },
    {
        id: 3,
        name: 'New pull request',
        description: 'Triggers when a new pull request is created',
        fields: [
            {
                name: 'Repository',
                description: 'The repository to watch',
                type: 'text'
            }
        ],
        check: async (userData, params, token) => {
            console.log(`${name} trigger 3 check`);
            console.log('userData:', userData);
            console.log('params:', params);
            console.log('token:', token);
            return null;
        }
    }
];

export const reactions = [
    {
        id: 1,
        name: 'Create issue',
        description: 'Creates a new issue',
        fields: [
            {
                name: 'Repository',
                description: 'The repository to create the issue in',
                type: 'text'
            },
            {
                name: 'Title',
                description: 'The title of the issue',
                type: 'text'
            },
            {
                name: 'Body',
                description: 'The body of the issue',
                type: 'text'
            }
        ],
        execute: async (userData, params, token, triggerData) => {
            console.log(`${name} action 1 execute`);
            console.log('userData:', userData);
            console.log('params:', params);
            console.log('token:', token);
            console.log('triggerData:', triggerData);
        }
    },
    {
        id: 2,
        name: 'Create pull request',
        description: 'Creates a new pull request',
        fields: [
            {
                name: 'Repository',
                description: 'The repository to create the pull request in',
                type: 'text'
            },
            {
                name: 'Title',
                description: 'The title of the pull request',
                type: 'text'
            },
            {
                name: 'Body',
                description: 'The body of the pull request',
                type: 'text'
            }
        ],
        execute: async (userData, params, token, triggerData) => {
            console.log(`${name} action 2 execute`);
            console.log('userData:', userData);
            console.log('params:', params);
            console.log('token:', token);
            console.log('triggerData:', triggerData);
        }
    },
    {
        id: 3,
        name: 'TEST',
        description: 'Creates a new pull request',
        fields: [
            {
                name: 'Repository',
                description: 'The repository to create the pull request in',
                type: 'text'
            },
            {
                name: 'Title',
                description: 'The title of the pull request',
                type: 'text'
            },
            {
                name: 'Body',
                description: 'The body of the pull request',
                type: 'text'
            }
        ],
        execute: async (userData, params, token, triggerData) => {
            console.log(`${name} action 2 execute`);
            console.log('userData:', userData);
            console.log('params:', params);
            console.log('token:', token);
            console.log('triggerData:', triggerData);
        }
    }
];
