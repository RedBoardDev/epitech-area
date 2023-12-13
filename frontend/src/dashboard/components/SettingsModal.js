import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../AuthContext';

export default function SettingsUserModal({ user, onUpdateUser }) {
    const [open, setOpen] = useState(true);
    const [firstName, setFirstName] = useState(user.firstname);
    const [lastName, setLastName] = useState(user.lastname);
    const [email, setEmail] = useState(user.email);
    const [password, setPassword] = useState("********");
    const [confirmPassword, setConfirmPassword] = useState("********");
    const { updtaeUserById, verifyToken } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const checkToken = async () => {
            if (!await verifyToken()) {
                navigate('/');
            }
        };
        checkToken();
    }, [verifyToken, navigate]);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    const handleSave = async () => {
        try {
            await updtaeUserById(3, lastName, firstName);
            onUpdateUser({ ...user, firstname: firstName, lastname: lastName });
        } catch (error) {
            console.error('Update user failed:', error);
        }
        // Sauvegardez les informations de l'utilisateur ici...
        setOpen(false);
    };


    return (
        <div>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Modify your informations</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="First Name"
                        type="text"
                        fullWidth
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                    <TextField
                        margin="dense"
                        label="Last Name"
                        type="text"
                        fullWidth
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                    />
                    <TextField
                        margin="dense"
                        label="Email"
                        type="email"
                        fullWidth
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        margin="dense"
                        label="Password"
                        type="password"
                        fullWidth
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <TextField
                        margin="dense"
                        label="Confirm Password"
                        type="password"
                        fullWidth
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSave}>Save</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}