import React, { useEffect } from 'react';
import SideBar from './components/SideBar';
import TopBar from './components/TopBar';
import Grid from '@mui/material/Grid';
import ServicesList from './components/AutomationsList';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';

export default function ServicesDash() {
    const navigate = useNavigate();
    const { verifyToken } = useAuth();

    useEffect(() => {
        const checkToken = async () => {
            if (!await verifyToken()) {
                navigate('/login');
            }
        };
        checkToken();
    }, [verifyToken, navigate]);

    return (
        <Grid container style={{overflow: 'hidden'}}>
            <Grid item xs={2}>
                <SideBar />
            </Grid>
            <Grid item xs={10} style={{overflow: 'hidden'}}>
                <Grid container direction="column" style={{overflow: 'hidden'}}>
                    <Grid item>
                        <TopBar />
                    </Grid>
                    <Grid item xs={12} style={{overflow: 'hidden'}}>
                        <div style={{backgroundColor: 'white', height: '93.5%', top: '6.5%', left: '15%', position: 'absolute', width: '85%', zIndex: '-1', overflow: 'auto', padding: '2%'}}>
                            <ServicesList />
                        </div>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}