import React, { useState, useEffect } from 'react';
import { Grid, Box } from '@mui/material';
import { useAuth } from '../AuthContext';
import { useNavigate } from 'react-router-dom';
import ServiceBox from '../dashboard/components/ServiceBox';
import SearchIcon from '@mui/icons-material/Search';
import PageTitle from '../dashboard/components/PageTitle';
import { motion } from "framer-motion";

const Services = () => {
    const navigate = useNavigate();
    const [allServices, setAllServices] = useState(null);
    const { getAllServices } = useAuth();
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {

        const getServices = async () => {
            try {
                const result = await getAllServices();
                setAllServices(result);
            } catch (error) {
                console.error('Error fetching automations:', error);
            }
        };
        getServices();
    }, [navigate, getAllServices]);

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
                            <motion.div
                                className="box"
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{
                                  duration: 0.8,
                                  delay: 0.2,
                                  ease: [0, 0.71, 0.2, 1.01]
                                }}
                            >
                                <Grid key={service.name} item>
                                    <ServiceBox
                                        id={service.name}
                                        name={service.name}
                                        color={service.color}
                                      g  icon={service.icon}
                                        onClick={onClickBox}
                                    />
                                </Grid>
                            </motion.div>
                        ))}
                </div>
            </Box>
        </Grid>
    );
};

export default Services;
