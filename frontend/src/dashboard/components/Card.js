import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Icon from '@mui/material/Icon'; // Ajout d'une icône

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