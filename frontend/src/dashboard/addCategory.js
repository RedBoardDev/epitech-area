import React, { useState } from 'react';
import { Box, Typography, Collapse } from '@mui/material';
import { styled } from '@mui/system';
import { ExpandMore } from '@mui/icons-material';
import SelectionCardService from './components/SelectionCardService';

const MainBox = styled(Box)(({ color }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: '1.8rem',
    paddingRight: '1.4rem',
    paddingTop: '0.5rem',
    paddingBottom: '0.5rem',
    background: color ? `${color}88` : 'rgba(255, 255, 255, 0.1)',
}));

const Circle = styled('div')({
    width: '1rem',
    height: '1rem',
    borderRadius: '50%',
    background: '#f37520',
    marginRight: '1rem',
});

const DropDownIcon = styled(({ isOpen, ...other }) => <ExpandMore {...other} />)(({ isOpen }) => ({
    fontSize: '2.4rem',
    color: '#f37520',
    transition: 'color 0.3s',
    transform: isOpen ? 'rotate(0deg)' : 'rotate(90deg)',
    cursor: 'pointer',
}));

const ContentBox = styled(Box)({
    padding: '1rem',
    background: '#333448',
});

function AddCategory({ id, name, color, triggers, handleClick, icon }) {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <Box>
            <MainBox color={color}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                <img
                  src={process.env.REACT_APP_API_URL + icon}
                  alt="Logo"
                  height="28"
                  width="28"
                  style={{ verticalAlign: 'middle', marginRight: '8px' }}
                />
                    <Typography variant="h6" sx={{ fontSize: '1.2rem', color: 'white' }}>{name}</Typography>
                </div>
                <div onClick={() => setIsOpen(!isOpen)} style={{ cursor: 'pointer' }}>
                    <DropDownIcon isOpen={isOpen} />
                </div>
            </MainBox>
            <Collapse in={isOpen}>
                <ContentBox>
                    {triggers.map((trigger) => (
                        <SelectionCardService key={trigger.id} id={id} obj={trigger} callback={handleClick} />
                    ))}
                </ContentBox>
            </Collapse>
        </Box>
    );
}

export default AddCategory;
