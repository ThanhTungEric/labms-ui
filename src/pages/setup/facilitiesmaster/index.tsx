import React, { useCallback, useEffect, useState } from 'react';
import {
  Box, IconButton, Button, Paper,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreActionsMenu, { MoreActionItem } from '../../../components/MoreActionsMenu';
import ExportReportButton from '../../../components/ExportReportButton';
import SaveButton from '../../../components/SaveButton';
import CancelButton from '../../../components/CancelButton';
import ResetButton from '../../../components/ResetButton';
import FacilitiesTreeView from '../../../module/setup/components/facilities/FacilitiesTreeView';
import FacilityDetail from '../../../module/setup/components/facilities/FacilityDetail';

const moreActionItems: MoreActionItem[] = [
  { key: 'action1', label: 'Action 1' },
  { key: 'action2', label: 'Action 2' },
  { key: 'action3', label: 'Action 3' },
];

export default function FacilitiesMaster() {
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const [saveTick, setSaveTick] = useState(0);
  const [cancelTick, setCancelTick] = useState(0);

  const exitEdit = useCallback(() => setIsEditing(false), []);
  useEffect(() => { setIsEditing(false); }, [selectedItemId]);

  const handleMoreActionClick = (key: string) => console.log(`More action "${key}" clicked`);
  const handleExportReport = useCallback(() => console.log('Export Report clicked'), []);
  const handleResetFilters = useCallback(() => console.log('Filters reset'), []);
  const handleDelete = useCallback(() => {
    if (selectedItemId) console.log('Delete clicked for item:', selectedItemId);
  }, [selectedItemId]);

  return (
    <Box p={2}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1.5, flexWrap: 'wrap' }}>
        <MoreActionsMenu items={moreActionItems} onActionClick={handleMoreActionClick} />

        {!isEditing && (
          <IconButton size="small" onClick={() => selectedItemId && setIsEditing(true)} disabled={!selectedItemId}>
            <EditIcon />
          </IconButton>
        )}
        {!isEditing && (
          <IconButton size="small" color="error" onClick={handleDelete} disabled={!selectedItemId}>
            <DeleteIcon />
          </IconButton>
        )}

        {isEditing && (
          <>
            <SaveButton
              variant="contained"
              size="small"
              onClick={() => setSaveTick(t => t + 1)}
              disabled={!selectedItemId}
            >
              Save
            </SaveButton>
            <CancelButton
              variant="outlined"
              size="small"
              onClick={() => { setCancelTick(t => t + 1); exitEdit(); }}
            >
              Cancel
            </CancelButton>
          </>
        )}

        <ExportReportButton onClick={handleExportReport} />
        <ResetButton onClick={handleResetFilters} />
      </Box>

      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 2 }}>
        <Paper sx={{ flex: '1 1 33%', minWidth: 260, border: '1px solid #ccc', borderRadius: '4px', p: 1 }}>
          <FacilitiesTreeView onSelect={setSelectedItemId} />
        </Paper>
        <Paper sx={{ flex: '1 1 67%', border: '1px solid #ccc', borderRadius: '4px', p: 1, minHeight: 352 }}>
          <FacilityDetail
            selectedItemId={selectedItemId}
            isEditing={isEditing}
            saveTick={saveTick}
            cancelTick={cancelTick}
            onSaved={exitEdit}
          />
        </Paper>
      </Box>
    </Box>
  );
}
