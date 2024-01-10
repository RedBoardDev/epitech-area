import React, { useEffect, useState } from 'react';
import ServiceBox from './ServiceBox';
import SearchIcon from '@mui/icons-material/Search';
import PageTitle from './PageTitle';
import { motion } from "framer-motion";

export default function ChooseService({ services, type, onServiceSelected }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredServices, setFilteredServices] = useState([]);

    const handleServiceSelect = (serviceId) => {
        const selectedService = services.find((service) => service.id === serviceId);
        onServiceSelected(selectedService);
    };

    useEffect(() => {
        if(!services) return;
        if (type === 'triggers') {
            const filteredServices = services.filter((service) => service.triggers.length > 0);
            setFilteredServices(filteredServices);
        }
        if (type === 'reactions') {
            const filteredServices = services.filter((service) => service.reactions.length > 0);
            setFilteredServices(filteredServices);
        }
    }, [services, type]);

    return (
        <>
            <PageTitle title={`Explore Services for ${type}`} />
            <div style={{
                marginBottom: '30px',
                display: 'flex',
                alignItems: 'center',
                position: 'relative',
                width: '26%'
            }}>
                <SearchIcon style={{ position: 'absolute', marginLeft: '10px', fontSize: '2rem', color: 'black' }} />
                <input
                    type="text"
                    placeholder="Search services..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{
                        padding: '12px',
                        width: '100%',
                        borderRadius: '8px',
                        border: '3px solid #f5f5f5',
                        backgroundColor: '#f5f5f5',
                        color: 'black',
                        fontSize: '1rem',
                        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                        outline: 'none',
                        paddingLeft: '40px',
                    }}
                    onFocus={() => {
                        document.getElementById('searchInput').style.border = '3px solid black';
                    }}
                    onBlur={() => {
                        document.getElementById('searchInput').style.border = '3px solid transparent';
                    }}
                    id="searchInput"
                />
            </div>
            <motion.div
                className="box"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.8,
                  delay: 0.2,
                  ease: [0, 0.71, 0.2, 1.01]
                }}
            >
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px', maxWidth: '700px' }}>
                    {filteredServices && filteredServices
                        .filter((service) => service.name.toLowerCase().includes(searchTerm.toLowerCase()))
                        .map((service) => (
                            <ServiceBox
                                key={service.id}
                                id={service.id}
                                name={service.name}
                                color={service.color}
                                icon={service.icon}
                                onClick={handleServiceSelect}
                            />
                        ))}

                </div>
            </motion.div>
        </>
    );
}
