import React, { useEffect, useState } from 'react';
import { useAuth } from '../AuthContext';
import { Grid, Box } from '@mui/material';
import ChooseService from './components/ChooseService';
import ChooseArea from './components/ChooseArea';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import ModalSettingsService from './components/ModalSettingsService';
import ReviewChooseArea from './components/ReviewChooseArea';

export default function AddService() {
    const [services, setServices] = useState([]);
    const [serviceChoose, setServiceChoose] = useState(null); // null for active / not null for inactive
    const [selectionState, setSelectionState] = useState('triggers'); // triggers or reactions or review
    const [selectedTriggerData, setSelectedTriggerData] = useState(null);
    const [selectedReactionData, setSelectedReactionData] = useState(null);

    const { getAllServices, addAutomation, serviceOauth } = useAuth();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalData, setModalData] = useState(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    useEffect(() => {
        getAllServices()
            .then((data) => setServices(data))
            .catch((error) => console.error('Error:', error));
    }, [getAllServices]);

    const handleServiceSelect = (selectedService) => {
        setServiceChoose(selectedService);
    };

    const handleTriggerSelect = (selectedTrigger) => {
        console.log("trigger", selectedTrigger);
        openModal(selectedTrigger);
    };

    const handleReactionSelect = (selectedReaction) => {
        console.log("reaction", selectedReaction);
        openModal(selectedReaction);
    };


    const submitSettings = (data) => {
        if (selectionState === 'triggers') {
            data['service_id'] = serviceChoose.id;
            setSelectedTriggerData(data);
            setSelectionState('reactions');
            setServiceChoose(null);
        }
        if (selectionState === 'reactions') {
            data['service_id'] = serviceChoose.id;
            setSelectedReactionData(data);
            setServiceChoose('');
            setSelectionState('review');
        }
    }

    const openModal = (selected) => {
        if (serviceChoose === null) return;
        setModalData(selected);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };
    // const handleClose = () => {
    //     setIsDialogOpen(false);
    // };

    const handleSave = async () => {
        // try {
        //     if (!automationName) return;
        //     await addAutomation(selectedTrigger.service_id, selectedTrigger.id, JSON.stringify(selectedTrigger.formValues),
        //         selectedReaction.service_id, selectedReaction.id, JSON.stringify(selectedReaction.formValues), automationName);
        //     window.location.href = '/dashboard/services';
        // } catch (error) {
        //     const errData = error?.response?.data || null;
        //     if (!errData) return;

        //     if (error.response && error.response.status === 401) {
        //         serviceOauth(error.response.data.service_id);
        //     } else {
        //         console.error("Error during addAutomation:", error);
        //     }
        // }
        // setIsDialogOpen(false);
    }

    return (
        <Grid container>
            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Box
                    sx={{
                        width: '85%',
                        overflowY: 'auto',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    {serviceChoose === null && (
                        <ChooseService services={services} type={selectionState} onServiceSelected={handleServiceSelect} />
                    )}
                    {serviceChoose !== null && (
                        <>
                            {selectionState === 'triggers' && (
                                <ChooseArea data={serviceChoose.triggers} type={selectionState} serviceName={serviceChoose.name} onSelected={handleTriggerSelect} />
                            )}
                            {selectionState === 'reactions' && (
                                <ChooseArea data={serviceChoose.reactions} type={selectionState} serviceName={serviceChoose.name} onSelected={handleReactionSelect} />
                            )}
                            {selectionState === 'review' && (
                                <>
                                    <ReviewChooseArea triggerData={selectedTriggerData} reactionData={selectedReactionData} />
                                </>
                            )}
                        </>
                    )}
                </Box>
                <ModalSettingsService isOpen={isModalOpen} closeModal={closeModal} data={modalData} onSubmit={submitSettings} />
                {/* <Dialog open={isDialogOpen} onClose={handleClose}>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button onClick={handleSave}>Save</Button>
                    </DialogActions>
                </Dialog> */}
            </Grid>
        </Grid>
    );
}
