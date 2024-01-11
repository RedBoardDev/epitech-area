import React, { useState, useEffect } from 'react';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import SettingsUserModal from './SettingsModal';
import { useAuth } from '../../AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { useTheme } from '../../themeContext';
import Logo from '../assets/logo.png';
import Hidden from '@mui/material/Hidden';

export default function TopBar() {
    const [openSettingsModal, setOpenSettingsModal] = useState(false);
    const [user, setUser] = useState();
    const { logout, getUserById } = useAuth();
    const { mainTheme } = useTheme();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    useEffect(() => {
        if (!user) {
            const getUser = async () => {
                try {
                    const result = await getUserById();
                    setUser(result);
                } catch (error) {
                    console.error('Error fetching automations:', error);
                }
            };
            getUser();
        }
    }, [getUserById, user]);

    const updateUser = (updatedUserData) => {
        setUser(updatedUserData);
    };

    const closeModal = () => {
        setOpenSettingsModal(false);
    };

    const handleAvatarClick = () => {
        navigate('/dashboard');
    };

    return (
        <AppBar position="fixed" style={{ right: 0, width: '100%', zIndex: 100 }}>
            <Toolbar style={{ background: mainTheme.palette.ForegroundItems.main }} sx={{ boxShadow: 3 }}>
                <div style={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
                    <Link to="/">
                        <img src={Logo} alt="Logo" style={{ display: 'block', margin: '0 10px 0 0', maxWidth: '60px', height: 'auto' }} />
                    </Link>
                    <Hidden smDown>
                        <Typography variant="h6" style={{ color: '#fff', fontWeight: 'bold' }}>
                            HarmonieWeb
                        </Typography>
                    </Hidden>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', marginLeft: 'auto' }}>
                    <Hidden smDown>
                        <Avatar
                            sx={{ marginRight: '15px', cursor: 'pointer' }}
                            alt="User Avatar"
                            src="https://image.shutterstock.com/image-vector/dotted-spiral-vortex-royaltyfree-images-600w-2227567913.jpg"
                            onClick={handleAvatarClick}
                        />
                    </Hidden>
                    <Typography variant="h6" sx={{ marginRight: '15px' }}>{user ? user.firstname + ' ' + user.lastname : ""}</Typography>
                    <IconButton color="inherit" sx={{ marginLeft: '10px' }} onClick={() => setOpenSettingsModal(true)}>
                        <SettingsIcon />
                    </IconButton>
                    <IconButton color="inherit" sx={{ marginLeft: '10px' }} onClick={handleLogout}>
                        <LogoutIcon />
                    </IconButton>
                </div>
                <SettingsUserModal isOpen={openSettingsModal} closeModal={closeModal} onUpdateUser={updateUser} user={user || ""} />
            </Toolbar>
        </AppBar>
    );
}
