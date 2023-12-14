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

export const WorkingToken = async (apiLocation) => {
    const token = await AsyncStorage.getItem('jwtToken');
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
    return response.ok;
};

export const getAutos = async (apiLocation) => {
    const token = await AsyncStorage.getItem('jwtToken');
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

export const getNbAutos = async (apiLocation) => {
    const token = await AsyncStorage.getItem('jwtToken');
    const response = await fetch(`${apiLocation}/automations/`, {
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

export const removeAuto = async (apiLocation, id) => {
    const token = await AsyncStorage.getItem('jwtToken');
    const response = await fetch(`${apiLocation}/automations/`, {
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

export const getServices = async (apiLocation) => {
    const token = await AsyncStorage.getItem('jwtToken');
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

export const getNbServices = async (apiLocation) => {
    const token = await AsyncStorage.getItem('jwtToken');
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
    return data.length;
};

export const getImgByServiceId = async (apiLocation, service_id) => {
    const token = await AsyncStorage.getItem('jwtToken');
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

export const getService = async (apiLocation, service_id) => {
    const token = await AsyncStorage.getItem('jwtToken');
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

export const getServiceToken = async (apiLocation, service_id) => {
    const token = await AsyncStorage.getItem('jwtToken');
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

export const addNewAutomation = async (apiLocation, trigger_service_id, trigger_id, trigger_params, reaction_service_id, reaction_id, reaction_params) => {
    const token = await AsyncStorage.getItem('jwtToken');
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
