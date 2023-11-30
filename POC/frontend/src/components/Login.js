// Login.js

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';

const Login = () => {
    const [username, setUsername] = useState('test@thomasott.com');
    const [password, setPassword] = useState('test123/');
    const { login, logout, verifyToken } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const checkToken = async () => {
            if (await verifyToken()) {
                navigate('/');
            }
        };
        checkToken();
    }, [verifyToken, navigate]);

    const handleLogin = async () => {
        try {
            await login(username, password);
            navigate('/');
        } catch (error) {
            logout();
            console.error('Login failed:', error);
        }
    };

    return (
        <div>
            <h2>Page de Connexion</h2>
            {/* Interface utilisateur pour le formulaire de connexion */}
            <button onClick={handleLogin}>Se Connecter</button>
        </div>
    );
};

export default Login;
