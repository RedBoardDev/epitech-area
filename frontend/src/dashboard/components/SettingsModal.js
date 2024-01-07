import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { useAuth } from '../../AuthContext';
import { useSettings } from '../../SettingsContext';
import { useTheme } from '../../themeContext';
import { Switch } from '@mui/material';

export default function SettingsUserModal({ isOpen, closeModal, onUpdateUser, user }) {
    const { t } = useSettings();
    const [open, setOpen] = useState(true);
    const [firstName, setFirstName] = useState(user.firstname);
    const [lastName, setLastName] = useState(user.lastname);
    const [email, setEmail] = useState(user.email);
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");
    const { updateUserById } = useAuth();
    const { mainTheme, toggleThemeMode, toggleSwitchTheme } =useTheme();

    useEffect(() => {
        setFirstName(user.firstname);
        setLastName(user.lastname);
        setEmail(user.email);
    }, [user]);

    const handleSave = async () => {
        try {
                await updateUserById(lastName, firstName, email);
                onUpdateUser({ ...user, firstname: firstName, lastname: lastName, email: email });
        } catch (error) {
            console.error('Update user failed:', error);
        }
        closeModal();
    };

    return (
        <div>
            <Dialog open={isOpen} onClose={closeModal}>
                <DialogTitle>{t("Modify your informations")}</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label={t("First Name")}
                        type="text"
                        fullWidth
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                    <TextField
                        margin="dense"
                        label={t("Last Name")}
                        type="text"
                        fullWidth
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                    />
                    <TextField
                        margin="dense"
                        label={t("Email")}
                        type="email"
                        fullWidth
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        margin="dense"
                        label={t("New Password")}
                        type="password"
                        fullWidth
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                    <TextField
                        margin="dense"
                        label={t("Confirm New Password")}
                        type="password"
                        fullWidth
                        value={confirmNewPassword}
                        onChange={(e) => setConfirmNewPassword(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <div style={{Display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                        Select Theme
                        <Switch checked={toggleThemeMode} onChange={toggleSwitchTheme} style={{color: mainTheme.palette.SwitchStyle.main}}/>
                    </div>
                    <Button onClick={closeModal} style={{color: mainTheme.palette.TextStyle1.main}}>{t("Cancel")}</Button>
                    <Button onClick={handleSave} style={{color: mainTheme.palette.TextStyle1.main}}>{t("Save")}</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}