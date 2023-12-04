import React from 'react';
import { Grid, Box } from '@mui/material';
import HeaderComponent from './Header';
import ServiceBlock from './ServiceBlock';
import Logo from '../img/logo.png';

const Services = () => {

    const services = [
        {
            imageSrc: Logo,
            title: 'Service 1',
            backgroundColor: '#4B4E6D',
        },
        {
            imageSrc: Logo,
            title: 'Service 1',
            backgroundColor: '#4B4E6D',
        }, {
            imageSrc: Logo,
            title: 'Service 1',
            backgroundColor: '#4B4E6D',
        }, {
            imageSrc: Logo,
            title: 'Service 1',
            backgroundColor: '#4B4E6D',
        }, {
            imageSrc: Logo,
            title: 'Service 1',
            backgroundColor: '#4B4E6D',
        }, {
            imageSrc: Logo,
            title: 'Service 1',
            backgroundColor: '#4B4E6D',
        },
    ];

    return (
        <Box style={{ backgroundColor: '#f2f2f2', minHeight: '100vh', overflow: 'hidden' }}>
            <HeaderComponent isLoggedIn={false} />
            <Box
                style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '50%',
                    backgroundColor: 'rgba(217, 217, 217, 0.4)',
                    padding: '20px',
                    borderRadius: '10px',
                }}
            >
                <Grid container spacing={3} justifyContent="center">
                    {services.map((service, index) => (
                        <Grid item key={index}>
                            <ServiceBlock imageSrc={service.imageSrc} title={service.title} backgroundColor={service.backgroundColor} />
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Box>
    );
};

export default Services;
