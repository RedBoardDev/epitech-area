import React from 'react';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Logo from '../img/logo.png';

function HeaderComponent({ isLoggedIn }) {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="fixed" style={{ top: 0, backgroundColor: '#000' }}>
                <Toolbar>
                    <Link to="/" style={{ textDecoration: 'none' }}>
                        <img src={Logo} alt="Logo" style={{ marginLeft: '50px', marginRight: '16px', height: 'auto', width: '100px' }} />
                    </Link>
                    <Typography variant="h4" component="div" sx={{ flexGrow: 1, color: '#fff' }}>
                        {/* HarmonieWeb */}
                    </Typography>
                    {isLoggedIn ? (
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
                                backgroundImage: 'linear-gradient(315deg, rgb(173, 31, 31) 0%, #d67a7a 74%)',
                            },
                        }}
                    >
                        Sign Out
                    </Button>
                    ) : (
                        <Button
                            variant="contained"
                            color="primary"
                            sx={{
                                marginLeft: '16px',
                                width: '140px',
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
                                    backgroundImage: 'linear-gradient(315deg, rgb(173, 31, 31) 0%, #d67a7a 74%)',
                                },
                            }}
                        >
                            Sign In
                        </Button>

                    )}
                </Toolbar>
            </AppBar>
        </Box>
    );
}

export default HeaderComponent;