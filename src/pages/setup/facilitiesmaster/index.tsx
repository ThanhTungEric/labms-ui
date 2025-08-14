import React, { useCallback, useState } from 'react';
import {
  Box,
  Typography,
  IconButton,
  Button,
  Grid,
  Paper,
  Divider,
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreActionsMenu, { MoreActionItem } from '../../../components/MoreActionsMenu';
import ExportReportButton from '../../../components/ExportReportButton';
import ResetButton from '../../../components/ResetButton';
import FacilitiesTreeView from '../../../module/setup/components/FacilitiesTreeView';
import FacilityDetail from '../../../module/setup/components/FacilityDetail';

const moreActionItems: MoreActionItem[] = [
  { key: 'action1', label: 'Action 1' },
  { key: 'action2', label: 'Action 2' },
  { key: 'action3', label: 'Action 3' },
];

export default function FacilitiesMaster() {

  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);

  const handleMoreActionClick = (key: string) => {
    console.log(`More action "${key}" clicked`);
  };

  const handleExportReport = useCallback(() => {
    console.log('Export Report clicked');
  }, []);

  const handleResetFilters = useCallback(() => {
    console.log('Filters reset');
  }, []);

  const handleEdit = useCallback(() => {
    if (selectedItemId) {
      console.log('Edit clicked for item:', selectedItemId);
    }
  }, [selectedItemId]);

  const handleDelete = useCallback(() => {
    if (selectedItemId) {
      console.log('Delete clicked for item:', selectedItemId);
    }
  }, [selectedItemId]);

  return (
    <Box p={2}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1.5,
          mb: 1.5,
          flexWrap: 'wrap',
        }}
      >
        <MoreActionsMenu
          items={moreActionItems}
          onActionClick={handleMoreActionClick}
        />
        <IconButton size="small" onClick={handleEdit} disabled={!selectedItemId}>
          <EditIcon />
        </IconButton>
        <IconButton size="small" color="error" onClick={handleDelete} disabled={!selectedItemId}>
          <DeleteIcon />
        </IconButton>
        <ExportReportButton onClick={handleExportReport} />
        <ResetButton onClick={handleResetFilters} />
      </Box>

      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          gap: 2,
        }}
      >
        <Paper
          sx={{
            flex: '1 1 33%',
            minWidth: 260,
            border: '1px solid #ccc',
            borderRadius: '4px',
            p: 1,
          }}
        >
          <FacilitiesTreeView onSelect={setSelectedItemId} />
        </Paper>
        <Paper
          sx={{
            flex: '1 1 67%',
            border: '1px solid #ccc',
            borderRadius: '4px',
            p: 1,
            minHeight: 352,
          }}
        >
          <FacilityDetail selectedItemId={selectedItemId} />
        </Paper>
      </Box>
    </Box>
  );
}