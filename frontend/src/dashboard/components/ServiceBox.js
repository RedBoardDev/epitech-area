import { Box, Typography } from '@mui/material';
import { styled } from '@mui/system';

const StyledBox = styled(Box)({
    position: 'relative',
    width: '180px',
    height: '180px',
    borderRadius: '9px',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
    overflow: 'hidden',

    '&:hover': {
        backgroundColor: 'nouvelle couleur ou style ici',
    },

    '::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        background: 'rgba(20, 20, 20, 0.4)',
        borderRadius: '9px',
        pointerEvents: 'none',
    },
});

const Logo = styled('img')({
    width: '40%',
    height: '40%',
    objectFit: 'cover',
    marginTop: '20px',
    position: 'relative',
    zIndex: 1,
});
function ServiceBox({ id, name, color, icon, description, onClick }) {
    return (
        <StyledBox
            key={id}
            sx={{
                background: color,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                margin: '10px',
                padding: '20px',
            }}
            onClick={() => onClick(id)}
        >
            {icon && icon && <Logo src={process.env.REACT_APP_API_URL + icon} alt={`${name} Icon`} />}

            <div style={{ marginTop: '20px', zIndex: 1 }}>
                <Typography variant="h6" sx={{ color: 'white', fontWeight: 'bold', fontSize: '1.2rem', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {name}
                </Typography>
            </div>
            {description && (
                <Typography variant="h6" sx={{ color: 'white', fontWeight: 'bold', fontSize: '0.8rem', overflow: 'hidden', textOverflow: 'ellipsis', wordWrap: 'break-word' }}>
                    {description}
                </Typography>
            )}
        </StyledBox>
    );
}

export default ServiceBox;
