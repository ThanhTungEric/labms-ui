import React, { useCallback, useEffect, useState } from 'react';
import {
  Box, IconButton, Button, Paper,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import MoreActionsMenu, { MoreActionItem } from '../../../components/MoreActionsMenu';
import ExportReportButton from '../../../components/ExportReportButton';
import SaveButton from '../../../components/SaveButton';
import CancelButton from '../../../components/CancelButton';
import ResetButton from '../../../components/ResetButton';
import FacilitiesTreeView from '../../../module/setup/components/facilities/FacilitiesTreeView';
import FacilityDetail from '../../../module/setup/components/facilities/FacilityDetail';
import useFacilityTree from '../../../module/setup/data/facilitiesData';

const moreActionItems: MoreActionItem[] = [
  { key: 'action1', label: 'Action 1' },
  { key: 'action2', label: 'Action 2' },
  { key: 'action3', label: 'Action 3' },
];

export default function FacilitiesMaster() {
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  const [saveTick, setSaveTick] = useState(0);
  const [cancelTick, setCancelTick] = useState(0);

  const { items, loading, error, reload } = useFacilityTree();

  const exitEdit = useCallback(() => setIsEditing(false), []);
  const exitAdd = useCallback(() => setIsAdding(false), []);
  useEffect(() => {
    setIsEditing(false);
    setIsAdding(false);
  }, [selectedItemId]);

  const handleMoreActionClick = (key: string) => console.log(`More action "${key}" clicked`);
  const handleExportReport = useCallback(() => console.log('Export Report clicked'), []);
  const handleResetFilters = useCallback(() => console.log('Filters reset'), []);
  const handleDelete = useCallback(() => {
    if (selectedItemId) console.log('Delete clicked for item:', selectedItemId);
  }, [selectedItemId]);
  const handleAdd = useCallback(() => {
    setIsAdding(true);
  }, []);

  const handleSaved = useCallback(() => {
    exitEdit();
    exitAdd();
    reload();
  }, [exitEdit, exitAdd, reload]);

  const canAdd = selectedItemId && (selectedItemId.startsWith('b-') || selectedItemId.startsWith('f-'));

  return (
    <Box p={2}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1.5, flexWrap: 'wrap' }}>
        <MoreActionsMenu items={moreActionItems} onActionClick={handleMoreActionClick} />

        {!isEditing && !isAdding && (
          <IconButton size="small" onClick={handleAdd} disabled={!canAdd}>
            <AddIcon />
          </IconButton>
        )}

        {!isEditing && !isAdding && (
          <IconButton size="small" onClick={() => selectedItemId && setIsEditing(true)} disabled={!selectedItemId}>
            <EditIcon />
          </IconButton>
        )}
        {!isEditing && !isAdding && (
          <IconButton size="small" color="error" onClick={handleDelete} disabled={!selectedItemId}>
            <DeleteIcon />
          </IconButton>
        )}

        {(isEditing || isAdding) && (
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
              onClick={() => { setCancelTick(t => t + 1); isEditing ? exitEdit() : exitAdd(); }}
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
          <FacilitiesTreeView
            items={items}
            loading={loading}
            error={error}
            onSelect={setSelectedItemId}
          />
        </Paper>

        <Paper sx={{ flex: '1 1 67%', border: '1px solid #ccc', borderRadius: '4px', p: 1, minHeight: 352 }}>
          <FacilityDetail
            selectedItemId={selectedItemId}
            isEditing={isEditing}
            isAdding={isAdding}
            saveTick={saveTick}
            cancelTick={cancelTick}
            onSaved={handleSaved}
          />
        </Paper>
      </Box>
    </Box>
  );
}
