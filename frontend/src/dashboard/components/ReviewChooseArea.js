import React, { useState } from "react";
import { Box, Button } from '@mui/material';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import PageTitle from "./PageTitle";
import SummaryCard from "./SummaryCard";

const ArrowBox = () => (
    <Box style={{ textAlign: 'center', marginBottom: '20px' }}>
        <ArrowDownwardIcon fontSize="large" style={{ color: '#1c1a1a' }} />
    </Box>
);

const ReviewChooseArea = ({ triggerData, reactionData }) => {
    const [validateHover, setValidateHover] = useState(false);
    const [cancelHover, setCancelHover] = useState(false);

    const handleValidate = () => {
        console.log("Validation du choix");
    };

    const handleCancel = () => {
        console.log("Annulation du choix");
    };

    return (
        <Box style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100vh' }}>
            <PageTitle title={`Review your trigger -> reaction`} />
            <Box style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

                <SummaryCard title={triggerData.name} fields={Object.entries(triggerData.fields).map(([key, { id, name }]) => ({ id, name }))} values={Object.entries(triggerData.formValues).map(([key, value]) => ({ id: key, name: key, value }))} />
                <ArrowBox />
                <SummaryCard title={reactionData.name} fields={Object.entries(reactionData.fields).map(([key, { id, name }]) => ({ id, name }))} values={Object.entries(reactionData.formValues).map(([key, value]) => ({ id: key, name: key, value }))} />

                <Box style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
                    <Button variant="contained" color="primary"
                        style={{
                            backgroundColor: validateHover ? 'rgba(86, 32, 117, 0.7)' : 'rgba(86, 32, 117, 0.4)',
                            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                            border: '2px solid #ddd',
                            borderRadius: '8px',
                            color: '#333333',
                            marginRight: '5px',
                        }}
                        onClick={handleValidate}
                        onMouseEnter={() => setValidateHover(true)}
                        onMouseLeave={() => setValidateHover(false)}
                    >
                        Validate
                    </Button>
                    <Button variant="contained" color="error"
                        style={{
                            backgroundColor: cancelHover ? 'rgba(255, 0, 0, 0.7)' : 'rgba(255, 0, 0, 0.4)',
                            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                            border: '2px solid #ddd',
                            borderRadius: '8px',
                            color: '#333333',
                        }}
                        onClick={handleCancel}
                        onMouseEnter={() => setCancelHover(true)}
                        onMouseLeave={() => setCancelHover(false)}
                    >
                        Cancel
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};

export default ReviewChooseArea;
