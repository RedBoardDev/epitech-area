import { createContext, useContext, useState, useEffect } from 'react';
import { callApi } from './ApiCaller';
import { useSettings } from './SettingsContext';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const { settings } = useSettings();
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const verifyToken = async () => {
            const storedToken = localStorage.getItem('token');
            const userID = localStorage.getItem('userID');

            if (!storedToken || !userID) {
                deleteData();
                setIsAuthenticated(false);
                return;
            }

            try {
                const response = await callApiWithToken('GET', `/user/${userID}`);
                saveData(storedToken, response.id);
                setIsAuthenticated(true);
            } catch (error) {
                console.error('Error verifying token:', error);
                deleteData();
                setIsAuthenticated(false);
            }
        };

        verifyToken();

    }, []);

    const saveData = (token, id) => {
        localStorage.setItem('token', token);
        localStorage.setItem('userID', id);
    };

    const deleteData = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userID');
    };

    const callApiWithToken = async (method, endpoint, data = null, headers = {}) => {
        try {
            const storedToken = localStorage.getItem('token');
            const authHeaders = { ...headers, Authorization: `Bearer ${storedToken}` };
            const response = await callApi(method, settings.language, endpoint, data, authHeaders);
            return response;
        } catch (error) {
            if (error.response && error.response.status === 403) {
                logout();
            }
            throw error;
        }
    };

    const verifyToken = async () => {
        const storedToken = localStorage.getItem('token');
        const userID = localStorage.getItem('userID');

        if (!storedToken || !userID) {
            deleteData();
            setIsAuthenticated(false);
            return false;
        }

        try {
            const response = await callApiWithToken('GET', `/user/${userID}`);
            saveData(storedToken, response.id);
            setIsAuthenticated(true);
            return true;
        } catch (error) {
            console.error('Error verifying token:', error);
            deleteData();
            setIsAuthenticated(false);
            return false;
        }
    };

    const register = async (email, password, lastname, firstname) => {
        try {
            const response = await callApi('POST', settings.language, '/auth/register', { email, password, lastname, firstname });
            saveData(response.token, response.id);
            setIsAuthenticated(true);
            return response;
        } catch (error) {
            console.error('Login error:', error);
            setIsAuthenticated(false);
            throw error;
        }
    };

    const registerGithub = async (code) => {
        try {
            const response = await callApi('POST', settings.language, `/auth/register/github/${code}`);
            saveData(response.token, response.id);
            setIsAuthenticated(true);
            return response;
        } catch (error) {
            console.error('Login error:', error);
            setIsAuthenticated(false);
            throw error;
        }
    };

    const login = async (email, password) => {
        try {
            const response = await callApi('POST', settings.language, '/auth/login', { email, password });
            saveData(response.token, response.id);
            setIsAuthenticated(true);
            return response;
        } catch (error) {
            console.error('Login error:', error);
            setIsAuthenticated(false);
            throw error;
        }
    };

    const loginGithub = async (code) => {
        try {
            const response = await callApi('POST', settings.language, `/auth/login/github/${code}`);
            saveData(response.token, response.id);
            setIsAuthenticated(true);
            return response;
        } catch (error) {
            console.error('Login error:', error);
            setIsAuthenticated(false);
            throw error;
        }
    };

    const logout = () => {
        deleteData();
        setIsAuthenticated(false);
    };

    const getAutomations = async () => {
        try {
            const response = await callApiWithToken('GET', `/automations`);
            setIsAuthenticated(true);
            return response;
        } catch (error) {
            console.error('Automations error:', error);
            setIsAuthenticated(false);
            throw error;
        }
    }

    const getAllServices = async () => {
        try {
            const response = await callApiWithToken('GET', `/service`);
            setIsAuthenticated(true);
            return response;
        } catch (error) {
            console.error('Service error:', error);
            setIsAuthenticated(false);
            throw error;
        }
    }

    const deleteAutomation = async (id) => {
        try {
            const response = await callApiWithToken('DELETE', `/automations`, { id });
            setIsAuthenticated(true);
            return response;
        } catch (error) {
            console.error('Automation delete error:', error);
            setIsAuthenticated(false);
            throw error;
        }
    }

    const getUserById = async () => {
        const userID = localStorage.getItem('userID');
        try {
            const response = await callApiWithToken('GET', `/user/${userID}`);
            setIsAuthenticated(true);
            return response;
        } catch (error) {
            console.error('Service error:', error);
            setIsAuthenticated(false);
            throw error;
        }
    }

    const updateUserById = async (lastname, firstname) => {
        const userID = localStorage.getItem('userID');
        try {
            const response = await callApiWithToken('PUT', `/user/${userID}`, { lastname, firstname });
            setIsAuthenticated(true);
            return response;
        } catch (error) {
            console.error('Service error:', error);
            setIsAuthenticated(false);
            throw error;
        }
    }

    const addAutomation = async (trigger_service_id, trigger_id, trigger_params, reaction_service_id, reaction_id, reaction_params) => {
        try {
            const response = await callApiWithToken('POST', `/automations`, { trigger_service_id, trigger_id, trigger_params, reaction_service_id, reaction_id, reaction_params });
            setIsAuthenticated(true);
            return response;
        } catch (error) {
            setIsAuthenticated(false);
            throw error;
        }
    }

    const serviceOauth = async (service_id) => {
        try {
            const response = await callApiWithToken('GET', `/service/oauth/${service_id}/connect`);
            setIsAuthenticated(true);
            window.open(response.url, '_blank');
            return response;
        } catch (error) {
            console.error('Service error:', error);
            setIsAuthenticated(false);
            throw error;
        }
    };

    return (
        <AuthContext.Provider value={{
            isAuthenticated,
            register,
            login,
            logout,
            verifyToken,
            getAutomations,
            getAllServices,
            deleteAutomation,
            getUserById,
            updateUserById,
            addAutomation,
            serviceOauth,
            loginGithub,
            registerGithub
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
