// src/module/site/lab/LabsTable.tsx
import React from 'react';
import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    Paper, Typography, TableSortLabel, TableFooter, TablePagination
} from '@mui/material';
import NameWithIdChip from '../../../components/NameWithIdChip';

export interface FloorRow {
    id: number;
    level: string;
    description: string;
}

type Order = 'asc' | 'desc';

interface FloorsTableProps {
    rows: FloorRow[];
    selectedItemId: number | null;
    setSelectedItemId: (id: number | null) => void;

    order: Order;
    orderBy: keyof Pick<FloorRow, 'id' | 'level' | 'description'>;
    onRequestSort: (field: FloorsTableProps['orderBy']) => void;

    page: number;
    pageSize: number;
    total: number;
    onPageChange: (page: number) => void;
    onPageSizeChange: (size: number) => void;
}

const FloorsTable: React.FC<FloorsTableProps> = ({
    rows, selectedItemId, setSelectedItemId,
    order, orderBy, onRequestSort,
    page, pageSize, total, onPageChange, onPageSizeChange,
}) => {
    const createSortHandler = (field: FloorsTableProps['orderBy']) => () => onRequestSort(field);

    const totalPages = Math.max(1, Math.ceil(total / pageSize));

    return (
        <Paper elevation={3} sx={{ borderRadius: 2 }}>
            <TableContainer>
                <Table sx={{ minWidth: 600 }} aria-label="floor table" size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ fontWeight: 'bold' }}>
                                <TableSortLabel
                                    active={orderBy === 'id'}
                                    direction={orderBy === 'id' ? order : 'asc'}
                                    onClick={createSortHandler('id')}
                                >
                                    ID
                                </TableSortLabel>
                            </TableCell>

                            <TableCell sx={{ fontWeight: 'bold' }}>
                                <TableSortLabel
                                    active={orderBy === 'level'}
                                    direction={orderBy === 'level' ? order : 'asc'}
                                    onClick={createSortHandler('level')}
                                >
                                    Level
                                </TableSortLabel>
                            </TableCell>

                            <TableCell sx={{ fontWeight: 'bold' }}>
                                <TableSortLabel
                                    active={orderBy === 'description'}
                                    direction={orderBy === 'description' ? order : 'asc'}
                                    onClick={createSortHandler('description')}
                                >
                                    Description
                                </TableSortLabel>
                            </TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {rows.map((floor) => (
                            <TableRow
                                key={floor.id}
                                onClick={() => setSelectedItemId(floor.id)}
                                selected={floor.id === selectedItemId}
                                hover
                                sx={{ cursor: 'pointer', height: '40px' }}
                            >
                                <TableCell>
                                    <NameWithIdChip id={floor.id} />
                                </TableCell>
                                <TableCell>{floor.level}</TableCell>
                                <TableCell>{floor.description}</TableCell>
                            </TableRow>
                        ))}

                        {rows.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={3} align="center" sx={{ py: 4, color: 'text.secondary' }}>
                                    No floors found.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>

                    <TableFooter>
                        <TableRow>
                            <TablePagination
                                count={total}
                                page={page - 1}
                                onPageChange={(_, newPage) => onPageChange(newPage + 1)}
                                rowsPerPage={pageSize}
                                onRowsPerPageChange={(e) => onPageSizeChange(parseInt(e.target.value, 10))}
                                rowsPerPageOptions={[10, 20, 50]}
                                labelRowsPerPage="Rows per page:"
                                labelDisplayedRows={({ from, to, count }) => `${from}-${to} of ${count} (page ${page}/${totalPages})`}
                            />
                        </TableRow>
                    </TableFooter>
                </Table>
            </TableContainer>
        </Paper>
    );
};

export default FloorsTable;
