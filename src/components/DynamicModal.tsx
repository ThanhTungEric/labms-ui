import React, { ReactNode } from 'react';
import {
    Modal,
    Box,
    Typography,
    IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface DynamicModalProps {
    open: boolean;
    onClose: () => void;
    title: string;
    children: ReactNode;
}

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 3,
    borderRadius: 1,
};

const DynamicModal: React.FC<DynamicModalProps> = ({ open, onClose, title, children }) => {
    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
        >
            <Box sx={style}>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                    <Typography id="modal-title" variant="h6" component="h2">
                        {title}
                    </Typography>
                    <IconButton onClick={onClose} size="small">
                        <CloseIcon />
                    </IconButton>
                </Box>
                {children}
            </Box>
        </Modal>
    );
};

export default DynamicModal;