import React from 'react';
import { useNavigate, Link } from 'react-router-dom';

import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Logo from './assets/logo.png';
import SideBar from './components/SideBar';
import TopBar from './components/TopBar';
import Grid from '@mui/material/Grid';

import { useAuth } from '../AuthContext';

export default function Dashboard() {
    return (
        <Grid container>
            <Grid item xs={1.8}>
                <SideBar />
            </Grid>
            <Grid item xs={9}>
                <TopBar />
            </Grid>
        </Grid>
    );
}