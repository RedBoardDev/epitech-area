import React, { useEffect, useState } from 'react';
import Card from "./components/Card";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import FavAutomations from "./components/FavAutomationList";
import Grid from '@mui/material/Grid';
import PageTitle from './components/PageTitle';
import { motion } from "framer-motion";
import { useSettings } from '../SettingsContext';
import { useTheme } from "../themeContext";

export default function Dashboard() {
    const navigate = useNavigate();
    const { t } = useSettings();
    const { verifyToken, getUserById, getActiveAutomations, getActiveServices } = useAuth();
    const [user, setUser] = useState();
    const [activeAutomation, setActiveAutomation] = useState([]);
    const [activeService, setActiveService] = useState([]);
    const { mainTheme } = useTheme();
    useEffect(() => {
        const checkToken = async () => {
            if (!await verifyToken()) {
                navigate('/login');
            }
        };
        checkToken();
    }, [verifyToken, navigate]);

    useEffect(() => {
        const getInfo = async () => {
            try {
                const user = await getUserById();
                const activeAutomations = await getActiveAutomations();
                const activeServices = await getActiveServices();
                setActiveService(activeServices);
                setActiveAutomation(activeAutomations);
                setUser(user);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        if (!user) {
            getInfo();
        }
    }, [user, getUserById, getActiveAutomations, getActiveServices]);

    return (
        <div style={{ width: '100%', height: '100%' }}>
            <PageTitle title={t("Dashboard")} />
            <div>
                <h1 style={{ color: mainTheme.palette.SwitchStyle.main }}>{t("Welcome")}, {user && user.firstname}</h1>
            </div>

            <Grid container spacing={3}>
                <Grid item xs={12} sm={6} md={3}>
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
                        <Card title={t("Total active automations")} description={activeAutomation.length} color="#cdb4db" icon="person" />
                    </motion.div>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
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
                        <Card title={t("Total connected services")} description={activeService.length} color="#ffc8dd" />
                    </motion.div>

                </Grid>
                <Grid item xs={12} sm={6} md={3}>
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
                        <Card title="Total Comments" description="100" color="#bde0fe" />
                    </motion.div>

                </Grid>
                <Grid item xs={12} sm={6} md={3}>
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
                        <Card title="Total Likes" description="100" color="#a2d2ff" />
                    </motion.div>

                </Grid>

                <Grid item xs={12}>
                    <h1 style={{ fontWeight: '100' }}>{t("Your favorite automations")}</h1>
                </Grid>

                <Grid item xs={12} style={{ overflow: 'auto' }}>
                    <FavAutomations />
                </Grid>
            </Grid>
        </div>
    );
}
