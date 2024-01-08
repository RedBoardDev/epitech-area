import React, { useEffect, useState } from 'react';
import SideBar from './components/SideBar';
import TopBar from './components/TopBar';
import Grid from '@mui/material/Grid';
import Card from "./components/Card"
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import ServicesList from './components/AutomationsList';
import { useTheme } from '../themeContext';
import FavAutomations from "./components/FavAutomationList"
import { useSettings } from '../SettingsContext';
import { motion } from "framer-motion";

export default function Dashboard() {
    const [isSidebarOpen] = React.useState(true);
    const navigate = useNavigate();
    const { verifyToken, getUserById, getActiveAutomations, getActiveServices } = useAuth();
    const { mainTheme } = useTheme();
    const [user, setUser] = useState();
    const [activeAutomation, setActiveAutomation] = useState();
    const [activeService, setActiveService] = useState();
    const { t } = useSettings();

    useEffect(() => {
        const checkToken = async () => {
            if (!await verifyToken()) {
                navigate('/login');
            }
        };
        checkToken();
    }, [verifyToken, navigate]);

    useEffect(() => {
        if (!user) {
            const getInfo = async () => {
              try {
                  const user = await getUserById();
                  const activeAutomations = await getActiveAutomations();
                  const activeServices = await getActiveServices();
                  setActiveService(activeServices)
                  setActiveAutomation(activeAutomations);
                  setUser(user);
                } catch (error) {
                    console.error('Error fetching automations:', error);
                }
            };
            getInfo();
        }
    }, [user, getUserById, getActiveAutomations])

    return (
        <Grid container style={{overflow: 'hidden'}}>
            <Grid item xs={1.8}>
                {isSidebarOpen ? <SideBar /> : null}
            </Grid>
            <Grid item xs={9}>
                {isSidebarOpen ? <TopBar /> : null}
            </Grid>
            <div style={{paddingLeft: '2%', width: '80%', height: '100%', zIndex: '5', position: 'absolute', top: '6%', left: '15%'}}>
                <Grid container spacing={2}>
                    <h1>{t("Welcome")}, {user && user.firstname}
                    <h2>{t("Here is your dashboard")}</h2>
                    </h1>
                    <Grid item xs={6}>
                    </Grid>
                    <Grid item xs={6}>
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
                            <Card title={t("Total active automations")} description={activeAutomation && activeAutomation.length} color="#cdb4db" icon="person" />
                        </motion.div>
                    </Grid>
                    <Grid item xs={6}>
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
                            <Card title={t("Total connected services")} description={activeService && activeService.length} color="#ffc8dd" />
                        </motion.div>
                    </Grid>
                </Grid>
            </div>
            <h1 style={{position: 'absolute', top: '50%', left: '16%', fontWeight: '100'}}>{t("Your favorite automations")}</h1>
            <div style={{backgroundColor: mainTheme.palette.mode, height: '93.5%', top: '53.5%', left: '15%', position: 'absolute', width: '85%', zIndex: '-1', overflow: 'auto', padding: '2%'}}>
                <FavAutomations />
            </div>
        </Grid>
    );
}

