import React from 'react';
import HeaderComponent from './Header';
import backgroundImage from '../img/BgTop.png';
import Button from '@mui/material/Button';

const Lost = () => {
    return (
        <div>
            <HeaderComponent isLoggedIn={false} />
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
                        <h1 style={{ fontSize: '5.5rem', fontWeight: 700, marginBottom: '2rem', fontFamily: 'Roboto, sans-serif', background: 'linear-gradient(#ca6387, #c50854)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', textShadow: '0px 4px 4px rgba(255, 255, 255, 0.1)' }}>
                            HarmonieWeb 404
                        </h1>
                        <p style={{ fontSize: '1.6rem', fontWeight: 400, marginBottom: '2rem', textShadow: '0px 4px 4px rgba(0, 0, 0, 0.85)', color: '#fff' }}>
                            Are you lost ?
                        </p>
                        <Button size="large" variant="outlined" color="primary" sx={{ marginLeft: '64px', width: '220px', height: '6.5vh', backgroundColor: '#6b73ce', border: 'none', borderRadius: '10px', cursor: 'pointer', fontSize: '1.2rem', fontWeight: '600', color: '#ffffff', textDecoration: 'none', textAlign: 'center', padding: '0.5rem 1rem', boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)' }}>
                            <a href="/" style={{ textDecoration: 'none', color: '#fff' }}>Go back home</a>
                        </Button>
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

export default Lost;