import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import HeaderComponent from './Header';
import backgroundImage from '../img/BgTop.png';
import Button from '@mui/material/Button';
import ScrollButton from './ScrollButton';

const Home = () => {
    const { verifyToken, logout } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        // const checkAuthentication = async () => {
        //     try {
        //         const isAuthenticated = await verifyToken();
        //         if (!isAuthenticated) {
        //             navigate('/login');
        //         }
        //     } catch (error) {
        //         console.error('Error checking authentication:', error);
        //         navigate('/login');
        //     }
        // };

        // checkAuthentication();
    }, [verifyToken, navigate]);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };
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
                            HarmonieWeb
                        </h1>
                        <p style={{ fontSize: '1.6rem', fontWeight: 400, marginBottom: '2rem', textShadow: '0px 4px 4px rgba(0, 0, 0, 0.85)', color: '#fff' }}>
                            HarmonieWeb is an online and mobile platform.<br />It allows you to connect and harmonize your online actions in a simple and secure way !
                        </p>

                        <Button
                            size="large"
                            variant="outlined"
                            color="primary"
                            sx={{
                                marginLeft: '64px',
                                width: '220px',
                                height: '6.5vh',
                                backgroundColor: '#6b73ce',
                                border: 'none',
                                borderRadius: '10px',
                                cursor: 'pointer',
                                fontSize: '1.2rem',
                                fontWeight: '600',
                                color: '#ffffff',
                                textDecoration: 'none',
                                textAlign: 'center',
                                transition: '0.3s',
                                '&:hover': {
                                    backgroundColor: '#5a62bf',
                                },
                            }}
                        >
                            En savoir plus
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
            {/* <h2>Page d'Accueil</h2> */}
            {/* <ScrollButton />
            <button onClick={handleLogout}>Se Déconnecter</button> */}
        </div>
    );
};

export default Home;
{/* {isAuthenticated && ( */ }
// )}
