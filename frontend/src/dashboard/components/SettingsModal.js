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
import { ToggleButton, ToggleButtonGroup, Grid } from '@mui/material';
import Alert from '@mui/material/Alert';

export default function SettingsUserModal({ isOpen, closeModal, onUpdateUser, user }) {
    const { t, settings, setSettings } = useSettings();
    const [firstName, setFirstName] = useState(user.firstname);
    const [lastName, setLastName] = useState(user.lastname);
    const [email, setEmail] = useState(user.email);
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");
    const { updateUserById } = useAuth();
    const { mainTheme, toggleThemeMode, toggleSwitchTheme } = useTheme();
    const [error, setError] = useState("");

    useEffect(() => {
        setFirstName(user.firstname);
        setLastName(user.lastname);
        setEmail(user.email);
    }, [user]);

    const handleLanguageChange = (event, newLanguage) => {
        setSettings({ ...settings, language: newLanguage });
    };

    const handleSave = async () => {
        try {
            if (confirmNewPassword !== newPassword || (confirmNewPassword == "" && newPassword != "") || (confirmNewPassword != "" && newPassword == "")) {
                setError(t("Please confirm your password"));
                return;
            }
            await updateUserById(lastName, firstName, email, confirmNewPassword);
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
                    {error ? <Alert severity="warning">{error}</Alert> : ""}
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
                    <ToggleButtonGroup
                        value={settings.language}
                        exclusive
                        onChange={handleLanguageChange}
                        aria-label="select language"
                    >
                        <ToggleButton value="fr" aria-label="French">
                            French
                        </ToggleButton>
                        <ToggleButton value="en" aria-label="English">
                            English
                        </ToggleButton>
                    </ToggleButtonGroup>
                </DialogContent>
                <DialogActions>
                    <div style={{Display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                        {t("Dark theme")}
                        <Switch checked={toggleThemeMode} onChange={toggleSwitchTheme} style={{color: mainTheme.palette.SwitchStyle.main}} />
                    </div>
                    <Button onClick={closeModal} style={{color: mainTheme.palette.TextStyle1.main}}>{t("Cancel")}</Button>
                    <Button onClick={handleSave} style={{color: mainTheme.palette.TextStyle1.main}}>{t("Save")}</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}