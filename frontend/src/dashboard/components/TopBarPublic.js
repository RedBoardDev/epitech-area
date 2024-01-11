import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useTheme } from '../../themeContext';
import Logo from '../assets/logo.png';
import { Typography, AppBar, Toolbar, Button, IconButton } from '@mui/material';
import { useSettings } from '../../SettingsContext';
import { useAuth } from '../../AuthContext';
import Hidden from '@mui/material/Hidden';
import DashboardIcon from '@mui/icons-material/Dashboard';
import HomeIcon from '@mui/icons-material/Home';
import LoginIcon from '@mui/icons-material/Person';

export default function TopBarPublic() {
    const { t } = useSettings();
    const { verifyToken, isAuthenticated } = useAuth();
    const { mainTheme } = useTheme();
    const navigate = useNavigate();

    useEffect(() => {
        verifyToken();
    }, []);
    const handleLogin = () => {
        navigate('/login');
    };

    const handleHome = () => {
        navigate('/');
    }

    return (
        <AppBar position="fixed" style={{ right: 0, width: '100%', zIndex: 100 }}>
            <Toolbar style={{ background: mainTheme.palette.ForegroundItems.main }} sx={{ boxShadow: 3 }}>
                <div style={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
                    <Link to="/">
                        <img src={Logo} alt="Logo" style={{ display: 'block', margin: '4px 10px 0 0', maxWidth: '80px', height: 'auto' }} />
                    </Link>
                </div>
                <IconButton onClick={handleHome} sx={{ marginRight: '30px' }}>
                    <HomeIcon style={{ color: 'white' }} fontSize='large' />
                </IconButton>
                <div style={{ display: 'flex', alignItems: 'center', marginLeft: 'auto' }}>
                    <Typography
                        component={Link}
                        to="/services"
                        variant="h6"
                        color="primary"
                        sx={{
                            marginRight: '30px',
                            marginTop: '3px',
                            textDecoration: 'none',
                            color: '#fff',
                            fontSize: '1.4rem',
                        }}
                    >
                        {t("Services")}
                    </Typography>

                    {isAuthenticated ? (
                        <Button
                            variant="contained"
                            color="primary"
                            sx={{
                                height: '5vh',
                                background: 'linear-gradient(315deg, #6E0FD4 0%, #B71CFF 74%)',
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
                                    background: 'linear-gradient(315deg, #6E0FD4 0%, #B71CFF 24%)',
                                },
                            }}
                            component={Link}
                            to="/dashboard"
                        >
                            <Hidden smDown>{`${t("Dashboard")}`}</Hidden>
                            <Hidden smUp><DashboardIcon fontSize='large' /></Hidden>
                        </Button>
                    ) : (
                        <Button
                            onClick={handleLogin}
                            variant="contained"
                            color="primary"
                            sx={{
                                height: '5vh',
                                background: 'linear-gradient(315deg, #6E0FD4 0%, #B71CFF 74%)',
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
                                    background: 'linear-gradient(315deg, #6E0FD4 0%, #B71CFF 24%)',
                                },
                            }}
                        >
                            <Hidden smDown>{t("Sign In")}</Hidden>
                            <Hidden smUp><LoginIcon fontSize='large' /></Hidden>
                        </Button>
                    )}
                </div>
            </Toolbar>
        </AppBar>
    );
}
