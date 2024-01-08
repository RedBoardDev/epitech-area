import React, { useState } from 'react';
import {Link, useLocation } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Slide from '@mui/material/Slide';

import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Logo from '../assets/logo.png';
import { useSettings } from '../../SettingsContext';
import { useTheme } from '../../themeContext';
export default function SideBar() {
    const { t } = useSettings();
    const location = useLocation();
    const [isSidebarOpen, setSidebarOpen] = useState(true);
    const { mainTheme } = useTheme();
    const handleSidebarToggle = () => {
        setSidebarOpen(!isSidebarOpen);
    };

    const activeStyle = { color: '#fff', textDecoration: 'none', marginLeft: '1rem', fontWeight: 'bold' };
    const inactiveStyle = { color: '#808080', textDecoration: 'none' };

    return (
        <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', position: 'fixed', height: '100%', width: isSidebarOpen ? '15%' : '5%', background: mainTheme.palette.ForegroundItems.main, transition: 'width 0.5s', boxShadow: '0px 8px 25px linear-gradient(to right, rgba(255, 0, 0, 1), rgba(0, 255, 0, 1))' }}>
            <AppBar position="static" style={{ background: 'transparent', boxShadow: 'none' }}>
                <Toolbar>
                    <Link to="/dashboard" style={{ textDecoration: 'none', color: '#fff' }}>
                        {isSidebarOpen ? <img src={Logo} alt="Logo" style={{ width: '80%', height: 'auto' }} /> : ''}
                    </Link>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1, marginRight: '20px' }}>
                        {isSidebarOpen ? 'HarmonieWeb' : ''}
                    </Typography>
                    <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleSidebarToggle}>
                        {isSidebarOpen ? <ArrowBackIosIcon /> : <ArrowForwardIosIcon />}
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Slide direction="right" in={isSidebarOpen} mountOnEnter unmountOnExit>
                <Box sx={{ marginTop: '2rem', marginLeft: '2.2rem' }}>
                    <Typography variant="h6" component="div">
                        <Link to="/dashboard" style={location.pathname === '/dashboard' ? activeStyle : inactiveStyle}>
                            {t("Dashboard")}
                        </Link>
                    </Typography>
                    <Typography variant="h6" component="div" sx={{ marginTop: '1rem' }}>
                        <Link to="/dashboard/services" style={location.pathname === '/dashboard/services' ? activeStyle : inactiveStyle}>
                            {t("Automations")}
                        </Link>
                    </Typography>
                    <Typography variant="h6" component="div" sx={{ marginTop: '1rem' }}>
                        <Link to="/dashboard/addservice" style={location.pathname === '/dashboard/addservice' ? activeStyle : inactiveStyle}>
                            {t("Create Automation")}
                        </Link>
                    </Typography>
                </Box>
            </Slide>
        </Box>
    );
}

