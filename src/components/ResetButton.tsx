import React from 'react';
import { Button, styled } from '@mui/material';

interface ResetButtonProps {
  onClick: () => void;
}

const StyledResetButton = styled(Button)(({ theme }) => ({
  height: '30px',
  padding: '8px 8px',
  borderRadius: '8px',
  borderColor: theme.palette.grey[400],
  color: theme.palette.text.secondary,
  '&:hover': {
    borderColor: theme.palette.grey[500],
    backgroundColor: theme.palette.action.hover,
  },
}));

export default function ResetButton({ onClick }: ResetButtonProps) {
  return (
    <StyledResetButton
      variant="outlined"
      onClick={onClick}
    >
      Reset
    </StyledResetButton>
  );
}