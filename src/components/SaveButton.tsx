import React from 'react';
import { Button, styled } from '@mui/material';
import type { ButtonProps } from '@mui/material/Button';

const StyledButton = styled(Button)(({ theme }) => ({
    height: '30px',
    padding: '8px 8px',
    borderRadius: '8px',
    borderColor: theme.palette.grey[400],
    textTransform: 'none',
    '&:hover': {
        borderColor: '#439cd8',
        backgroundColor: theme.palette.action.hover,
        color: theme.palette.text.secondary,
    },
}));

export type SaveButtonProps = ButtonProps;

const SaveButton = React.forwardRef<HTMLButtonElement, SaveButtonProps>(
    ({ children = 'Save', variant = 'outlined', ...props }, ref) => (
        <StyledButton ref={ref} variant={variant} {...props}>
            {children}
        </StyledButton>
    )
);

SaveButton.displayName = 'SaveButton';
export default SaveButton;
