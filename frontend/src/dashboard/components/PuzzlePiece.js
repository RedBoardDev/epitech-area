import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const PuzzlePiece = ({ name, description }) => {
    return (
        <>
            <Box
                sx={{
                    backgroundColor: 'black',
                    width: '200px',
                    height: '100px',
                    borderRadius: '10px',
                    margin: '10px',
                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: '10px',
                    color: 'white',
                }}
            >
                <Typography variant="h6" sx={{ marginBottom: '10px' }}>{name}</Typography>
                <Typography variant="body1">{description}</Typography>
            </Box>
            <ArrowForwardIosIcon sx={{ color: 'black', fontSize: '40px', margin: '10px', userSelect: 'none', alignSelf: 'center' }} />
        </>
    );
};
export default PuzzlePiece;
