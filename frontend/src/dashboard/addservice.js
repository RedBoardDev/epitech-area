import React, { useEffect, useState } from 'react';
import { useAuth } from '../AuthContext';
import { Grid, Box } from '@mui/material';
import ChooseService from './components/ChooseService';
import ChooseArea from './components/ChooseArea';
import ModalSettingsService from './components/ModalSettingsService';
import ReviewChooseArea from './components/ReviewChooseArea';

export default function AddService() {
    const [services, setServices] = useState([]);
    const [serviceChoose, setServiceChoose] = useState(null); // null for active / not null for inactive
    const [selectionState, setSelectionState] = useState('triggers'); // triggers or reactions or review
    const [selectedTriggerData, setSelectedTriggerData] = useState(null);
    const [selectedReactionData, setSelectedReactionData] = useState(null);

    const { getAllServices } = useAuth();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalData, setModalData] = useState(null);

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

    const reset = () => {
        setServiceChoose(null);
        setSelectionState('triggers');
        setSelectedTriggerData(null);
        setSelectedReactionData(null);
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
                                    <ReviewChooseArea triggerData={selectedTriggerData} reactionData={selectedReactionData} reset={reset} />
                                </>
                            )}
                        </>
                    )}
                </Box>
                <ModalSettingsService isOpen={isModalOpen} closeModal={closeModal} data={modalData} onSubmit={submitSettings} />
            </Grid>
        </Grid>
    );
}
