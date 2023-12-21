import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../AuthContext';

import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Logo from '../img/logo.png';
import { useSettings } from '../SettingsContext';

function HeaderComponent({ showButton }) {
    const { t } = useSettings();
    const { isAuthenticated, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogin = () => {
        navigate('/login');
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="fixed" style={{ top: 0, backgroundColor: '#000' }}>
                <Toolbar>
                    <Link to="/" style={{ textDecoration: 'none' }}>
                        <img src={Logo} alt="Logo" style={{ marginLeft: '50px', marginRight: '16px', height: 'auto', width: '90px' }} />
                    </Link>
                    <Typography variant="h4" component="div" sx={{ flexGrow: 1, color: '#fff' }}>
                        {/* HarmonieWeb */}
                    </Typography>
                    <Typography
                        component={Link}
                        to="/"
                        variant="h6"
                        color="primary"
                        sx={{
                            marginRight: '46px',
                            textDecoration: 'none',
                            color: '#fff',
                        }}
                    >
                        {t("Home")}
                    </Typography>
                    <Typography
                        component={Link}
                        to="/services"
                        variant="h6"
                        color="primary"
                        sx={{
                            marginRight: '46px',
                            textDecoration: 'none',
                            color: '#fff',
                        }}
                    >
                        {t("Services")}
                    </Typography>
                    {isAuthenticated ? (
                        <Button
                            variant="contained"
                            color="primary"
                            sx={{
                                marginLeft: '16px',
                                width: '160px',
                                height: '5vh',
                                backgroundColor: '#4B4E6D',
                                border: 'none',
                                padding: '0 0%',
                                borderRadius: '10px',
                                cursor: 'pointer',
                                fontSize: '1.4rem',
                                fontWeight: '500',
                                color: '#ffffff',
                                textDecoration: 'none',
                                textAlign: 'center',
                                transition: '0.3s',
                                '&:hover': {
                                    backgroundImage: 'linear-gradient(315deg, #8130a2 0%, #dd067f 74%)',
                                },
                            }}
                            component={Link}
                            to="/dashboard"
                        >
                            {t("Dashboard")}
                        </Button>
                    ) : (
                        <Button
                            onClick={handleLogin}
                            variant="contained"
                            color="primary"
                            sx={{
                                marginLeft: '16px',
                                height: '5vh',
                                backgroundColor: '#4B4E6D',
                                border: 'none',
                                paddingX: '15px',
                                borderRadius: '10px',
                                cursor: 'pointer',
                                fontSize: '1.4rem',
                                fontWeight: '500',
                                color: '#ffffff',
                                textDecoration: 'none',
                                textAlign: 'center',
                                transition: '0.3s',
                                '&:hover': {
                                    backgroundImage: 'linear-gradient(315deg, #8130a2 0%, #dd067f 74%)',
                                },
                            }}
                        >
                            {t("Sign In")}
                        </Button>
                    )}
                </Toolbar>
            </AppBar>
        </Box>
    );
}

export default HeaderComponent;
