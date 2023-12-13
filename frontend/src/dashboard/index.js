import React, { useEffect } from 'react';
import SideBar from './components/SideBar';
import TopBar from './components/TopBar';
import Grid from '@mui/material/Grid';

import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';


export default function Dashboard() {
    const [isSidebarOpen] = React.useState(true);
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
            <Grid item xs={1.8}>
                {isSidebarOpen ? <SideBar /> : null}
            </Grid>
            <Grid item xs={9}>
                {isSidebarOpen ? <TopBar /> : null}
            </Grid>
        </Grid>
    );
}