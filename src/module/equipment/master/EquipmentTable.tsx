import React from 'react';
import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    Paper, Typography, TableSortLabel, TableFooter, TablePagination, Box
} from '@mui/material';
import NameWithIdChip from '../../../components/NameWithIdChip';

import type { EquipmentListItem, EquipmentForm, EquipmentCategory, EquipmentDomain, Order } from '../../../services/types';

import type { EquipmentQuery, EquipmentSort } from '../../../services/types';

export type EquipmentRow = EquipmentListItem;

interface EquipmentTableProps {
    rows: EquipmentRow[];
    selectedItemId: number | null;
    setSelectedItemId: (id: number | null) => void;
    order: Order;
    orderBy: keyof Pick<EquipmentRow, 'id' | 'code' | 'name' | 'manufacturer' | 'price' | 'modelCode'>;
    onRequestSort: (field: EquipmentTableProps['orderBy']) => void;
    page: number;
    pageSize: number;
    total: number;
    onPageChange: (page: number) => void;
    onPageSizeChange: (size: number) => void;

    columnsVisible: Record<keyof Pick<EquipmentRow, 'id' | 'code' | 'name' | 'manufacturer' | 'price' | 'modelCode' | 'form' | 'categories' | 'domains'>, boolean>;
}


const formatLabels = (items?: EquipmentCategory[] | EquipmentDomain[] | null): string =>
    items && items.length > 0 ? items.map(item => item.label).join(', ') : '-';

const EquipmentTable: React.FC<EquipmentTableProps> = ({
    rows, selectedItemId, setSelectedItemId,
    order, orderBy, onRequestSort,
    page, pageSize, total, onPageChange, onPageSizeChange,
    columnsVisible,
}) => {
    const createSortHandler = (field: EquipmentTableProps['orderBy']) => () => onRequestSort(field);

    const totalPages = Math.max(1, Math.ceil(total / pageSize));

    return (
        <Paper elevation={3} sx={{ borderRadius: 2 }}>
            <TableContainer>
                <Table sx={{ minWidth: 900 }} aria-label="equipment table" size="small">
                    <TableHead>
                        <TableRow>
                            {columnsVisible.id && (
                                <TableCell sx={{ fontWeight: 'bold' }}>
                                    <TableSortLabel
                                        active={orderBy === 'id'}
                                        direction={orderBy === 'id' ? order : 'asc'}
                                        onClick={createSortHandler('id')}
                                    >
                                        ID
                                    </TableSortLabel>
                                </TableCell>
                            )}
                            {columnsVisible.code && (
                                <TableCell sx={{ fontWeight: 'bold' }}>
                                    <TableSortLabel
                                        active={orderBy === 'code'}
                                        direction={orderBy === 'code' ? order : 'asc'}
                                        onClick={createSortHandler('code')}
                                    >
                                        Code
                                    </TableSortLabel>
                                </TableCell>
                            )}
                            {columnsVisible.name && (
                                <TableCell sx={{ fontWeight: 'bold' }}>
                                    <TableSortLabel
                                        active={orderBy === 'name'}
                                        direction={orderBy === 'name' ? order : 'asc'}
                                        onClick={createSortHandler('name')}
                                    >
                                        Name
                                    </TableSortLabel>
                                </TableCell>
                            )}
                            {columnsVisible.manufacturer && (
                                <TableCell sx={{ fontWeight: 'bold' }}>
                                    <TableSortLabel
                                        active={orderBy === 'manufacturer'}
                                        direction={orderBy === 'manufacturer' ? order : 'asc'}
                                        onClick={createSortHandler('manufacturer')}
                                    >
                                        Manufacturer
                                    </TableSortLabel>
                                </TableCell>
                            )}
                            {columnsVisible.form && <TableCell sx={{ fontWeight: 'bold' }}>Form</TableCell>}
                            {columnsVisible.categories && <TableCell sx={{ fontWeight: 'bold' }}>Categories</TableCell>}
                            {columnsVisible.domains && <TableCell sx={{ fontWeight: 'bold' }}>Domains</TableCell>}
                            {columnsVisible.price && (
                                <TableCell align="right" sx={{ fontWeight: 'bold' }}>
                                    <TableSortLabel
                                        active={orderBy === 'price'}
                                        direction={orderBy === 'price' ? order : 'asc'}
                                        onClick={createSortHandler('price')}
                                    >
                                        Price
                                    </TableSortLabel>
                                </TableCell>
                            )}
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {rows.map((row) => (
                            <TableRow
                                key={row.id}
                                onClick={() => setSelectedItemId(row.id)}
                                selected={row.id === selectedItemId}
                                hover
                                sx={{ cursor: 'pointer', height: '40px' }}
                            >
                                {columnsVisible.id && (
                                    <TableCell>
                                        <NameWithIdChip id={row.id} />
                                    </TableCell>
                                )}
                                {columnsVisible.code && <TableCell>{row.code}</TableCell>}
                                {columnsVisible.name && <TableCell>{row.name}</TableCell>}
                                {columnsVisible.manufacturer && <TableCell>{row.manufacturer}</TableCell>}
                                {columnsVisible.form && <TableCell>{row.form?.name ?? '-'}</TableCell>}
                                {columnsVisible.categories && <TableCell>{formatLabels(row.categories)}</TableCell>}
                                {columnsVisible.domains && <TableCell>{formatLabels(row.domains)}</TableCell>}
                                {columnsVisible.price && <TableCell align="right">{row.price.toLocaleString()}</TableCell>}
                            </TableRow>
                        ))}
                        {rows.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={8} align="center" sx={{ py: 4, color: 'text.secondary' }}>
                                    No equipment found.
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

export default EquipmentTable;