import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const PuzzlePiece = ({ name, description }) => {
    return (
        <Box
            sx={{
                backgroundColor: 'orange',
                width: '200px',
                height: '100px',
                borderRadius: '10px',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '10px',
            }}
        >
            <Typography variant="h6" sx={{ marginBottom: '10px' }}>{name}</Typography>
            <Typography variant="body1">{description}</Typography>
        </Box>
    );
};

export default PuzzlePiece;
