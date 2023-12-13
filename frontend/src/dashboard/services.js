import React from 'react';
import SideBar from './components/SideBar';
import TopBar from './components/TopBar';
import Grid from '@mui/material/Grid';
import ServicesList from './components/AutomationsList';

export default function ServicesDash() {
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