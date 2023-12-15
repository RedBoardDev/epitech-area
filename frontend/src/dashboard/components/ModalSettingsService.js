import React, { useState, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

const ModalSettingsService = ({ isOpen, closeModal, data, onSubmit }) => {
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
        console.log('formValues:', formValues);
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
            <DialogTitle>Settings</DialogTitle>
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
                    <DialogActions>
                        <Button onClick={closeModal}>Cancel</Button>
                        <Button type="submit" variant="contained" color="primary">
                            Submit
                        </Button>
                    </DialogActions>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default ModalSettingsService;
