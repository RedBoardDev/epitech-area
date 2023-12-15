import { Router } from 'express';
import axios from 'axios';

export const id = '';
export const name = '';
export const description = '';
export const color = '#000000';
export const icon = '/serviceIcon.svg';

export const triggers = [
    {
        id: 1,
        name: '',
        description: '',
        fields: [
            {
                id: '',
                name: '',
                description: '',
                type: 'text'
            }
        ],
        check: async (autoId, userData, params, checkData, token) => {
            return null;
        }
    }
];

export const reactions = [
    {
        id: 1,
        name: '',
        description: '',
        fields: [
            {
                id: '',
                name: '',
                description: '',
                type: 'text'
            }
        ],
        execute: async (userData, params, token, triggerData) => {
        }
    }
];

export const router = Router();
