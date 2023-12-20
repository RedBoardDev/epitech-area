import React, { useEffect, useState } from 'react';
import SideBar from './components/SideBar';
import TopBar from './components/TopBar';
import { useAuth } from '../AuthContext';
import Grid from '@mui/material/Grid';
import AddCategory from './addCategory';
import PuzzlePiece from './components/PuzzlePiece';
import Button from '@mui/material/Button';
import ModalSettingsService from './components/ModalSettingsService';

export default function ServicesDash() {
    const [services, setServices] = useState([]);
    const { getAllServices, addAutomation, serviceOauth } = useAuth();
    const [selectedTriggers, setSelectedTriggers] = useState([]);
    const [selectedReaction, setSelectedReaction] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalData, setModalData] = useState(null);

    // Example services for offline testing
    const exampleServices = [
        { 
            id: 1, 
            name: 'Service 1', 
            color: '#FF0000', 
            triggers: [{name: 'Trigger 1', desc: 'Description 1'}, {name: 'Trigger 2', desc: 'Description 2'}], 
            reactions: [{name: 'Reaction 1', desc: 'Description 1'}, {name: 'Reaction 2', desc: 'Description 2'}] 
        },
        { 
            id: 2, 
            name: 'Service 2', 
            color: '#00FF00', 
            triggers: [{name: 'Trigger 1', desc: 'Description 1'}, {name: 'Trigger 2', desc: 'Description 2'}], 
            reactions: [{name: 'Reaction 1', desc: 'Description 1'}, {name: 'Reaction 2', desc: 'Description 2'}] 
        },
        { 
            id: 3, 
            name: 'Service 3', 
            color: '#0000FF', 
            triggers: [{name: 'Trigger 1', desc: 'Description 1'}, {name: 'Trigger 2', desc: 'Description 2'}], 
            reactions: [{name: 'Reaction 1', desc: 'Description 1'}, {name: 'Reaction 2', desc: 'Description 2'}] 
        },
    ];  

    useEffect(() => {
        getAllServices().then((data) => {
            setServices(data);
        }).catch((error) => {
            console.error('Error:', error);
            // Use example services in case of error
            setServices(exampleServices);
        });
    }, []);

    const openModal = (choose) => {
        if (selectedReaction) return;
        setModalData(choose);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const submitSettings = (data) => {
        setSelectedTriggers(prevTriggers => [...prevTriggers, data]);
    }

    const handleConfirm = async () => {
        for (const trigger of selectedTriggers) {
            try {
                await addAutomation(trigger.service_id, trigger.id, JSON.stringify(trigger.formValues),
                    selectedReaction.service_id, selectedReaction.id, JSON.stringify(selectedReaction.formValues));
            } catch (error) {
                const errData = error?.response?.data || null;
                if (!errData) return;
    
                if (error.response && error.response.status === 401) {
                    serviceOauth(error.response.data.service_id);
                } else {
                    console.error("Error during addAutomation:", error);
                }
            }
        }
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
                        <Grid container style={{ height: '93.6%', top: '6.4%', left: '15%', position: 'absolute', width: '85%', overflow: 'auto', backgroundColor: 'red' }}>
                            <Grid item xs={2} style={{ height: '100%', background: '#333448' }} className="no-overflow">
                            {!selectedReaction &&
                                services.map((service) => (<AddCategory key={service.id} id={service.id} name={service.name} color={service.color} triggers={service.triggers} reactions={service.reactions} handleClick={openModal} />))
                            }
                            </Grid>
                            <Grid item xs={10} container>
                                {selectedTriggers.map((trigger, index) => (
                                    <Grid item xs={2} key={index}>
                                        <PuzzlePiece name={trigger.name} description={trigger.description} />
                                    </Grid>
                                ))}
                                {selectedReaction && (
                                    <Grid item xs={2}>
                                        <PuzzlePiece name={selectedReaction.name} description={selectedReaction.description} />
                                    </Grid>
                                )}
                                {selectedTriggers.length > 0 && selectedReaction && (
                                    <Grid item xs={2}>
                                        <Button onClick={handleConfirm}>Confirm</Button>
                                    </Grid>
                                )}
                            </Grid>
                        </Grid>
                        <ModalSettingsService isOpen={isModalOpen} closeModal={closeModal} data={modalData} onSubmit={submitSettings} />
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}