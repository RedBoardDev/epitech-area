import React, { useState, useEffect } from 'react';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { ArrowDownwardTwoTone } from '@mui/icons-material';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import HomeIcon from '@mui/icons-material/Home';
import SettingsUserModal from './SettingsModal';
import { useAuth } from '../../AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { useTheme } from '../../themeContext';


export default function TopBar() {
    const [time, setTime] = useState(new Date().toLocaleTimeString());
    const [openSettingsModal, setOpenSettingsModal] = useState(false);
    const [user, setUser] = useState();
    const { logout, getUserById, verifyToken } = useAuth();
    const { mainTheme } = useTheme();
    const navigate = useNavigate();

    const handleLogout = () => {
      logout();
      navigate('/');
    };

    useEffect(() => {
        const timer = setInterval(() => {
            setTime(new Date().toLocaleTimeString());
        }, 1000);

        return () => {
            clearInterval(timer);
        };
    }, []);

    useEffect(() => {
      const getUser = async () => {
        try {
            const result = await getUserById();
            setUser(result);
        } catch (error) {
            console.error('Error fetching automations:', error);
        }
      };
      getUser();
  }, [verifyToken, navigate, getUserById]);

  const updateUser = (updatedUserData) => {
    setUser(updatedUserData);
  };

    return (
      <AppBar position="fixed" style={{ right: 0, width: 'calc(100%)', zIndex: -1 }}>
        <Toolbar style={{ background: '#222222'}} sx={{ boxShadow: 3 }}>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign: 'center', marginRight: 'auto', fontWeight: '100', fontSize: '18px' }}>
              {time}
            </Typography>
            <Typography variant="h6" component="div" sx={{ marginLeft: 'auto' }}>
                    {user ? user.firstname + ' ' + user.lastname : ""}
            </Typography>
            <IconButton color="inherit" sx={{ marginLeft: '10px' }}>
              <Avatar alt="User Avatar" src="https://image.shutterstock.com/image-vector/dotted-spiral-vortex-royaltyfree-images-600w-2227567913.jpg" />
            </IconButton>
            <IconButton color="inherit" sx={{ marginLeft: '10px' }} component={Link} to="/">
                <HomeIcon />
            </IconButton>
            <IconButton color="inherit" sx={{ marginLeft: '10px' }} onClick={() => setOpenSettingsModal(true)}>
                <SettingsIcon />
            </IconButton>
            <IconButton color="inherit" sx={{ marginLeft: '10px' }} onClick={handleLogout}>
                <LogoutIcon />
            </IconButton>
            {openSettingsModal && <SettingsUserModal user={user} setOpen={setOpenSettingsModal} onUpdateUser={updateUser} />}
        </Toolbar>
      </AppBar>
    );
  }