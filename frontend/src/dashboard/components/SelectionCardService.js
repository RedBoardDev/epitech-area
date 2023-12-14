import React, { useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { styled } from '@mui/system';
import AddIcon from '@mui/icons-material/Add';

const StyledBox = styled(Box)({
    width: '250px',
    marginLeft: '20px',
    marginBottom: '20px',
    background: 'rgba(10, 10, 10, 0.8)',
    padding: '0.3rem',
    borderRadius: '15px',
    border: '1px solid rgba(255, 255, 255, 0.6)',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
    '&:hover': {
        backgroundColor: 'rgba(18, 18, 18, 0.5)',
    },
    position: 'relative',
});

const AddIconWrapper = styled(AddIcon)({
    position: 'absolute',
    top: '10px',
    right: '10px',
    color: 'white',
});

function SelectionCardService({ service }) {

    const handleClick = () => {
        console.log(service.name);
    };

    return (
        <StyledBox onClick={handleClick}>
            <Typography variant="h6" sx={{ color: 'white', padding: '1rem' }}>
                {service.name}
            </Typography>
            <Typography variant="body2" sx={{ color: 'white', padding: '1rem' }}>
                {service.description}
            </Typography>
            <AddIconWrapper />
        </StyledBox>
    );
}

export default SelectionCardService;
