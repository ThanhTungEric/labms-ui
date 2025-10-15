import React from 'react';
import { Button, styled } from '@mui/material';

interface ButtonProps {
    onClick: () => void;
    children?: React.ReactNode;
    marginLeft?: number | string;
    marginRight?: number | string;
}

const StyledButton = styled(Button)<{ marginLeft?: number | string; marginRight?: number | string }>(({ theme, marginLeft, marginRight }) => ({
    height: '30px',
    padding: '8px 8px',
    borderRadius: '8px',
    marginLeft: marginLeft || 2,
    marginRight: marginRight || 2,
    borderColor: theme.palette.grey[400],
    color: theme.palette.text.secondary,
    textTransform: 'none',
    '&:hover': {
        borderColor: '#439cd8',
        backgroundColor: theme.palette.action.hover,
    },
}));

export default function CustomButton({
    onClick,
    children = 'Clear',
    marginLeft,
    marginRight,
}: ButtonProps) {
    return (
        <StyledButton
            variant="outlined"
            onClick={onClick}
            marginLeft={marginLeft}
            marginRight={marginRight}
        >
            {children}
        </StyledButton>
    );
}
