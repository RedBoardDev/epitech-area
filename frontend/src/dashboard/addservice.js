import React, { useEffect, useState } from 'react';
import { useAuth } from '../AuthContext';
import { Grid, Box } from '@mui/material';
import ChooseService from './components/ChooseService';
import ChooseArea from './components/ChooseArea';
import ModalSettingsService from './components/ModalSettingsService';
import ReviewChooseArea from './components/ReviewChooseArea';
import { useSettings } from '../SettingsContext';

export default function AddService() {
    const { t } = useSettings();
    const [services, setServices] = useState([]);
    const [serviceChoose, setServiceChoose] = useState(null); // null for active / not null for inactive
    const [selectionState, setSelectionState] = useState(t("triggers")); // triggers or reactions or review
    const [selectedTriggerData, setSelectedTriggerData] = useState(null);
    const [selectedReactionData, setSelectedReactionData] = useState(null);
    const [activeService, setActiveService] = useState([]);

    const { getAllServices, getActiveServices } = useAuth();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalData, setModalData] = useState(null);

    useEffect(() => {
        getAllServices()
            .then((data) => setServices(data))
            .catch((error) => console.error('Error:', error));
        getActiveServices()
            .then((data) => setActiveService(data))
            .catch((error) => console.error('Error:', error));
    }, [getAllServices, getActiveServices]);

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
        if (selectionState === t("triggers")) {
            data['service_id'] = serviceChoose.id;
            setSelectedTriggerData(data);
            setSelectionState(t("reactions"));
            setServiceChoose(null);
        }
        if (selectionState === t("reactions")) {
            data['service_id'] = serviceChoose.id;
            setSelectedReactionData(data);
            setServiceChoose('');
            setSelectionState(t("review"));
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
        setSelectionState(t("triggers"));
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
                        <ChooseService services={services} type={selectionState} activeServices={activeService} onServiceSelected={handleServiceSelect} />
                    )}
                    {serviceChoose !== null && (
                        <>
                            {selectionState === t("triggers") && (
                                <ChooseArea data={serviceChoose.triggers} type={selectionState} serviceName={serviceChoose.name} onSelected={handleTriggerSelect} />
                            )}
                            {selectionState === t("reactions") && (
                                <ChooseArea data={serviceChoose.reactions} type={selectionState} serviceName={serviceChoose.name} onSelected={handleReactionSelect} />
                            )}
                            {selectionState === t("review") && (
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
