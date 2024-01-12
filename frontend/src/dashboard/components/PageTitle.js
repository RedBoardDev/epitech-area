import React from 'react';
import Typography from '@mui/material/Typography'
import { useTheme } from '../../themeContext';

export default function PageTitle({ title }) {
    const { mainTheme } = useTheme();
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
                color: mainTheme.palette.SwitchStyle.main,
            }}
        >
            {title}
        </Typography>
    );
}
