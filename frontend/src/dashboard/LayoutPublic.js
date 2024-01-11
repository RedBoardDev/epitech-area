import React from 'react';
import TopBarPublic from './components/TopBarPublic';

const LayoutPublic = ({ children }) => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', overflow: 'hidden' }}>
            <TopBarPublic />
            <div style={{
                paddingTop: '5rem',
                width: '100%',
                maxHeight: `calc(100vh)`,
                overflowY: 'auto',
            }}>
                {children}
            </div>
        </div>
    );
};

export default LayoutPublic;
