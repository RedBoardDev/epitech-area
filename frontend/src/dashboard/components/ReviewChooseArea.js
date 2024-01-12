import React, { useEffect, useState } from "react";
import { Box, Button, TextField, CircularProgress } from '@mui/material';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import PageTitle from "./PageTitle";
import SummaryCard from "./SummaryCard";
import { useAuth } from '../../AuthContext';
import { useTheme } from '../../themeContext';
import { useNavigate } from "react-router-dom";
import CachedIcon from '@mui/icons-material/Cached';

const ArrowBox = () => (
    <Box style={{ textAlign: 'center', marginBottom: '20px' }}>
        <ArrowDownwardIcon fontSize="large" style={{ color: '#1c1a1a' }} />
    </Box>
);

// ...

const ReviewChooseArea = ({ triggerData, reactionData, reset }) => {
    const { mainTheme } = useTheme();
    const [validateHover, setValidateHover] = useState(false);
    const [cancelHover, setCancelHover] = useState(false);
    const [OauthService, setOauthService] = useState([false, false]); // [trigger, reaction]
    const [automationName, setAutomationName] = useState("");
    const [loading, setLoading] = useState(false); // Nouvel état pour gérer le chargement

    const { serviceOauthVerify, addAutomation } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        checkOauth();
    }, []);

    const checkOauth = async () => {
        setLoading(true);
        try {
            const OauthServiceTrigger = await serviceOauthVerify(triggerData.service_id);
            const OauthServiceReaction = await serviceOauthVerify(reactionData.service_id);
            setOauthService([OauthServiceTrigger, OauthServiceReaction]);
        } catch (error) {
            console.error("Error during checkOauth:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleValidate = async () => {
        setLoading(true);
        try {
            await addAutomation(triggerData.service_id, triggerData.id, JSON.stringify(triggerData.formValues),
                reactionData.service_id, reactionData.id, JSON.stringify(reactionData.formValues), automationName);
            navigate('/dashboard/services');
        } catch (error) {
            console.error("Error during addAutomation:", error);
            navigate('/dashboard/addservice');
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        reset();
    };

    return (
        <Box style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100vh' }}>
            <PageTitle title={`Review your trigger -> reaction`} />
            <Box style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

                <SummaryCard reloadCheckOauth={checkOauth} serviceId={triggerData.service_id} title={triggerData.name} fields={Object.entries(triggerData.fields).map(([key, { id, name }]) => ({ id, name }))} values={Object.entries(triggerData.formValues).map(([key, value]) => ({ id: key, name: key, value }))} connect={OauthService[0]} />
                <ArrowBox />
                <SummaryCard reloadCheckOauth={checkOauth} serviceId={reactionData.service_id} title={reactionData.name} fields={Object.entries(reactionData.fields).map(([key, { id, name }]) => ({ id, name }))} values={Object.entries(reactionData.formValues).map(([key, value]) => ({ id: key, name: key, value }))} connect={OauthService[1]} />

                <TextField
                    label="Automation name"
                    variant="outlined"
                    value={automationName}
                    onChange={(e) => setAutomationName(e.target.value)}
                    sx={{
                        marginBottom: '20px',
                        textAlign: 'center',
                        // backgroundColor: '#f0f0f0',
                        color: '#FDFFF',
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                        border: '2px solid #ddd',
                        borderRadius: '8px',
                        '& fieldset': {
                            borderColor: 'transparent',
                        },
                    }}
                />

                <Box style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
                    {automationName && automationName.length > 0 && OauthService[0] && OauthService[1] && (
                        <Button variant="contained" color="primary"
                            style={{
                                backgroundColor: validateHover ? 'rgba(86, 32, 117, 0.7)' : 'rgba(86, 32, 117, 0.4)',
                                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                                border: '2px solid #ddd',
                                borderRadius: '8px',
                                color: mainTheme.palette.CardContentTitle.main,
                                marginRight: '5px',
                            }}
                            onClick={handleValidate}
                            onMouseEnter={() => setValidateHover(true)}
                            onMouseLeave={() => setValidateHover(false)}
                        >
                            {loading ? <CircularProgress size={20} color="inherit" /> : "Validate"}
                        </Button>
                    )}

                    <Button variant="contained" color="error"
                        style={{
                            backgroundColor: cancelHover ? 'rgba(255, 0, 0, 0.7)' : 'rgba(255, 0, 0, 0.4)',
                            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                            border: '2px solid #ddd',
                            borderRadius: '8px',
                            color: mainTheme.palette.CardContentTitle.main,
                        }}
                        onClick={handleCancel}
                        onMouseEnter={() => setCancelHover(true)}
                        onMouseLeave={() => setCancelHover(false)}
                    >
                        Cancel
                    </Button>

                    <Button variant="contained" color="primary" onClick={checkOauth} disabled={loading}>
                        {loading ? <CircularProgress size={20} color="inherit" /> : <CachedIcon />}
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};

export default ReviewChooseArea;
