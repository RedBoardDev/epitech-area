import React from "react";
import { Card, CardContent, Typography } from '@mui/material';

const SummaryCard = ({ title, fields, values }) => (
    <Card style={{
        textAlign: 'center',
        marginBottom: '20px',
        backgroundColor: '#f0f0f0',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        border: '2px solid #ddd',
        borderRadius: '8px',
    }}>
        <CardContent>
            <Typography variant="h5" gutterBottom style={{ color: '#333333' }}>
                {title}
            </Typography>
            {values && values.map((value) => {
                const field = fields ? fields.find((field) => field.id === value.name) : null;
                const fieldName = field ? field.name : value.name;
                return (
                    <Typography key={value.id} variant="body1" color="textSecondary" gutterBottom style={{ color: '#666666' }}>
                        {`${fieldName}: ${value.value}`}
                    </Typography>
                );
            })}
        </CardContent>
    </Card>
);

export default SummaryCard;
