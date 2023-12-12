import { createContext, useContext, useState, useEffect } from 'react';
import { callApi } from './ApiCaller';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
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
            const response = await callApi(method, endpoint, data, authHeaders);
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
            const response = await callApi('POST', '/auth/register', { email, password, lastname, firstname });
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
            const response = await callApi('POST', '/auth/login', { email, password });
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

    const getUserById = async (id) => {
        try {
            const response = await callApiWithToken('GET', `/user/${id}`);
            setIsAuthenticated(true);
            return response;
        } catch (error) {
            console.error('Service error:', error);
            setIsAuthenticated(false);
            throw error;
        }
    }

    const updtaeUserById = async (id, lastname, firstname) => {
        try {

            const response = await callApiWithToken('PUT', `/user/${id}`, { lastname, firstname });
            setIsAuthenticated(true);
            return response;
        } catch (error) {
            console.error('Service error:', error);
            setIsAuthenticated(false);
            throw error;
        }
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, register, login, logout, verifyToken, getAutomations, getAllServices, deleteAutomation, getUserById, updtaeUserById }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
