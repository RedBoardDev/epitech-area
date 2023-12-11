import React from 'react';
import { useNavigate, Link } from 'react-router-dom';

import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Logo from './assets/logo.png';

import { useAuth } from '../AuthContext';

export default function Dashboard() {
    return (
        <h1>Dashboard</h1>
    );
}
