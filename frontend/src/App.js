import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import Services from './components/Services';
import Lost from './components/Lost';
import Automations from './components/Automations';
import Dashboard from './dashboard';
import ServicesDash from './dashboard/services';
import { AuthProvider } from './AuthContext';
import Dashboard from './dashboard/index';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/services" element={<Services />} />
          <Route path="/automations" element={<Automations />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/services" element={<ServicesDash />} />
          <Route path="*" element={<Lost />} />
          <Route path="/dashboard/*" element={<Dashboard />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
