import React from 'react';
import { Button, styled } from '@mui/material';
import type { ButtonProps } from '@mui/material/Button';

const StyledSaveButton = styled(Button)(({ theme }) => ({
    height: '30px',
    padding: '8px 8px',
    borderRadius: '6px',

    '&.MuiButton-outlined': {
        borderColor: '#4caf50',
        color: '#4caf50',
        '&:hover': {
            borderColor: '#43a047',
            backgroundColor: theme.palette.action.hover,
        },
    },


    '&.MuiButton-contained': {
        backgroundColor: theme.palette.success.main,
        color: theme.palette.common.white,
        '&:hover': {
            backgroundColor: theme.palette.success.dark,
        },
    },
}));

export type SaveButtonProps = ButtonProps;

const SaveButton = React.forwardRef<HTMLButtonElement, SaveButtonProps>(
    ({ children = 'Save', ...props }, ref) => (
        <StyledSaveButton ref={ref} {...props}>
            {children}
        </StyledSaveButton>
    )
);

SaveButton.displayName = 'SaveButton';
export default SaveButton;
