import React from 'react';
import { Button, styled } from '@mui/material';

interface ButtonProps {
    onClick: () => void;
    children?: React.ReactNode;
}

const StyledButton = styled(Button)(({ theme }) => ({
    height: '30px',
    padding: '8px 8px',
    borderRadius: '8px',
    borderColor: theme.palette.grey[400],
    color: theme.palette.text.secondary,
    '&:hover': {
        borderColor: '#439cd8',
        backgroundColor: theme.palette.action.hover,
    },
}));

export default function CustomButton({ onClick, children = 'Clear' }: ButtonProps) {
    return (
        <StyledButton
            variant="outlined"
            onClick={onClick}
        >
            {children}
        </StyledButton>
    );
}