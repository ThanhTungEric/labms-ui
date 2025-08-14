import React from 'react';
import { Button, styled } from '@mui/material';
import type { ButtonProps } from '@mui/material/Button';

const StyledCancelButton = styled(Button)(({ theme }) => ({
    height: '30px',
    padding: '8px 8px',
    borderRadius: '10px',

    '&.MuiButton-outlined': {
        borderColor: theme.palette.error.main,
        color: theme.palette.error.main,
        '&:hover': {
            borderColor: theme.palette.error.dark,
            backgroundColor: theme.palette.action.hover,
        },
    },

    '&.MuiButton-contained': {
        backgroundColor: theme.palette.error.main,
        color: theme.palette.common.white,
        '&:hover': {
            backgroundColor: theme.palette.error.dark,
        },
    },
}));

export type CancelButtonProps = ButtonProps;

const CancelButton = React.forwardRef<HTMLButtonElement, CancelButtonProps>(
    ({ children = 'Cancel', ...props }, ref) => (
        <StyledCancelButton ref={ref} {...props}>
            {children}
        </StyledCancelButton>
    )
);

CancelButton.displayName = 'CancelButton';
export default CancelButton;
