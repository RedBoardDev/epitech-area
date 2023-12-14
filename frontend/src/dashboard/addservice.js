import React, { useEffect, useState } from 'react';
import SideBar from './components/SideBar';
import TopBar from './components/TopBar';
import { useAuth } from '../AuthContext';
import Grid from '@mui/material/Grid';
import AddCategory from './addCategory';

export default function ServicesDash() {
    const [services, setServices] = useState([]);
    const { getAllServices } = useAuth();

    useEffect(() => {
        getAllServices().then((data) => {
            setServices(data);
        }).catch((error) => {
            console.error('Error:', error);
        });
    }, []);

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
                        <div style={{ height: '93.6%', top: '6.4%', left: '15%', position: 'absolute', width: '85', overflow: 'auto' }}>
                            <div style={{ width: '20rem', height: '100%', background: '#333448' }} className="no-overflow">
                                {services.map((service) => (<AddCategory key={service.id} name={service.name} color={service.color} services={service.triggers} />))}
                            </div>
                        </div>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}