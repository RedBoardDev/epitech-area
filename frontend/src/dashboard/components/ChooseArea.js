import React, { useState } from 'react';
import ServiceBox from './ServiceBox';
import SearchIcon from '@mui/icons-material/Search';
import PageTitle from './PageTitle';
import { useSettings } from '../../SettingsContext';

export default function ChooseArea({ data, type, serviceName, onSelected }) {
    const [searchTerm, setSearchTerm] = useState('');
    const { t } = useSettings();

    const handleSelection = (id) => {
        const selectedData = data.find((trigger) => trigger.id === id);
        onSelected(selectedData);
    };

    return (
        <>
            <PageTitle title={`${t("Explore")} ${type} ${t("for")} ${serviceName}`} />
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
                    placeholder={`${t("Search")} ${type}...`}
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
                {data && data.length > 0 && data
                    .filter((object) => object.name.toLowerCase().includes(searchTerm.toLowerCase()))
                    .map((object) => (
                        <ServiceBox
                            key={object.id}
                            id={object.id}
                            name={object.name}
                            color={object.color || 'grey'}
                            description={object.description}
                            onClick={handleSelection}
                        />
                    ))}
            </div>
        </>
    );
}
