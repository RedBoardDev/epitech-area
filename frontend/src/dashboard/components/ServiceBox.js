import { Box, Typography } from '@mui/material';
import { styled } from '@mui/system';

const StyledBox = styled(Box)({
    width: '300px', // Ajustez la largeur selon vos besoins
    height: '300px', // Ajustez la hauteur selon vos besoins
    // margin: '20px',
    // padding: '0.3rem',
    borderRadius: '9px',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
    // position: 'relative',
    // userSelect: 'none',
    // aspectRatio: '1/1', // Maintient un rapport hauteur/largeur 1:1
    // overflow: 'hidden', // Empêche le contenu de déborder
});

const Logo = styled('img')({
    width: '30%',
    height: '30%',
    objectFit: 'cover', // Assure le remplissage complet du conteneur avec l'image
});

function ServiceBox({ id, name, color, icon }) {
    return (
        <StyledBox
            key={id}
            sx={{
                background: color, // Utilisez la couleur pour le fond de la box
                display: 'flex',
                flexDirection: 'column', // Alignez les éléments en colonne
                alignItems: 'center', // Centre le contenu horizontalement
                justifyContent: 'center', // Centre le contenu verticalement
                textAlign: 'center', // Centre le texte
            }}
        >
            {icon && <Logo src={process.env.REACT_APP_API_URL + icon} alt={`${name} Icon`} />}

            <Typography variant="h6" sx={{ color: 'white', fontWeight: 'bold', fontSize: '1rem', marginTop: '10px' }}>
                {name}
            </Typography>
        </StyledBox>
    );
}

export default ServiceBox;
