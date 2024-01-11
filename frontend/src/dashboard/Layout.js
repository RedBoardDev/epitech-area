import React from 'react';
import TopBar from './components/TopBar';
import SideBar from './components/SideBar';

const Layout = ({ children }) => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', overflow: 'hidden' }}>
            <TopBar />
            <div style={{ display: 'flex', flex: 1, backgroundColor: '#f0f1f5', }}>
                <SideBar />
                <div style={{ flex: 1, padding: 0, marginLeft: '0%', marginRight: '0%', overflowY: 'auto' }}>
                    <div style={{
                        paddingLeft: '17%',
                        paddingTop: '5rem',
                        paddingRight: '2%',
                        width: '100%',
                        maxHeight: `calc(100vh)`,
                        overflowY: 'auto',
                    }}>
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Layout;
