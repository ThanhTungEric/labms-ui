import React from 'react';
import {
  Table, TableHead, TableBody, TableRow, TableCell,
  TableContainer, Paper, Button, Typography
} from '@mui/material';
import { ProcedureSection, Procedure } from './types';
import ProcedureRow from './ProcedureRow';

interface Column {
  key: string;
  label: string;
}

const getColumnsByTitle = (title: string): Column[] => {
  switch (title) {
    case 'Equipment borrow':
      return [
        { key: 'effectiveDate', label: 'Borrow Date' },
        { key: 'name', label: 'Equipment Name' },
        { key: 'departmentOwner', label: 'Requested By' },
        { key: 'linkedPolicies', label: 'Borrowing Policy' },
        { key: 'owner', label: 'Responsible Person' },
        { key: 'status', label: 'Status' },
      ];
    case 'Booking lab':
      return [
        { key: 'effectiveDate', label: 'Booking Date' },
        { key: 'name', label: 'Lab Name' },
        { key: 'departmentOwner', label: 'Requested By' },
        { key: 'linkedPolicies', label: 'Lab Safety Policy' },
        { key: 'owner', label: 'Lab Manager' },
        { key: 'status', label: 'Status' },
      ];
    default:
      return [
        { key: 'effectiveDate', label: 'Effective Date' },
        { key: 'name', label: 'Procedure Name' },
        { key: 'departmentOwner', label: 'Department Owner' },
        { key: 'linkedPolicies', label: 'Linked Policies' },
        { key: 'owner', label: 'Owner' },
        { key: 'status', label: 'Status' },
      ];
  }
};

const ProcedureTable: React.FC<ProcedureSection> = ({ title, procedures }) => {
  const columns = getColumnsByTitle(title);
  const newProcedurePlaceholder: Procedure = {
    id: 0,
    version: 0,
    effectiveDate: '',
    name: '',
    departmentOwner: '',
    linkedPolicies: '',
    owner: { initials: '', name: '', color: '' },
    status: 'Unlock',
  };

  return (
    <TableContainer component={Paper} sx={{ mb: 4, borderRadius: 2, boxShadow: 2 }}>
      <Typography
        variant="h6"
        sx={{
          px: 2,
          backgroundColor: '#f5f5f5',
          borderBottom: '1px solid #ddd',
          fontWeight: 600,
        }}
      >
        {title}
      </Typography>

      <Table>
        <TableHead>
          <TableRow sx={{ backgroundColor: '#fafafa' }}>
            <TableCell sx={{ fontWeight: 'bold' }}>#</TableCell>
            {columns.map((col) => (
              <TableCell key={col.key} sx={{ fontWeight: 'bold' }}>
                {col.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>

        <TableBody>
          <ProcedureRow procedure={newProcedurePlaceholder} isNewRow={true} />
          {procedures.map((proc, index) => (
            <ProcedureRow key={proc.id} procedure={proc} index={index + 1} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ProcedureTable;
