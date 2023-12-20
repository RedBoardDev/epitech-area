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
    userSelect: 'none',
});

const AddIconWrapper = styled(AddIcon)({
    position: 'absolute',
    top: '10px',
    right: '10px',
    color: 'white',
});

function SelectionCardService({ id, obj, callback }) {

    const handleClick = () => {
        obj.service_id = id;
        callback(obj);
    };

    return (
        <StyledBox onClick={handleClick}>
            <Typography variant="h6" sx={{ color: 'white', padding: '1rem' }}>
                {obj.name}
            </Typography>
            <Typography variant="body2" sx={{ color: 'white', padding: '1rem' }}>
                {obj.description}
            </Typography>
            <AddIconWrapper />
        </StyledBox>
    );
}

export default SelectionCardService;
