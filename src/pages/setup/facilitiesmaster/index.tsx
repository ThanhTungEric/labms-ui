import React from 'react';
import {
  Box,
  Typography,
  IconButton,
  Button, // Giữ lại Button cho Export và Reset
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import FileDownloadIcon from '@mui/icons-material/FileDownload';

// Import component MoreActionsMenu mới
import MoreActionsMenu, { MoreActionItem } from '../../../components/MoreActionsMenu';
import ExportReportButton from '../../../components/ExportReportButton';
import ResetButton from '../../../components/ResetButton';

import FacilitiesTreeView from '../../../module/setup/components/FacilitiesTreeView';


// Định nghĩa các item cho More Actions menu
const moreActionItems: MoreActionItem[] = [
  { key: 'action1', label: 'Action 1' },
  { key: 'action2', label: 'Action 2' },
  { key: 'action3', label: 'Action 3' },
];

export default function FacilitiesMaster() {

  // Logic xử lý khi chọn một item trong More Actions menu
  const handleMoreActionClick = (key: string) => {
    console.log(`More action "${key}" clicked`);

  };

  const handleExportReport = () => {
    console.log('Export Report clicked');
  };

  const handleResetFilters = () => {
    console.log('Filters reset');
  };

  const handleView = () => {
    console.log('View clicked');
  };

  const handleEdit = () => {
    console.log('Edit clicked');
  };

  const handleDelete = () => {
    console.log('Delete clicked');
  };

  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1.5,
          mb: 3,
          flexWrap: 'wrap',
        }}
      >
        {/* Sử dụng component MoreActionsMenu mới */}
        <MoreActionsMenu
          items={moreActionItems}
          onActionClick={handleMoreActionClick}
        />

        {/* Icon actions */}
        <IconButton size="small" onClick={handleView}>
          <VisibilityIcon />
        </IconButton>
        <IconButton size="small" onClick={handleEdit}>
          <EditIcon />
        </IconButton>
        <IconButton size="small" color="error" onClick={handleDelete}>
          <DeleteIcon />
        </IconButton>

        <ExportReportButton onClick={handleExportReport} />
        <ResetButton onClick={handleResetFilters} />
      </Box>

      {/* Tree View component */}
      <Box
        sx={{
          flexGrow: 1,
          maxWidth: 400,
          border: '1px solid #ccc',
          borderRadius: '4px',
          p: 1,
        }}
      >
        <FacilitiesTreeView />
      </Box>
    </Box>
  );
}