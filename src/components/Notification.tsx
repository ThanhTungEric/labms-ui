import React from 'react';
import { Snackbar, Alert } from '@mui/material';
import { NotificationProps } from '../services/types/Notification.type';


export default function Notification({
  open,
  message,
  severity = 'info',
  onClose,
  autoHideDuration = 3000,
}: NotificationProps) {
    const handleClose = (
        event: React.SyntheticEvent | Event,
        reason?: string
    ) => {
    // ✅ "clickaway" là khi người dùng click ngoài khung
    // if (reason === 'clickaway') return;
    onClose();
  };
  return (
    <Snackbar
      open={open}
      autoHideDuration={autoHideDuration}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    >
      <Alert severity={severity} onClose={handleClose}  sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  );
}
