import React from 'react';
import SideBar from './components/SideBar';
import TopBar from './components/TopBar';
import Grid from '@mui/material/Grid';

export default function ServicesDash() {
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