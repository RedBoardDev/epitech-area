// Automatisation.js

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';

import { Grid, Box } from '@mui/material';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import HeaderComponent from './Header';

const Automations = () => {
    const { verifyToken, getAutomations } = useAuth();
    const navigate = useNavigate();
    const [automations, setAutomations] = useState();

    useEffect(() => {
        const checkToken = async () => {
            if (!(await verifyToken())) {
                navigate('/login');
            } else {
                const getAllAutomations = async () => {
                    const result = await getAutomations();
                    setAutomations(result);
                };
                getAllAutomations();
            }
        };
        checkToken();
    }, [verifyToken, navigate, getAutomations]);

    console.log(automations);
    return (
        <div>
            <HeaderComponent isLoggedIn={false} />
            <Box
                style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '50%',
                    backgroundColor: 'rgba(217, 217, 217, 0.4)',
                    padding: '20px',
                    borderRadius: '10px',
                }}
            >Salut</Box>
        </div>
    )
}

export default Automations;