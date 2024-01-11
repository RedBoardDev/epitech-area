import React from 'react';
import Typography from '@mui/material/Typography'

export default function PageTitle({ title }) {
    return (
        <Typography
            variant="h3"
            sx={{
                textAlign: 'center',
                color: 'black',
                fontWeight: 'bold',
                textShadow: '2px 2px 4px rgba(255, 255, 255, 0.2)',
                marginTop: '40px',
                marginBottom: '80px',
            }}
        >
            {title}
        </Typography>
    );
}
