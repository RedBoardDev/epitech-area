import AsyncStorage from '@react-native-async-storage/async-storage';

export const LoginEmailPass = async (apiBaseUrl, email, password) => {
    const response = await fetch(`${apiBaseUrl}/auth/login`, {
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
    return data;
};

export const RegisterEmailPass = async (apiBaseUrl, email, password, firstname, lastname) => {
    const response = await fetch(`${apiBaseUrl}/auth/register`, {
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
    return data;
};

export const WorkingToken = async (apiBaseUrl) => {
    const token = await AsyncStorage.getItem('jwtToken');
    if (!token) {
        return false;
    }
    const response = await fetch(`${apiBaseUrl}/user/`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        },
    });
    return response.ok;
};

export const getAutos = async (apiBaseUrl) => {
    const token = await AsyncStorage.getItem('jwtToken');
    const response = await fetch(`${apiBaseUrl}/automations/`, {
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

export const getNbAutos = async (apiBaseUrl) => {
    const token = await AsyncStorage.getItem('jwtToken');
    const response = await fetch(`${apiBaseUrl}/automations/`, {
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
    return data.length;
};

export const removeAuto = async (apiBaseUrl, id) => {
    const token = await AsyncStorage.getItem('jwtToken');
    const response = await fetch(`${apiBaseUrl}/automations/`, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ id }),
    });
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.msg);
    }
    return data;
};

export const getServices = async (apiBaseUrl) => {
    const token = await AsyncStorage.getItem('jwtToken');
    const response = await fetch(`${apiBaseUrl}/service/`, {
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

export const getNbServices = async (apiBaseUrl) => {
    const token = await AsyncStorage.getItem('jwtToken');
    const response = await fetch(`${apiBaseUrl}/service/`, {
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
    return data.length;
};

export const getImgByServiceId = async (apiBaseUrl, service_id) => {
    const token = await AsyncStorage.getItem('jwtToken');
    const response = await fetch(`${apiBaseUrl}/service/${service_id}/`, {
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
    return `${apiBaseUrl}${data.icon}`;
}

export const getService = async (apiBaseUrl, service_id) => {
    const token = await AsyncStorage.getItem('jwtToken');
    const response = await fetch(`${apiBaseUrl}/service/${service_id}/`, {
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

export const getConnected = async (apiBaseUrl, service_id) => {
    const token = await AsyncStorage.getItem('jwtToken');
    const response = await fetch(`${apiBaseUrl}/service/oauth/${service_id}/connected`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        },
    });
    const data = await response.json();
    if (!response.ok) {
        return data.msg;
    }
    return data.connected;
}

export const addNewAutomation = async (apiBaseUrl, trigger_service_id, trigger_id, trigger_params, reaction_service_id, reaction_id, reaction_params) => {
    const token = await AsyncStorage.getItem('jwtToken');
    const response = await fetch(`${apiBaseUrl}/automations/`, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ trigger_service_id, trigger_id, trigger_params: JSON.stringify(trigger_params), reaction_service_id, reaction_id, reaction_params: JSON.stringify(reaction_params) }),
    });
    const data = await response.json();
    if (!response.ok) {
        return { status: response.status, ...data };
    }
    return data;
}

export const updateServiceToken = async (apiBaseUrl, service_id, token) => {
    const tkn = await AsyncStorage.getItem('jwtToken');
    const response = await fetch(`${apiBaseUrl}/service/oauth/${service_id}/`, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${tkn}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ token }),
    });
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.msg);
    }
    return data;
}

export const serviceOauth = async (apiBaseUrl, service_id) => {
    const token = await AsyncStorage.getItem('jwtToken');
    const response = await fetch(`${apiBaseUrl}/service/oauth/${service_id}/connect`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        },
    });
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.error);
    }
    return data;
}

export const deleteServiceConnexion = async (apiBaseUrl, service_id) => {
    const token = await AsyncStorage.getItem('jwtToken');
    const response = await fetch(`${apiBaseUrl}/service/oauth/${service_id}/`, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        },
    });
    const data = await response.json();
    if (!response.ok) {
        return data.error;
    }
    return data.connected;
}

export const registerGithub = async (apiBaseUrl, token) => {
    const response = await fetch(`${apiBaseUrl}/auth/register/githubmobile/${token}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
    });
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.msg);
    }
    return data;
}

export const loginGithub = async (apiBaseUrl, token) => {
    const response = await fetch(`${apiBaseUrl}/auth/login/githubmobile/${token}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
    });
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.msg);
    }
    return data;
}

export const getUserInfos = async (apiBaseUrl) => {
    const token = await AsyncStorage.getItem('jwtToken');
    const id = await AsyncStorage.getItem('id');
    if (!token) {
        return false;
    }
    const response = await fetch(`${apiBaseUrl}/user/${id}`, {
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

export const updateUser = async (apiBaseUrl, firstname, lastname, email, password) => {
    const token = await AsyncStorage.getItem('jwtToken');
    const id = await AsyncStorage.getItem('id');
    const response = await fetch(`${apiBaseUrl}/user/${id}`, {
        method: "PUT",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ firstname, lastname, email, password }),
    });
    const data = await response.json();
    if (!response.ok) {
        console.error(data);
        throw new Error(data.msg);
    }
    return data;
}
