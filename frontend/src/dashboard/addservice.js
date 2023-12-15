import React, { useEffect, useState } from 'react';
import SideBar from './components/SideBar';
import TopBar from './components/TopBar';
import { useAuth } from '../AuthContext';
import Grid from '@mui/material/Grid';
import AddCategory from './addCategory';
import PuzzlePiece from './components/PuzzlePiece';
import Button from '@mui/material/Button';

export default function ServicesDash() {
    const [services, setServices] = useState([]);
    const { getAllServices, addAutomation, serviceOauth } = useAuth();
    const [selectedTrigger, setSelectedTrigger] = useState(null);
    const [selectedReaction, setSelectedReaction] = useState(null);

    useEffect(() => {
        getAllServices().then((data) => {
            setServices(data);
            console.log("services", data);
        }).catch((error) => {
            console.error('Error:', error);
        });
    }, []);

    const handleClick = (choose) => {
        console.log(choose);
        if (!selectedTrigger) {
            setSelectedTrigger(choose);
            console.log("selectedTrigger", selectedTrigger);
        } else {
            setSelectedReaction(choose);
            console.log("selectedReaction", selectedReaction);
        }
    }

    const handleConfirm = async () => {
        try {
            await addAutomation(selectedTrigger.service_id, selectedTrigger.id, JSON.stringify(selectedTrigger.fields),
                selectedReaction.service_id, selectedReaction.id, JSON.stringify(selectedReaction.fields));
        } catch (error) {
            const errData = error?.response?.data || null;
            if (!errData) return;

            if (error.response && error.response.status === 401) {
                console.log("Unauthorized: ", error);
                serviceOauth(error.response.data.service_id);
            } else {
                console.error("Error during addAutomation:", error);
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
                        <div style={{ height: '93.6%', top: '6.4%', left: '15%', position: 'absolute', width: '85%', overflow: 'auto', display: 'flex' }}>
                            <div style={{ width: '20rem', height: '100%', background: '#333448' }} className="no-overflow">
                                {!selectedTrigger ?
                                    services.map((service) => (<AddCategory key={service.id} id={service.id} name={service.name} color={service.color} triggers={service.triggers} handleClick={handleClick} />))
                                    : services.map((service) => (<AddCategory key={service.id} id={service.id} name={service.name} color={service.color} triggers={service.reactions} handleClick={handleClick} />))
                                }
                            </div>
                            {selectedTrigger && (
                                <PuzzlePiece name={selectedTrigger.name} description={selectedTrigger.description} />
                            )}
                            {selectedReaction && (
                                <PuzzlePiece name={selectedReaction.name} description={selectedReaction.description} />
                            )}
                            {selectedTrigger && selectedReaction && (
                                <Button onClick={handleConfirm}>Confirm</Button>
                            )}
                        </div>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}
