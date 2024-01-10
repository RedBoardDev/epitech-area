import React, { useEffect } from 'react';
import ServicesList from './components/AutomationsList';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import { useTheme } from '../themeContext';
import PageTitle from './components/PageTitle';

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
        <div style={{ backgroundColor: mainTheme.palette.mode, height: '100%', width:'100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <PageTitle title="Services Dashboard" />
            <div style={{ width: '85%', overflow: 'auto', paddingTop: '10px' }}>
                <ServicesList />
            </div>
        </div>
    );
}
