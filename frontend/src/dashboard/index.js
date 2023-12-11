import React from 'react';


import SideBar from './components/SideBar';
import TopBar from './components/TopBar';
import Grid from '@mui/material/Grid';


export default function Dashboard() {
    const [isSidebarOpen] = React.useState(true);

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