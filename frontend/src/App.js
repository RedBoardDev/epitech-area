import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login, { LoginGithubCallback } from './components/Login';
import Register, { RegisterGithubCallback } from './components/Register';
import Home from './components/Home';
import Services from './components/Services';
import Lost from './components/Lost';
import Dashboard from './dashboard';
import ServicesDash from './dashboard/services';
import AddService from './dashboard/addservice';
import { AuthProvider } from './AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/register/github/callback" element={<RegisterGithubCallback />} />
          <Route path="/login/github/callback" element={<LoginGithubCallback />} />
          <Route path="/services" element={<Services />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/services" element={<ServicesDash />} />
          <Route path="/dashboard/addservice" element={<AddService />} />
          <Route path="*" element={<Lost />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
