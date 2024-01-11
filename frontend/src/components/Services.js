import React, { useState, useEffect } from 'react';
import { Grid, Box } from '@mui/material';
import HeaderComponent from './Header';
import Logo from '../img/logo.png';
import { useAuth } from '../AuthContext';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../themeContext';
import ServiceBox from '../dashboard/components/ServiceBox';
import SearchIcon from '@mui/icons-material/Search';
import PageTitle from '../dashboard/components/PageTitle';

const Services = () => {
    const navigate = useNavigate();
    const [allServices, setAllServices] = useState(null);
    const { verifyToken, getAllServices } = useAuth();
    const { mainTheme } = useTheme();
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const getServices = async () => {
            if (!(await verifyToken())) {
                navigate('/login');
            } else {
                try {
                    const result = await getAllServices();
                    setAllServices(result);
                } catch (error) {
                    console.error('Error fetching automations:', error);
                }
            }
        };
        getServices();
    }, [verifyToken, navigate, getAllServices]);

    const onClickBox = (id) => {
        navigate(`/service/${id}`);
    }

    return (
        <Grid content item xs={12} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
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
                <PageTitle title={`Explore available services`} />
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
                    {allServices && allServices
                        .filter((service) => service.name.toLowerCase().includes(searchTerm.toLowerCase()))
                        .map((service) => (
                            <Grid key={service.name} item>
                                <ServiceBox
                                    id={service.name}
                                    name={service.name}
                                    color={service.color}
                                    icon={service.icon}
                                    onClick={onClickBox}
                                />
                            </Grid>
                        ))}
                </div>
            </Box>
        </Grid>
    );
};

export default Services;
