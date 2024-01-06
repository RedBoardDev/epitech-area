import React, { useState, useEffect } from 'react';
import { Box, Card, CardContent, Typography } from '@mui/material';
import HeaderComponent from '../Header';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../AuthContext';
import { useSettings } from '../../SettingsContext';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import IconButton from '@mui/material/IconButton';

const validServiceNames = ['Github', 'Twitch', 'Youtube', 'Trello', 'Microsoft Calendar', 'Spotify', 'Discord'];

const ServicesGithub = () => {
    const navigate = useNavigate();
    const [allServices, setAllServices] = useState("");
    const { verifyToken, getServiceById } = useAuth();
    const { serviceName } = useParams();
    const { t } = useSettings();

    const formatServiceId = (serviceName) => {
        return serviceName.toLowerCase().replace(/\s+/g, '_');
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (!(await verifyToken())) {
                    navigate('/login');
                } else {
                    const formattedServiceId = formatServiceId(serviceName);
                    const result = await getServiceById(formattedServiceId);
                    const allTriggers = result.triggers || [];
                    const allReactions = result.reactions || [];
                    const icon = result.icon || "";
                    const color = result.color || "";
                    const description = result.description || "";
                    const title = result.name || "";

                    setAllServices({
                        title,
                        icon,
                        color,
                        description,
                        triggers: allTriggers,
                        reactions: allReactions,
                    });
                }
            } catch (error) {
                console.error('Error fetching service by id:', error);
            }
        };
    
        if (!validServiceNames.includes(serviceName)) {
            navigate('/lost');
        } else {
            fetchData();
        }
    }, [verifyToken, getServiceById, navigate, serviceName]);
    
    return (
        <Box style={{ backgroundColor: allServices.color, minHeight: '100vh', textAlign: 'center' }}>
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
                <IconButton 
                    onClick={() => {navigate('/services')}} 
                    style={{ 
                        position: 'absolute', 
                        top: '10px', 
                        left: '10px', 
                        borderRadius: '10px', 
                        border: '4px solid white', 
                    }}
                >
                    <ArrowBackIosIcon/> 
                    {`${t("Go back services")}`}
                </IconButton>
                <IconButton 
                    onClick={() => {
                         window.open(`http://www.${allServices.title.split(' ')[0]}.com`, '_blank') 
                        }} 
                    style={{ 
                        position: 'absolute', 
                        top: '10px', 
                        right: '10px', 
                        borderRadius: '10px', 
                        border: '4px solid white', 
                    }}
                >
                    {`${t("Visit")} ${allServices.title}`}
                </IconButton>
                <img
                    src={process.env.REACT_APP_API_URL + allServices.icon}
                    alt={allServices.icon}
                    style={{ width: '100px', height: 'auto', borderRadius: '50%' }}
                />
                <h2 style={{ fontWeight: 'bold', marginTop: '10px' }}>{allServices.description}</h2>
                <Box>
                    <h4>{t("Triggers")}:</h4>
                    {allServices ? allServices.triggers.map(trigger => (
                        <Card key={trigger.id} style={{ marginBottom: '10px', borderRadius: '10px' }}>

                            <CardContent>
                                <Typography variant="h6">
                                    {trigger.name}
                                </Typography>
                            </CardContent>
                        </Card>
                    )) : ""}
                </Box>
                <Box>                 
                    <h4>{t("Reactions")}:</h4>
                    {allServices ? allServices.reactions.map(reaction => (
                        <Card key={reaction.id} style={{ marginBottom: '10px', borderRadius: '10px' }}>
                            <CardContent>
                                <Typography variant="h6">
                                    {reaction.name}
                                </Typography>
                            </CardContent>
                        </Card>
                    )) : ""}
                </Box>
            </Box>
        </Box>
    );
};

export default ServicesGithub;
