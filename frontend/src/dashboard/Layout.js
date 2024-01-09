import React from 'react';
import TopBar from './components/TopBar';
import SideBar from './components/SideBar';

const Layout = ({ children }) => {
    return (
        <div style={{ zIndex: 100, display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <TopBar />
            <div style={{ display: 'flex', flex: 1 }}>
                <SideBar />
                <div style={{ flex: 1, padding: '20px', overflowX: 'hidden', overflowY: 'auto' }}>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Layout;
