import React, { useState } from 'react';
import ServiceBox from './ServiceBox';
import SearchIcon from '@mui/icons-material/Search';
import PageTitle from './PageTitle';

export default function ChooseService({ services, type, onServiceSelected }) {
    const [searchTerm, setSearchTerm] = useState('');

    const handleServiceSelect = (serviceId) => {
        const selectedService = services.find((service) => service.id === serviceId);
        onServiceSelected(selectedService);
    };

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
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px', maxWidth: '700px' }}>
                {services && services
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
        </>
    );
}
