import React from 'react';
import { Button, Box, styled } from '@mui/material';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import AddIcon from '@mui/icons-material/Add';

interface ActionButtonsProps {
  onExport: () => void;
  onCreate: () => void;
}

const primaryColor = '#597bf9';
const primaryColorHover = '#3653d9';

const StyledExportButton = styled(Button)(({ theme }) => ({
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

const StyledCreateButton = styled(Button)(({ theme }) => ({
  height: '30px',
  padding: '8px 8px',
  borderRadius: '8px',
  backgroundColor: primaryColor,
  color: theme.palette.common.white,
  '&:hover': {
    backgroundColor: primaryColorHover,
  },
}));

export default function ActionButtons({ onExport, onCreate }: ActionButtonsProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        gap: 1.5,
        marginBottom: 2,
        justifyContent: 'flex-end',
      }}
    >
      <StyledExportButton
        variant="outlined"
        startIcon={<FileDownloadIcon />}
        onClick={onExport}
      >
        Export All
      </StyledExportButton>
      <StyledCreateButton
        variant="contained"
        startIcon={<AddIcon />}
        onClick={onCreate}
      >
        Create new
      </StyledCreateButton>
    </Box>
  );
}