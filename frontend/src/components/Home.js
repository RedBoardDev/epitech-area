import React from 'react';
import backgroundImage from '../img/BgTop.png';
import { Button, Typography } from '@mui/material';
import { useSettings } from '../SettingsContext';
import Hidden from '@mui/material/Hidden';

const Home = () => {
    const { t } = useSettings();

    return (
        <div>
            <div style={{ marginTop: '0px', background: 'linear-gradient(to right, #000000, #4b4b4b)' }}>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        width: '100%',
                        height: '100vh',
                        backgroundImage: `url(${backgroundImage})`,
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'right bottom',
                        backgroundSize: '60% 100%',
                    }}
                >
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'flex-start',
                            width: '50%',
                            height: '100%',
                            padding: '0 5%',
                        }}
                    >
                        <Hidden smDown>
                            <Typography
                                variant="h2"
                                component="h1"
                                sx={{
                                    fontSize: '5.5rem',
                                    fontWeight: 700,
                                    marginBottom: '2rem',
                                    fontFamily: 'Roboto, sans-serif',
                                    background: 'linear-gradient(#ca6387, #c50854)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    textShadow: '0px 4px 4px rgba(255, 255, 255, 0.1)',
                                }}
                            >
                                HarmonieWeb
                            </Typography>
                        </Hidden>
                        <p style={{ fontSize: '1.6rem', fontWeight: 400, marginBottom: '2rem', textShadow: '0px 4px 4px rgba(0, 0, 0, 0.85)', color: '#fff' }}>
                            {t("HarmonieWeb is an online and mobile platform.")}<br />{t("It allows you to connect and harmonize your online actions in a simple and secure way!")}
                        </p>
                    </div>
                    <div
                        style={{
                            width: '50%',
                            height: '100vh',
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default Home;
