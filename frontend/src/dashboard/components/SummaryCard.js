import React, { useEffect, useState } from "react";
import { Card, CardContent, Typography, Button } from '@mui/material';
import { useAuth } from '../../AuthContext';
import { useSettings } from '../../SettingsContext';

const SummaryCard = ({ reloadCheckOauth, serviceId, title, fields, values, connect }) => {
    const { t } = useSettings();
    const [hover, setHover] = useState(false);

    const { serviceOauth } = useAuth();

    useEffect(() => {
        console.log("Effect executed");
        console.log("serviceId", serviceId);

    }, []);

    const handleOauthConnect = async () => {
        await serviceOauth(serviceId);
        reloadCheckOauth();
    }

    return (
        <Card style={{
            textAlign: 'center',
            marginBottom: '20px',
            backgroundColor: '#f0f0f0',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            border: '2px solid #ddd',
            borderRadius: '8px',
        }}>
            <CardContent>
                <Typography variant="h5" gutterBottom style={{ color: '#333333', textAlign: 'center' }}>
                    {title}
                </Typography>
                {values && values.map((value) => {
                    const field = fields ? fields.find((field) => field.id === value.name) : null;
                    const fieldName = field ? field.name : value.name;
                    return (
                        <Typography key={value.id} variant="body1" color="textSecondary" gutterBottom style={{ color: '#666666', textAlign: 'left' }}>
                            {`${fieldName}: ${value.value}`}
                        </Typography>
                    );
                })}
                {!connect && (
                    <Button variant="contained" color="error"
                        style={{
                            backgroundColor: hover ? 'rgba(128, 65, 61, 0.6)' : 'rgba(128, 48, 43, 0.4)',
                            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                            border: '2px solid #ddd',
                            borderRadius: '8px',
                            color: '#333333',
                        }}
                        onClick={() => handleOauthConnect()}
                        onMouseEnter={() => setHover(true)}
                        onMouseLeave={() => setHover(false)}
                    >
                        {t("Connect to the service")}
                    </Button>
                )}
            </CardContent>
        </Card>
    );
};

export default SummaryCard;
