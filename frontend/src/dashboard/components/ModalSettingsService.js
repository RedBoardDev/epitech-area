import React, { useState, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useSettings } from '../../SettingsContext';

const ModalSettingsService = ({ isOpen, closeModal, data, onSubmit }) => {
    const { t } = useSettings();
    const [formValues, setFormValues] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        data['formValues'] = formValues;
        onSubmit(data);
        closeModal();
    };

    useEffect(() => {
        if (isOpen) {
            setFormValues({});
        }
    }, [isOpen]);

    return (
        <Dialog open={isOpen} onClose={closeModal}>
            <DialogTitle sx={{ textAlign: 'center' }}>{t("Parameters")}</DialogTitle>
            <DialogContent>
                <form onSubmit={handleSubmit}>
                    {data?.fields && data.fields.map((field) => (
                        <div key={field.id} style={{ marginBottom: '1.5rem' }}>
                            <TextField
                                fullWidth
                                label={field.name}
                                variant="outlined"
                                name={field.id}
                                onChange={handleChange}
                                helperText={field.description}
                            />
                        </div>
                    ))}
                </form>
            </DialogContent>
            <DialogActions style={{ justifyContent: 'space-between', marginLeft: '20px', marginRight: '20px', marginTop: '-1.5rem' }}>
                <Button onClick={closeModal} color="primary">
                    {t("Cancel")}
                </Button>
                <Button type="submit" variant="contained" color="primary" onClick={handleSubmit}>
                    {t("Submit")}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ModalSettingsService;
