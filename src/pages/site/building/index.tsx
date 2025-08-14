import React, { useCallback, useMemo } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Typography,
  IconButton,
  Tooltip,
  LinearProgress,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import { useBuildings } from '../../../services/hooks';
import { Building } from '../../../services/types';
import ActionButtons from '../../../components/ActionButtons';

export default function BuildingTable() {
  const { buildings, loading, error } = useBuildings();

  const reducedPadding = { padding: '4px 16px' };

  const handleExport = useCallback(() => {
    console.log('[BuildingTable] Export all buildings, count =', buildings?.length ?? 0);
    // TODO: implement export
  }, [buildings]);

  const handleCreate = useCallback(() => {
    console.log('[BuildingTable] Create new building');
    // TODO: open create dialog / navigate
  }, []);

  const handleEdit = useCallback((building: Building) => {
    console.log('[BuildingTable] Edit:', building.id, building.code);
    // TODO: open edit dialog / navigate
  }, []);

  const handleDelete = useCallback((building: Building) => {
    console.log('[BuildingTable] Delete:', building.id, building.code);
    // TODO: confirm & call delete API
  }, []);

  // Đảm bảo luôn là mảng (tránh undefined/null)
  const rows = useMemo<Building[]>(() => Array.isArray(buildings) ? buildings : [], [buildings]);

  return (
    <Box p={2}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 2,
        }}
      >
        <Typography variant="h6">Building List</Typography>
        <ActionButtons onExport={handleExport} onCreate={handleCreate} />
      </Box>

      {/* Loading bar gọn gàng ở top */}
      {loading && <LinearProgress sx={{ mb: 2 }} />}

      {/* Lỗi */}
      {error && (
        <Typography color="error" sx={{ mb: 2 }}>
          Error: {error.message}
        </Typography>
      )}

      {/* Empty state */}
      {!loading && !error && rows.length === 0 && (
        <Paper sx={{ p: 3 }}>
          <Typography variant="body2" color="text.secondary">
            No buildings found.
          </Typography>
        </Paper>
      )}

      {/* Bảng dữ liệu */}
      {!loading && !error && rows.length > 0 && (
        <TableContainer component={Paper}>
          <Table size="small" aria-label="building table">
            <TableHead>
              <TableRow>
                <TableCell sx={reducedPadding}>
                  <strong>ID</strong>
                </TableCell>
                <TableCell sx={reducedPadding}>
                  <strong>Code</strong>
                </TableCell>
                <TableCell sx={reducedPadding}>
                  <strong>Description</strong>
                </TableCell>
                <TableCell sx={reducedPadding} align="right">
                  <strong>Actions</strong>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((b) => (
                <TableRow key={String(b.id)}>
                  <TableCell sx={reducedPadding}>{b.id}</TableCell>
                  <TableCell sx={reducedPadding}>{b.code}</TableCell>
                  <TableCell sx={reducedPadding}>{b.description}</TableCell>
                  <TableCell sx={reducedPadding} align="right">
                    <Tooltip title="Edit">
                      <IconButton
                        size="small"
                        onClick={() => handleEdit(b)}
                        aria-label={`Edit ${b.code}`}
                      >
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton
                        size="small"
                        color="error"
                        onClick={() => handleDelete(b)}
                        aria-label={`Delete ${b.code}`}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
}
