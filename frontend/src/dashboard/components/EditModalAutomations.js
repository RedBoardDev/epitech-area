import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { useAuth } from '../../AuthContext';

export default function EditModalAutomations({ isOpen, closeModal, selectedAutomation, onUpdateAutomation }) {
    const [reactionParams, setReactionParams] = useState("");
    const [triggerParams, setTriggerParams] = useState("");
    const [automationName, setAutomationName] = useState("");
    const { updateAutomationById } = useAuth();

    useEffect(() => {
        if (selectedAutomation && selectedAutomation.length > 0) {
            const jsonReaction = JSON.parse(selectedAutomation[0].reaction_params);
            const jsonTrigger = JSON.parse(selectedAutomation[0].trigger_params);
            setReactionParams(jsonReaction);
            setTriggerParams(jsonTrigger);
            setAutomationName(selectedAutomation[0].automation_name || "");
        }
    }, [selectedAutomation]);

    const handleChangeAutomationName = (e) => {
        setAutomationName(e.target.value);
    };

    const handleChangeTriggerParams = (key, value) => {
        setTriggerParams((prevReactionParams) => ({
            ...prevReactionParams,
            [key]: value,
        }));
    };

    const handleChangeReactionParams = (key, value) => {
        setReactionParams((prevReactionParams) => ({
            ...prevReactionParams,
            [key]: value,
        }));
    };

    const handleSave = async () => {
        try {
            await updateAutomationById(selectedAutomation[0].id, JSON.stringify(reactionParams), JSON.stringify(triggerParams), automationName);
            onUpdateAutomation({
                ...selectedAutomation[0],
                automation_name: automationName,
            });
        } catch (error) {
            console.error('Update automation failed:', error);
        }
        closeModal();
    };

    return (
        <Dialog open={isOpen} onClose={closeModal}>
            <DialogTitle>Modify the automation informations</DialogTitle>
            <DialogContent>
                <TextField
                    margin="dense"
                    label="Automation name"
                    type="email"
                    fullWidth
                    value={automationName}
                    onChange={handleChangeAutomationName}
                />
            </DialogContent>
            <DialogTitle fontSize={16}>Trigger settings</DialogTitle>
            <DialogContent>
                {Object.keys(triggerParams).map((key) => (
                    <TextField
                        key={key}
                        margin="dense"
                        label={key}
                        type="text"
                        fullWidth
                        value={triggerParams[key]}
                        onChange={(e) => handleChangeTriggerParams(key, e.target.value)}
                    />
                ))}
            </DialogContent>
            <DialogTitle fontSize={16}>Reaction settings</DialogTitle>
            <DialogContent>
                {Object.keys(reactionParams).map((key) => (
                    <TextField
                        key={key}
                        margin="dense"
                        label={key}
                        type="text"
                        fullWidth
                        value={reactionParams[key]}
                        onChange={(e) => handleChangeReactionParams(key, e.target.value)}
                    />
                ))}
            </DialogContent>
            <DialogActions>
                <Button onClick={closeModal}>Cancel</Button>
                <Button onClick={handleSave}>Save</Button>
            </DialogActions>
        </Dialog>
    );
}
