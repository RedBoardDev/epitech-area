import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { motion } from "framer-motion";

const ServiceBlock = ({ imageSrc, title, backgroundColor }) => {
    const navigate = useNavigate();

    const handleClick = async (e) => {
        navigate(`/service/${title}`);
    };
    return (
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
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
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
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 20
                  }}
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
                />
            </Paper>
        </motion.div>
    );
};

export default ServiceBlock;
