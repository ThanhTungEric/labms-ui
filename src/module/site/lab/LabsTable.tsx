// src/module/site/lab/LabsTable.tsx
import React from 'react';
import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    Paper, Typography, TableSortLabel, TableFooter, TablePagination, Box
} from '@mui/material';
import NameWithIdChip from '../../../components/NameWithIdChip';

interface LabStatusDto { id: number; name: string; }
export interface LabRow {
    id: number;
    name: string;
    area: number | null;
    layout: string | null;
    condition: string[] | null;
    status: LabStatusDto;
}

type Order = 'asc' | 'desc';

interface LabsTableProps {
    rows: LabRow[];
    selectedItemId: number | null;
    setSelectedItemId: (id: number | null) => void;

    order: Order;
    orderBy: keyof Pick<LabRow, 'id' | 'name' | 'area' | 'layout' | 'condition'>;
    onRequestSort: (field: LabsTableProps['orderBy']) => void;

    page: number;
    pageSize: number;
    total: number;
    onPageChange: (page: number) => void;
    onPageSizeChange: (size: number) => void;
}

const formatCondition = (condition?: string[] | null): string =>
    condition && condition.length > 0 ? condition.join(', ') : '-';

const statusColor = (name: string): string => {
    if (name === 'ACTIVE') return 'success.main';
    if (name === 'INACTIVE') return 'error.main';
    return 'warning.main';
};

const LabsTable: React.FC<LabsTableProps> = ({
    rows, selectedItemId, setSelectedItemId,
    order, orderBy, onRequestSort,
    page, pageSize, total, onPageChange, onPageSizeChange,
}) => {
    const createSortHandler = (field: LabsTableProps['orderBy']) => () => onRequestSort(field);

    const totalPages = Math.max(1, Math.ceil(total / pageSize));

    return (
        <Paper elevation={3} sx={{ borderRadius: 2 }}>
            <TableContainer>
                <Table sx={{ minWidth: 900 }} aria-label="lab table" size="small">
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
                                    active={orderBy === 'name'}
                                    direction={orderBy === 'name' ? order : 'asc'}
                                    onClick={createSortHandler('name')}
                                >
                                    Lab Name
                                </TableSortLabel>
                            </TableCell>

                            <TableCell align="right" sx={{ fontWeight: 'bold' }}>
                                <TableSortLabel
                                    active={orderBy === 'area'}
                                    direction={orderBy === 'area' ? order : 'asc'}
                                    onClick={createSortHandler('area')}
                                >
                                    Area
                                </TableSortLabel>
                            </TableCell>

                            <TableCell sx={{ fontWeight: 'bold' }}>
                                <TableSortLabel
                                    active={orderBy === 'layout'}
                                    direction={orderBy === 'layout' ? order : 'asc'}
                                    onClick={createSortHandler('layout')}
                                >
                                    Layout
                                </TableSortLabel>
                            </TableCell>

                            <TableCell sx={{ fontWeight: 'bold' }}>
                                <TableSortLabel
                                    active={orderBy === 'condition'}
                                    direction={orderBy === 'condition' ? order : 'asc'}
                                    onClick={createSortHandler('condition')}
                                >
                                    Condition
                                </TableSortLabel>
                            </TableCell>

                            <TableCell align="right" sx={{ fontWeight: 'bold' }}>
                                Status
                            </TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {rows.map((lab) => (
                            <TableRow
                                key={lab.id}
                                onClick={() => setSelectedItemId(lab.id)}
                                selected={lab.id === selectedItemId}
                                hover
                                sx={{ cursor: 'pointer', height: '40px' }}
                            >
                                <TableCell>
                                    <NameWithIdChip id={lab.id} />
                                </TableCell>
                                <TableCell>{lab.name}</TableCell>
                                <TableCell align="right">{lab.area ?? '-'}</TableCell>
                                <TableCell>{lab.layout ?? '-'}</TableCell>
                                <TableCell>{formatCondition(lab.condition)}</TableCell>
                                <TableCell align="right">
                                    <Typography sx={{ color: statusColor(lab.status.name), fontWeight: 'bold' }}>
                                        {lab.status.name}
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        ))}
                        {rows.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={6} align="center" sx={{ py: 4, color: 'text.secondary' }}>
                                    No labs found.
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

export default LabsTable;
