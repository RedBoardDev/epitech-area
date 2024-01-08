import React, { useEffect } from 'react';
import SideBar from './components/SideBar';
import TopBar from './components/TopBar';
import Grid from '@mui/material/Grid';
import Card from "./components/Card"
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import ServicesList from './components/AutomationsList';
import { useTheme } from '../themeContext';


export default function Dashboard() {
    const [isSidebarOpen] = React.useState(true);
    const navigate = useNavigate();
    const { verifyToken } = useAuth();
    const { mainTheme } = useTheme();

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
            <div style={{paddingLeft: '2%', width: '80%', height: '100%', zIndex: '5', position: 'absolute', top: '6%', left: '15%'}}>
                <Grid container spacing={2}>
                    <h1>Welcome, USERNAME
                    <h2>Here is your dashboard</h2>
                    </h1>
                    <Grid item xs={6}>
                    </Grid>
                    <Grid item xs={6}>
                        <Card title="Total Users" description="100" color="#cdb4db" icon="person" />
                    </Grid>
                    <Grid item xs={6}>
                        <Card title="Total Posts" description="100" color="#ffc8dd" />
                    </Grid>
                    <Grid item xs={6}>
                        <Card title="Total Comments" description="100" color="#bde0fe" />
                    </Grid>
                    <Grid item xs={6}>
                        <Card title="Total Likes" description="100" color="#a2d2ff" />
                    </Grid>
                </Grid>
            </div>
            <h1 style={{position: 'absolute', top: '50%', left: '16%', fontWeight: '100'}}>Your favorite services</h1>
            <div style={{backgroundColor: mainTheme.palette.mode, height: '93.5%', top: '53.5%', left: '15%', position: 'absolute', width: '85%', zIndex: '-1', overflow: 'auto', padding: '2%'}}>
                <ServicesList />
            </div>
        </Grid>
    );
}

