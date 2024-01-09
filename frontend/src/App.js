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
import { SettingsProvider } from './SettingsContext';
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { useTheme } from './themeContext';
import { MyThemeProvider } from './themeContext';
import ServicesGithub from './components/service/ServiceInfo';
import Layout from './dashboard/Layout';

const AppBody = () => {
    const { mainTheme } = useTheme();
    return (
      <SettingsProvider>
        <ThemeProvider theme={mainTheme}>
          <CssBaseline />
          <AuthProvider>
            <Router>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/register/github/callback" element={<RegisterGithubCallback />} />
                <Route path="/login/github/callback" element={<LoginGithubCallback />} />
                <Route path="/services" element={<Services />} />

                <Route path="/service/:serviceName" element={<ServicesGithub />} />
                <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
                <Route path="/dashboard/services" element={<Layout><ServicesDash /></Layout>} />
                <Route path="/dashboard/addservice" element={<Layout><AddService /></Layout>} />
                <Route path="*" element={<Lost />} />
              </Routes>
            </Router>
          </AuthProvider>
        </ThemeProvider>
      </SettingsProvider>
    );
  };


function App() {
    return (
        <MyThemeProvider>
            <AppBody />
        </MyThemeProvider>
    );
}

export default App;
