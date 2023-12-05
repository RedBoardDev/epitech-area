import React from 'react';
import Fab from '@mui/material/Fab';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const ScrollButton = () => {
    const handleScrollDown = () => {
        window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
    };

    return (
        <div
            style={{
                position: 'fixed',
                bottom: '20px',
                left: '50%',
                transform: 'translateX(-50%)',
                textAlign: 'center',
            }}>
            <Fab
                color="primary"
                aria-label="scroll-down"
                sx={{
                    backgroundColor: '#4b0082',
                    color: '#ffffff',
                    '&:hover': {
                        backgroundColor: '#2e003e',
                    },
                }}
                onClick={handleScrollDown}
            >
                <ExpandMoreIcon />
            </Fab>
        </div>
    );
};

export default ScrollButton;
