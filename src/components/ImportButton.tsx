import React from 'react';
import { Button, styled } from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile'; // icon upload
// hoặc có thể dùng CloudUploadIcon tuỳ sở thích

interface ImportButtonProps {
  onClick: () => void;
}

const StyledImportButton = styled(Button)(({ theme }) => ({
  height: '30px',
  padding: '8px 8px',
  borderRadius: '8px',
  borderColor: theme.palette.grey[400],
  color: theme.palette.text.secondary,
  textTransform: 'none',
  '&:hover': {
    borderColor: theme.palette.grey[500],
    backgroundColor: theme.palette.action.hover,
  },
}));

export default function ImportButton({ onClick }: ImportButtonProps) {
  return (
    <StyledImportButton
      variant="outlined"
      startIcon={<UploadFileIcon />}
      onClick={onClick}
    >
      Import
    </StyledImportButton>
  );
}
