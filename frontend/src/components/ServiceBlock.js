import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';

const ServiceBlock = ({ imageSrc, title, backgroundColor }) => {
    const { verifyToken } = useAuth();
    const navigate = useNavigate();

    const handleClick = async (e) => {
        navigate(`/service/${title}`);
    };
    return (
        <Paper
            elevation={3}
            onClick={handleClick}
            sx={{
                position: 'relative',
                cursor: 'pointer',
                width: '200px',
                height: '200px',
                borderRadius: '8%',
                backgroundColor: backgroundColor,
                '&:hover': {
                    '& .overlay': {
                        opacity: 0.2,
                    },
                },
            }}
        >
            <Box
                sx={{
                    position: 'absolute',
                    top: '10%',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    textAlign: 'center',
                }}
            >
                <img
                    src={process.env.REACT_APP_API_URL + imageSrc}
                    alt={title}
                    style={{ width: '100px', height: 'auto', borderRadius: '50%' }}
                />
                <Typography variant="h6" sx={{ color: '#fff', marginTop: '4px' }}>
                    {title}
                </Typography>
            </Box>
            <Box
                className="overlay"
                sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundColor: '#000',
                    opacity: 0,
                    transition: 'opacity 0.3s',
                }}
            ></Box>
        </Paper>
    );
};

export default ServiceBlock;
