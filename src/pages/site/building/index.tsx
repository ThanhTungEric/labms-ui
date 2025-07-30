import React from 'react';
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
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import { useBuildings } from '../../../services/hooks';
import { Building } from '../../../services/types';
import ActionButtons from '../../../components/ActionButtons';

export default function BuildingTable() {
  const { buildings, loading, error } = useBuildings();

  const reducedPadding = {
    padding: '4px 16px',
  };

  const handleExport = () => {
    console.log('Exporting all buildings...');
  };

  const handleCreate = () => {
    console.log('Creating a new building...');
  };

  const handleEdit = (building: Building) => {
    console.log('Editing building:', building.name);
  };

  const handleDelete = (building: Building) => {
    console.log('Deleting building:', building.name);
  };

  return (
    <Box p={2}>
      <Box sx={{
          display: 'flex',
          justifyContent: 'space-between', 
          alignItems: 'center',
          marginBottom: 2,
        }}>
        <Typography variant="h6">
          Building List
        </Typography>
        <ActionButtons
          onExport={handleExport}
          onCreate={handleCreate}
        />
      </Box>

      {loading && <Typography>Loading...</Typography>}
      {error && <Typography color="error">Error: {error.message}</Typography>}

      {!loading && buildings && (
        <TableContainer component={Paper}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell sx={reducedPadding}><strong>Description</strong></TableCell>
                <TableCell sx={reducedPadding}><strong>Notes</strong></TableCell>
                <TableCell sx={reducedPadding} align="right"><strong>Actions</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {buildings.map((b: Building, index: number) => (
                <TableRow key={index}>
                  <TableCell sx={reducedPadding}>{b.description}</TableCell>
                  <TableCell sx={reducedPadding}>{b.notes ?? '-'}</TableCell>
                  <TableCell sx={reducedPadding} align="right">
                    <Tooltip title="Edit">
                      <IconButton size="small" onClick={() => handleEdit(b)}>
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton size="small" color="error" onClick={() => handleDelete(b)}>
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