// AuthContext.js

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
                logout(); // Déconnectez l'utilisateur en cas d'erreur 403
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

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout, verifyToken }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
