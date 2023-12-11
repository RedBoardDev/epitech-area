import React, { useState, useEffect } from 'react';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { ArrowDownwardTwoTone } from '@mui/icons-material';

export default function TopBar() {
    const [time, setTime] = useState(new Date().toLocaleTimeString());

    useEffect(() => {
        const timer = setInterval(() => {
            setTime(new Date().toLocaleTimeString());
        }, 1000);

        return () => {
            clearInterval(timer);
        };
    }, []);

    return (
      <AppBar position="fixed" style={{ right: 0, width: 'calc(100%)', zIndex: -1 }}>
        <Toolbar style={{ background: '#222222'}} sx={{ boxShadow: 3 }}>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign: 'center', marginRight: 'auto', fontWeight: '100', fontSize: '18px' }}>
              {time}
            </Typography>
            <Typography variant="h6" component="div" sx={{ marginLeft: 'auto' }}>
                    Léo BALDACHINO
            </Typography>
            <IconButton color="inherit" sx={{ marginLeft: '10px' }}>
              <Avatar alt="User Avatar" src="https://image.shutterstock.com/image-vector/dotted-spiral-vortex-royaltyfree-images-600w-2227567913.jpg" />
            </IconButton>
            <IconButton color="inherit" sx={{ marginLeft: '10px' }}>
                <ArrowDownwardTwoTone />
            </IconButton>
        </Toolbar>
      </AppBar>
    );
  }