import React from 'react';
import { Button, styled } from '@mui/material';
import type { ButtonProps } from '@mui/material/Button';

const StyledButton = styled(Button)(({ theme }) => ({
  height: '30px',
  padding: '8px 8px',
  borderRadius: '8px',
  borderColor: theme.palette.grey[400],
  color: theme.palette.text.secondary,
  textTransform: 'none',
  '&:hover': {
    borderColor: '#439cd8',
    backgroundColor: theme.palette.action.hover,
  },
}));

export type CancelButtonProps = ButtonProps;

const CancelButton = React.forwardRef<HTMLButtonElement, CancelButtonProps>(
  ({ children = 'Cancel', variant = 'outlined', ...props }, ref) => (
    <StyledButton ref={ref} variant={variant} {...props}>
      {children}
    </StyledButton>
  )
);

CancelButton.displayName = 'CancelButton';
export default CancelButton;
