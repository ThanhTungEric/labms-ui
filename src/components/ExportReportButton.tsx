import React from 'react';
import { Button, styled } from '@mui/material';
import FileDownloadIcon from '@mui/icons-material/FileDownload';

interface ExportReportButtonProps {
  onClick: () => void;
}

const StyledExportReportButton = styled(Button)(({ theme }) => ({
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

export default function ExportReportButton({ onClick }: ExportReportButtonProps) {
  return (
    <StyledExportReportButton
      variant="outlined"
      startIcon={<FileDownloadIcon />}
      onClick={onClick}
    >
      Export
    </StyledExportReportButton>
  );
}