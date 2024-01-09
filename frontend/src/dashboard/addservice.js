import React, { useEffect, useState } from 'react';
import { useAuth } from '../AuthContext';
import { Grid, Box } from '@mui/material';
import ServiceBox from './components/ServiceBox';
import SearchIcon from '@mui/icons-material/Search';
import PageTitle from './components/PageTitle';

export default function AddService() {
    const [services, setServices] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const { getAllServices, addAutomation, serviceOauth } = useAuth();

    useEffect(() => {
        getAllServices()
            .then((data) => setServices(data))
            .catch((error) => console.error('Error:', error));
    }, [getAllServices]);

    return (
        <Grid container>
            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Box
                    sx={{
                        width: '85%',
                        overflowY: 'auto',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <PageTitle title="Explore Services" />
                    <div style={{
                        marginBottom: '30px',
                        display: 'flex',
                        alignItems: 'center',
                        position: 'relative',
                        width: '26%'
                    }}>
                        <SearchIcon style={{ position: 'absolute', marginLeft: '10px', fontSize: '2rem', color: 'black' }} />
                        <input
                            type="text"
                            placeholder="Search services..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            style={{
                                padding: '12px',
                                width: '100%',
                                borderRadius: '8px',
                                border: '3px solid #f5f5f5',
                                backgroundColor: '#f5f5f5',
                                color: 'black',
                                fontSize: '1rem',
                                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                                outline: 'none',
                                paddingLeft: '40px',
                            }}
                            onFocus={() => {
                                document.getElementById('searchInput').style.border = '3px solid black';
                            }}
                            onBlur={() => {
                                document.getElementById('searchInput').style.border = '3px solid transparent';
                            }}
                            id="searchInput"
                        />

                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px', maxWidth: '700px' }}>
                        {services
                            .filter((service) => service.name.toLowerCase().includes(searchTerm.toLowerCase()))
                            .map((service) => (
                                <ServiceBox
                                    key={service.id}
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
    );
}
