import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import { useSettings } from '../../SettingsContext';
import { useTheme } from '../../themeContext';

const SideBar = () => {
    const { t } = useSettings();
    const location = useLocation();
    const { mainTheme } = useTheme();
    const [isDrawerOpen, setDrawerOpen] = useState(false);

    const activeStyle = { color: '#fff', textDecoration: 'none', marginLeft: '1rem', fontWeight: 'bold' };
    const inactiveStyle = { color: '#808080', textDecoration: 'none' };

    const handleDrawerOpen = () => {
        setDrawerOpen(true);
    };

    const handleDrawerClose = () => {
        setDrawerOpen(false);
    };

    return (
        <>
            <Box
                sx={{
                    display: { xs: 'none', sm: 'flex' },
                    width: '15%',
                    flexShrink: 0,
                    flexDirection: 'column',
                    background: mainTheme.palette.ForegroundItems.main,
                    boxShadow: '0px 8px 25px linear-gradient(to right, rgba(255, 0, 0, 1), rgba(0, 255, 0, 1))',
                    zIndex: 90,
                    position: 'fixed',
                    top: 0,
                    bottom: 0,
                    left: 0,
                    overflowY: 'auto',
                }}
            >
                <Toolbar />
                <Box sx={{ padding: '2rem' }}>
                    <Typography variant="h6" component="div">
                        <Link to="/dashboard" style={location.pathname === '/dashboard' ? activeStyle : inactiveStyle}>
                            {t("Dashboard")}
                        </Link>
                    </Typography>
                    <Typography variant="h6" component="div" sx={{ marginTop: '1rem' }}>
                        <Link
                            to="/dashboard/services"
                            style={location.pathname === '/dashboard/services' ? activeStyle : inactiveStyle}
                        >
                            {t("Automations")}
                        </Link>
                    </Typography>
                    <Typography variant="h6" component="div" sx={{ marginTop: '1rem' }}>
                        <Link
                            to="/dashboard/addservice"
                            style={location.pathname === '/dashboard/addservice' ? activeStyle : inactiveStyle}
                        >
                            {t("Create Automation")}
                        </Link>
                    </Typography>
                </Box>
            </Box>
            <Box sx={{ display: { xs: 'flex', sm: 'none' }, justifyContent: 'flex-start' }}>
                <IconButton color="inherit" onClick={handleDrawerOpen}>
                    <MenuIcon />
                </IconButton>
                <Drawer anchor="left" open={isDrawerOpen} onClose={handleDrawerClose}>
                    <Box
                        sx={{
                            width: '80vw',
                            padding: '2rem',
                            background: mainTheme.palette.ForegroundItems.main,
                        }}
                    >
                        <Typography variant="h6" component="div">
                            <Link to="/dashboard" style={location.pathname === '/dashboard' ? activeStyle : inactiveStyle}>
                                {t("Dashboard")}
                            </Link>
                        </Typography>
                        <Typography variant="h6" component="div" sx={{ marginTop: '1rem' }}>
                            <Link
                                to="/dashboard/services"
                                style={location.pathname === '/dashboard/services' ? activeStyle : inactiveStyle}
                            >
                                {t("Automations")}
                            </Link>
                        </Typography>
                        <Typography variant="h6" component="div" sx={{ marginTop: '1rem' }}>
                            <Link
                                to="/dashboard/addservice"
                                style={location.pathname === '/dashboard/addservice' ? activeStyle : inactiveStyle}
                            >
                                {t("Create Automation")}
                            </Link>
                        </Typography>
                    </Box>
                </Drawer>
            </Box>
        </>
    );
};

export default SideBar;
