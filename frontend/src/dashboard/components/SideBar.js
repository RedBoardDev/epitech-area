import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Slide from '@mui/material/Slide';

import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Logo from '../assets/logo.png';

export default function SideBar() {
    const navigate = useNavigate();
    const [isSidebarOpen, setSidebarOpen] = useState(true);

    const handleSidebarToggle = () => {
        setSidebarOpen(!isSidebarOpen);
    };

    const activeStyle = { color: '#fff', textDecoration: 'none', marginLeft: '1rem', fontWeight: 'bold' };
    const inactiveStyle = { color: '#808080', textDecoration: 'none' };

    return (
        <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', position: 'fixed', height: '100%', width: isSidebarOpen ? '15%' : '5%', background: '#222222', transition: 'width 0.5s' }}>
            <AppBar position="static" style={{ background: 'transparent', boxShadow: 'none' }}>
                <Toolbar>
                    <Link to="/dashboard" style={{ textDecoration: 'none', color: '#fff' }}>
                        {isSidebarOpen ? <img src={Logo} alt="Logo" style={{ width: '80%', height: 'auto' }} /> : ''}
                    </Link>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1, marginLeft: '1rem' }}>
                        {isSidebarOpen ? 'HarmonieWeb' : ''}
                    </Typography>
                    <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleSidebarToggle}>
                        {isSidebarOpen ? <ArrowBackIosIcon /> : <ArrowForwardIosIcon />}
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Slide direction="left" in={isSidebarOpen} mountOnEnter unmountOnExit>
                <Box sx={{ marginTop: '2rem', marginLeft: '2.2rem' }}>
                    <Typography variant="h6" component="div">
                        <Link to="/dashboard" style={activeStyle}>
                            Dashboard
                        </Link>
                    </Typography>
                    <Typography variant="h6" component="div" sx={{ marginTop: '1rem' }}>
                        <Link to="/dashboard/services" style={inactiveStyle}>
                            Services
                        </Link>
                    </Typography>
                </Box>
            </Slide>
        </Box>
    );
}

