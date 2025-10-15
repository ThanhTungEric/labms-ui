import React from 'react';
import {
  TablePagination,
  IconButton,
  Box,
} from '@mui/material';
import {
  FirstPage as FirstPageIcon,
  LastPage as LastPageIcon,
  KeyboardArrowLeft,
  KeyboardArrowRight,
} from '@mui/icons-material';

interface PaginationActionsProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (event: React.MouseEvent<HTMLButtonElement>, newPage: number) => void;
}

function TablePaginationActions({
  count,
  page,
  rowsPerPage,
  onPageChange,
}: PaginationActionsProps) {
  const handleFirstPage = (event: React.MouseEvent<HTMLButtonElement>) => onPageChange(event, 0);
  const handleBack = (event: React.MouseEvent<HTMLButtonElement>) => onPageChange(event, page - 1);
  const handleNext = (event: React.MouseEvent<HTMLButtonElement>) => onPageChange(event, page + 1);
  const handleLastPage = (event: React.MouseEvent<HTMLButtonElement>) =>
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));

  return (
    <Box sx={{ flexShrink: 0, display: 'flex', alignItems: 'center' }}>
      <IconButton onClick={handleFirstPage} disabled={page === 0}>
        <FirstPageIcon fontSize="small" />
      </IconButton>
      <IconButton onClick={handleBack} disabled={page === 0}>
        <KeyboardArrowLeft fontSize="small" />
      </IconButton>
      <IconButton
        onClick={handleNext}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
      >
        <KeyboardArrowRight fontSize="small" />
      </IconButton>
      <IconButton
        onClick={handleLastPage}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
      >
        <LastPageIcon fontSize="small" />
      </IconButton>
    </Box>
  );
}

interface CustomPaginationProps {
  count?: number; // optional, có default
  page: number;
  rowsPerPage: number;
  setPage: (page: number) => void;
  setRowsPerPage: (rows: number) => void;
}

export default function CustomTablePagination({
  count = 0,
  page,
  rowsPerPage,
  setPage,
  setRowsPerPage,
}: CustomPaginationProps) {
  const safeCount = typeof count === 'number' ? count : 0;

  return (
    <TablePagination
      component="div"
      count={safeCount}
      page={page}
      onPageChange={(_, newPage) => setPage(newPage)}
      rowsPerPage={rowsPerPage}
      onRowsPerPageChange={(e) => {
        setRowsPerPage(parseInt(e.target.value, 10));
        setPage(0);
      }}
      rowsPerPageOptions={[25, 50, 100]}
      labelDisplayedRows={({ from, to }) =>
        `${from}-${to} of ${safeCount.toLocaleString()}`
      }
      ActionsComponent={TablePaginationActions}
      sx={{
        '& .MuiTablePagination-displayedRows': {
          marginLeft: '8px',
          marginRight: '8px',
        },
        '& .MuiTablePagination-select': {
          borderRadius: '6px',
          border: '1px solid #ccc',
          height: '26px',
          paddingLeft: '6px',
          paddingRight: '24px',
        },
        '& .MuiTablePagination-selectIcon': {
          right: '4px',
        },
      }}
    />
  );
}
