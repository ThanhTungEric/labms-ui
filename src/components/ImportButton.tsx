import React from 'react';
import { Button, styled } from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile'; // hoặc CloudUploadIcon tuỳ chọn

interface ImportButtonProps {
  onClick: () => void;
}

const StyledImportButton = styled(Button)(({ theme }) => ({
  height: 32,                               
  minWidth: 'auto',
  padding: '0 10px',                        // canh chữ gọn
  borderRadius: 8,
  borderColor: theme.palette.grey[400],
  color: theme.palette.text.secondary,
  fontSize: 13,                             // đồng bộ font nhỏ
  fontWeight: 400,
  textTransform: 'none',
  lineHeight: 1.2,
  display: 'flex',
  alignItems: 'center',
  '& .MuiButton-startIcon': {
    marginRight: 6,
    marginLeft: 0,
    '& svg': {
      fontSize: 16,                         // icon nhỏ gọn
    },
  },
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
