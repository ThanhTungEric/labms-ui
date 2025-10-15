import React from 'react';
import { TableRow, TableCell, Button, Avatar } from '@mui/material';
import { Procedure } from './types';

interface ProcedureRowProps {
  procedure: Procedure;
  isNewRow?: boolean;
  index?: number;
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Approved':
    case 'Approve':
      return '#4caf50';
    case 'Pending':
      return '#ff9800';
    case 'Returned':
      return '#9e9e9e';
    case 'In Use':
      return '#2196f3';
    case 'Publish':
      return '#9c27b0';
    default:
      return '#ccc';
  }
};

const ProcedureRow: React.FC<ProcedureRowProps> = ({ procedure, isNewRow = false, index }) => {
  const { effectiveDate, name, departmentOwner, linkedPolicies, owner, status } = procedure;

  if (isNewRow) {
    return (
      <TableRow sx={{ backgroundColor: '#f3e5f5' }}>
        <TableCell>+</TableCell>
        <TableCell colSpan={6}>
          <input
            type="text"
            placeholder="Add new procedure..."
            style={{
              width: '100%',
              padding: '8px 10px',
              border: '1px dashed #bbb',
              borderRadius: '4px',
              outline: 'none',
            }}
          />
        </TableCell>
      </TableRow>
    );
  }

  return (
    <TableRow hover>
      <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>{index}</TableCell>
      <TableCell>{effectiveDate}</TableCell>
      <TableCell sx={{ fontWeight: 600 }}>{name}</TableCell>
      <TableCell>{departmentOwner}</TableCell>
      <TableCell>{linkedPolicies}</TableCell>
      <TableCell>
        <Avatar
          sx={{
            bgcolor: owner.color || '#ccc',
            width: 28,
            height: 28,
            fontSize: 13,
            display: 'inline-flex',
            mr: 1,
          }}
        >
          {owner.initials}
        </Avatar>
        {owner.name}
      </TableCell>
      <TableCell align="center">
        <Button
          size="small"
          sx={{
            backgroundColor: getStatusColor(status),
            color: 'white',
            fontWeight: 'bold',
            textTransform: 'none',
            px: 2,
            '&:hover': { backgroundColor: getStatusColor(status) },
          }}
        >
          {status}
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default ProcedureRow;
