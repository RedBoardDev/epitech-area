import axios from 'axios';

const API_BASE_URL = `${process.env.REACT_APP_API_URL}` || 'http://localhost:5000';

const api = axios.create({
    baseURL: API_BASE_URL,
});

export const callApi = (method, language, endpoint, data = null, headers = {}) => {
    if (!language) language = 'en';
    return new Promise(async (resolve, reject) => {
        try {
            const response = await api({
                method,
                url: '/' + language + endpoint,
                data,
                headers,
            });
            resolve(response.data);
        } catch (error) {
            console.error(`Error during API call to /${language + endpoint}:`, error);
            reject(error);
        }
    });
};

export default api;
