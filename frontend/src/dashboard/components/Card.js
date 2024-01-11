import { Card, CardContent, Typography } from '@mui/material';
export default function ModalCard({ title, description, color }) {
    return (
        <Card style={{ backgroundColor: color }}>
            <CardContent>
                <Typography variant="h5" component="div">
                    {title}
                </Typography>
                <Typography variant="body2">
                    {description}
                </Typography>
            </CardContent>
        </Card>
    );
}