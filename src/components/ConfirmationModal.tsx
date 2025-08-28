import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material';

interface ConfirmationModalProps {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    message: string;
    confirmText?: string;
    cancelText?: string;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
    open,
    onClose,
    onConfirm,
    title,
    message,
    confirmText = "Delete",
    cancelText = "Cancel",
}) => {
    return (
        <Dialog
            open={open}
            onClose={onClose}
            aria-labelledby="confirmation-dialog-title"
            aria-describedby="confirmation-dialog-description"
            maxWidth="xs"
            fullWidth
        >
            <DialogTitle id="confirmation-dialog-title">{title}</DialogTitle>
            <DialogContent>
                <DialogContentText id="confirmation-dialog-description">
                    {message}
                </DialogContentText>
            </DialogContent>
            <DialogActions sx={{ padding: '16px 24px' }}>
                <Button
                    onClick={onClose}
                    color="inherit"
                    variant="outlined"
                    sx={{
                        '&:hover': {
                            backgroundColor: 'rgba(0, 0, 0, 0.04)',
                        }
                    }}
                >
                    {cancelText}
                </Button>
                <Button
                    onClick={onConfirm}
                    color="error"
                    variant="contained"
                    autoFocus
                >
                    {confirmText}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ConfirmationModal;