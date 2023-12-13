import config from '../config';

import AsyncStorage from '@react-native-async-storage/async-storage';

export const LoginEmailPass = async (email, password) => {
    const response = await fetch(`${config.API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.msg);
    }
    return data.token;
};

export const RegisterEmailPass = async (email, password) => {
    const response = await fetch(`${config.API_BASE_URL}/auth/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.msg);
    }
    return data.token;
};

export const WorkingToken = async (token) => {
    if (!token) {
        return false;
    }
    const response = await fetch(`${config.API_BASE_URL}/user/`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        },
    });
    return response.ok;
};

export const getAutos = async (token) => {
    const response = await fetch(`${config.API_BASE_URL}/automations/`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        },
    });
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.msg);
    }
    return data;
};

export const getImgByServiceId = async (token, service_id) => {
    const response = await fetch(`${config.API_BASE_URL}/service/${service_id}/`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        },
    });
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.msg);
    }
    return `${config.API_BASE_URL}${data.icon}`;
}

export const getService = async (token, service_id) => {
    const response = await fetch(`${config.API_BASE_URL}/service/${service_id}/`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        },
    });
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.msg);
    }
    return data;
}