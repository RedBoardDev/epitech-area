import React, { useEffect, useState } from 'react';
import SideBar from './components/SideBar';
import TopBar from './components/TopBar';
import { useAuth } from '../AuthContext';
import { useSettings } from '../SettingsContext';
import { Grid, Box, Typography } from '@mui/material';
import ServiceBox from './components/ServiceBox';

export default function ServicesDash() {
    const { t } = useSettings();
    const [services, setServices] = useState([]);
    const { getAllServices, addAutomation, serviceOauth } = useAuth();

    useEffect(() => {
        getAllServices()
            .then((data) => setServices(data))
            .catch((error) => console.error('Error:', error));
    }, [getAllServices]);

    return (
        <Grid container>
            <Grid item xs={10}>
                <Grid container direction="column">
                    <Grid item xs={4}>
                        <Box
                            sx={{
                                position: 'absolute',
                                height: 'auto',
                                marginTop: '6.4%',
                                left: '15%',
                                width: 'calc(100% - 15%)',
                                overflowY: 'auto',
                                // padding: '20px',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: 'red'
                            }}
                        >
                            <Typography
                                variant="h3"
                                sx={{
                                    textAlign: 'center',
                                    color: 'white',
                                    fontWeight: 'bold',
                                    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)',
                                    // marginBottom: '20px',
                                }}
                            >
                                Explore Services
                            </Typography>
                            <div style={{ height: 'auto', width: '100%', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px' }}>
                                {services && services.map((service) => (
                                    <ServiceBox
                                        id={service.id}
                                        name={service.name}
                                        color={service.color}
                                        icon={service.icon}
                                    />
                                ))}
                            </div>
                        </Box>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}
