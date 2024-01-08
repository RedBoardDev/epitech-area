import React, { useEffect, useState } from 'react';
import SideBar from './components/SideBar';
import TopBar from './components/TopBar';
import { useAuth } from '../AuthContext';
import Grid from '@mui/material/Grid';
import AddCategory from './addCategory';
import PuzzlePiece from './components/PuzzlePiece';
import Button from '@mui/material/Button';
import ModalSettingsService from './components/ModalSettingsService';
import { useSettings } from '../SettingsContext';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';

export default function ServicesDash() {
    const { t } = useSettings();
    const [services, setServices] = useState([]);
    const { getAllServices, addAutomation, serviceOauth } = useAuth();
    const [selectedTrigger, setSelectedTrigger] = useState(null);
    const [selectedReaction, setSelectedReaction] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalData, setModalData] = useState(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [automationName, setAutomationName] = useState('');

    useEffect(() => {
        getAllServices().then((data) => {
            setServices(data);
        }).catch((error) => {
            console.error('Error:', error);
        });
    }, [getAllServices]);

    const openModal = (choose) => {
        if (selectedTrigger && selectedReaction) return;
        setModalData(choose);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const submitSettings = (data) => {
        if (!selectedTrigger) {
            setSelectedTrigger(data);
        } else {
            setSelectedReaction(data);
        }
    }

    const handleConfirm = () => {
        setIsDialogOpen(true);
    };

    const handleClose = () => {
        setIsDialogOpen(false);
    };

    const handleSave = async () => {
        try {
            if (!automationName) return;
            await addAutomation(selectedTrigger.service_id, selectedTrigger.id, JSON.stringify(selectedTrigger.formValues),
                selectedReaction.service_id, selectedReaction.id, JSON.stringify(selectedReaction.formValues), automationName);
            window.location.href = '/dashboard/services';
        } catch (error) {
            const errData = error?.response?.data || null;
            if (!errData) return;

            if (error.response && error.response.status === 401) {
                serviceOauth(error.response.data.service_id);
            } else {
                console.error("Error during addAutomation:", error);
            }
        }
        setIsDialogOpen(false);
    }

    return (
        <Grid container style={{ overflow: 'hidden' }}>
            <Grid item xs={2}>
                <SideBar />
            </Grid>
            <Grid item xs={10} style={{ overflow: 'hidden' }}>
                <Grid container direction="column" style={{ overflow: 'hidden' }}>
                    <Grid item>
                        <TopBar />
                    </Grid>
                    <Grid item xs={12} style={{ overflow: 'hidden' }}>
                        <div style={{ height: '93.6%', top: '6.4%', left: '15%', position: 'absolute', width: '85%', overflow: 'auto', display: 'flex' }}>
                            <div style={{ width: '20rem', height: '100%', background: '#333448' }} className="no-overflow">
                                {!selectedTrigger ?
                                    services.map((service) => (<AddCategory key={service.id} id={service.id} name={service.name} color={service.color} triggers={service.triggers} icon={service.icon} handleClick={openModal} />))
                                    : services.map((service) => (<AddCategory key={service.id} id={service.id} name={service.name} color={service.color} triggers={service.reactions} icon={service.icon} handleClick={openModal} />))
                                }
                            </div>
                            {selectedTrigger && (
                                <PuzzlePiece name={selectedTrigger.name} description={selectedTrigger.description} />
                            )}
                            {selectedReaction && (
                                <PuzzlePiece name={selectedReaction.name} description={selectedReaction.description} />
                            )}
                            {selectedTrigger && selectedReaction && (
                                <Button 
                                    onClick={handleConfirm} 
                                    style={{
                                        backgroundColor: '#2a9d8f', 
                                        color: 'white', 
                                        height: '50px', 
                                        width: '100px', 
                                        alignSelf: 'center',
                                        '&:hover': {
                                            backgroundColor: '#9d4edd',
                                        },
                                    }}
                                >
                                    {t("Confirm")}
                                </Button>
                            )}
                        </div>
                        <ModalSettingsService isOpen={isModalOpen} closeModal={closeModal} data={modalData} onSubmit={submitSettings} />
                        <Dialog open={isDialogOpen} onClose={handleClose}>
                            <DialogTitle>{t("Enter Automation Name")}</DialogTitle>
                            <DialogContent>
                                <DialogContentText>
                                    {t("Please enter a name for your automation")}
                                </DialogContentText>
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    label={t("Automation Name")}
                                    type="text"
                                    fullWidth
                                    value={automationName}
                                    onChange={(e) => setAutomationName(e.target.value)}
                                />
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleClose}>{t("Cancel")}</Button>
                                <Button onClick={handleSave}>{t("Save")}</Button>
                            </DialogActions>
                        </Dialog>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}