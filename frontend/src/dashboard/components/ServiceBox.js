import { Box, Typography } from '@mui/material';
import { styled } from '@mui/system';

const StyledBox = styled(Box)({
    width: '180px',
    height: '180px',  //
    borderRadius: '9px',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
    overflow: 'hidden',
});
const Logo = styled('img')({
    width: '40%',
    height: '40%',
    objectFit: 'cover',
    marginTop: '20px',
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

            <div style={{ marginTop: '20px' }}>
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
