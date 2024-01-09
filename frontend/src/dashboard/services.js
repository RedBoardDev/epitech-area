import React, { useEffect } from 'react';
import Grid from '@mui/material/Grid';
import ServicesList from './components/AutomationsList';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import { useTheme } from '../themeContext';

export default function ServicesDash() {
    const navigate = useNavigate();
    const { verifyToken } = useAuth();
    const { mainTheme } = useTheme();

    useEffect(() => {
        const checkToken = async () => {
            if (!(await verifyToken())) {
                navigate('/login');
            }
        };
        checkToken();
    }, [verifyToken, navigate]);

    return (
        <div style={{ backgroundColor: mainTheme.palette.mode, height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h1 style={{ color: mainTheme.palette.primary.main }}>Services Dashboard</h1>
            <div style={{ width: '85%', overflow: 'auto', paddingTop: '10px' }}>
                <ServicesList />
            </div>
        </div>
    );
}
