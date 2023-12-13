import AsyncStorage from '@react-native-async-storage/async-storage';

export const LoginEmailPass = async (apiLocation, email, password) => {
    const response = await fetch(`${apiLocation}/auth/login`, {
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

export const RegisterEmailPass = async (apiLocation, email, password, firstname, lastname) => {
    const response = await fetch(`${apiLocation}/auth/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, firstname, lastname }),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.msg);
    }
    return data.token;
};

export const WorkingToken = async (apiLocation, token) => {
    if (!token) {
        return false;
    }
    const response = await fetch(`${apiLocation}/user/`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        },
    });
    console.log(token, response.ok);
    return response.ok;
};

export const getAutos = async (apiLocation, token) => {
    const response = await fetch(`${apiLocation}/automations/`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        },
    });
    const data = await response.json();
    if (!response.ok) {
        console.error(data);
        throw new Error(data.msg);
    }
    return data;
};

export const getServices = async (apiLocation, token) => {
    const response = await fetch(`${apiLocation}/service/`, {
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

export const getImgByServiceId = async (apiLocation, token, service_id) => {
    const response = await fetch(`${apiLocation}/service/${service_id}/`, {
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
    return `${apiLocation}${data.icon}`;
}

export const getService = async (apiLocation, token, service_id) => {
    const response = await fetch(`${apiLocation}/service/${service_id}/`, {
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

export const getServiceToken = async (apiLocation, token, service_id) => {
    const response = await fetch(`${apiLocation}/service/oauth/${service_id}/`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        },
    });
    const data = await response.json();
    if (!response.ok) {
        return "";
    }
    return data.token;
}

export const addNewAutomation = async (apiLocation, token, trigger_service_id, trigger_id, trigger_params, reaction_service_id, reaction_id, reaction_params) => {
    const response = await fetch(`${apiLocation}/automations/`, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ trigger_service_id, trigger_id, trigger_params: JSON.stringify(trigger_params), reaction_service_id, reaction_id, reaction_params: JSON.stringify(reaction_params) }),
    });
    const data = await response.json();
    if (!response.ok) {
        console.error(data);
        throw new Error(data.msg);
    }
    return data;
}
