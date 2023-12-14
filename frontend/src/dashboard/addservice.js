import React, { useEffect, useState } from 'react';
import SideBar from './components/SideBar';
import TopBar from './components/TopBar';
import { useAuth } from '../AuthContext';
import Grid from '@mui/material/Grid';
import { ArrowDropDown } from '@mui/icons-material';

const dummyServices = [
    { name: 'Send message', description: 'Send a message to a channel'},
    { name: 'Message received', description: 'Trigger when a message is received'},
    { name: 'Message edited', description: 'Trigger when a message is edited'},
    { name: 'Message deleted', description: 'Trigger when a message is deleted'},
];

const spotifyServices = [
    { name: 'Play a song', description: 'Play a song on Spotify'},
    { name: 'Pause a song', description: 'Pause a song on Spotify'},
    { name: 'Skip a song', description: 'Skip a song on Spotify'},
    { name: 'Song ended', description: 'Trigger when a song is ended'},
];

function AddServices(service) {
    // Services should be :
    // { name: 'Send message', description: 'Send a message to a channel'}
    // it will be a list of services
    service = service.service;
    return (
        <div style={{width: '250px', marginLeft: '20px', marginBottom: '20px', background: 'black', padding: '0.3rem', borderLeft: '50px', borderRadius: '15px', backdropFilter: 'blur(10px)', border: '1px solid rgba(255, 255, 255, 0.6)'}}>
            <h1 style={{fontSize: '1.2rem', color: 'white', padding: '1rem'}}>{service.name}</h1>
            <p style={{fontSize: '0.8rem', color: 'white', padding: '1rem'}}>{service.description}</p>
        </div>
    );
}

function AddCategory({ name, services }) {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div style={{width: '20rem', background: '#333448'}} className="no-overflow">
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem'}}>
                <div style={{display: 'flex', alignItems: 'center'}}>
                    <div style={{width: '1rem', height: '1rem', borderRadius: '50%', background: '#FF5C00', marginRight: '1rem'}}></div>
                    <p style={{fontSize: '1.2rem', color: 'white'}}>{name}</p>
                </div>
                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                    <button onClick={() => setIsOpen(!isOpen)} style={{background: '#FF5C00', border: 'none', borderRadius: '2px', marginRight: '1rem', marginTop: '0.5rem', padding: '0.5rem', display: 'flex', alignItems: 'center'}}>
                        <ArrowDropDown style={{color: 'white', cursor: 'pointer', transform: isOpen ? 'rotate(0deg)' : 'rotate(180deg)'}} />
                    </button>
                </div>
            </div>
            {isOpen && services.map((service) => (
                <AddServices service={service} />
            ))}
        </div>
    );
}

export default function ServicesDash() {
    const [services, setServices] = useState([]);
    const { getAllServices } = useAuth();

    useEffect(() => {
        getAllServices().then((data) => {
            console.log(data);
            setServices(data);
        }).catch((error) => {
            console.error('Error:', error);
        });
    }, []);

    return (
        <Grid container style={{overflow: 'hidden'}}>
            <Grid item xs={2}>
                <SideBar />
            </Grid>
            <Grid item xs={10} style={{overflow: 'hidden'}}>
                <Grid container direction="column" style={{overflow: 'hidden'}}>
                    <Grid item>
                        <TopBar />
                    </Grid>
                    <Grid item xs={12} style={{overflow: 'hidden'}}>
                        <div style={{height: '93.6%', top: '6.4%', left: '15%', position: 'absolute', width: '85', overflow: 'auto'}}>
                            <div style={{width: '20rem', height: '100%', background: '#333448'}} className="no-overflow">
                                {services.map((service) => ( <AddCategory key={service.id} name={service.name} services={service.triggers} /> ))}
                            </div>
                        </div>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}