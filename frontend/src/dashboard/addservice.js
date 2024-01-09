import React, { useEffect, useState } from 'react';
import { useAuth } from '../AuthContext';
import { Grid, Box } from '@mui/material';
import ChooseService from './components/ChooseService';
import ChooseArea from './components/ChooseArea';

export default function AddService() {
    const [services, setServices] = useState([]);
    const [serviceChoose, setServiceChoose] = useState(null); // true for active / false for inactive
    const [selectionState, setSelectionState] = useState('triggers'); // triggers or reactions

    const { getAllServices, addAutomation, serviceOauth } = useAuth();

    useEffect(() => {
        getAllServices()
            .then((data) => setServices(data))
            .catch((error) => console.error('Error:', error));
    }, [getAllServices]);

    const handleServiceSelect = (selectedService) => {
        setServiceChoose(selectedService);
    };

    const handleTriggerSelect = (selectedTrigger) => {
        console.log("oui", selectedTrigger);
        setSelectionState('reactions');
        setServiceChoose(null);
    };

    const handleReactionSelect = (selectedReaction) => {
        console.log("non", selectedReaction);
    };

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
                        </>
                    )}
                </Box>
            </Grid>
        </Grid>
    );
}
