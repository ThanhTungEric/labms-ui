import React from 'react';
import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    Paper, TableSortLabel, TableFooter, TablePagination
} from '@mui/material';
import NameWithIdChip from '@/components/NameWithIdChip';
import { EquipmentItem, Order } from '@/services/types';
import { formatDate } from '@/utils';

export type EquipmentItemRow = EquipmentItem;

interface EquipmentItemTableProps {
    rows: EquipmentItemRow[];
    selectedItemId: number | null;
    setSelectedItemId: (id: number | null) => void;
    order: Order;
    orderBy: keyof Pick<EquipmentItemRow, 'id' | 'serialNumber' | 'purchaseDate' | 'warrantyExpiration'>;
    onRequestSort: (field: EquipmentItemTableProps['orderBy']) => void;
    page: number;
    pageSize: number;
    total: number;
    onPageChange: (page: number) => void;
    onPageSizeChange: (size: number) => void;
    columnsVisible: Record<keyof Pick<EquipmentItemRow,
        'id' | 'serialNumber' | 'status' | 'base' | 'lab' | 'purchaseDate' | 'warrantyExpiration'>, boolean>;
}

const EquipmentItemTable: React.FC<EquipmentItemTableProps> = ({
    rows, selectedItemId, setSelectedItemId,
    order, orderBy, onRequestSort,
    page, pageSize, total, onPageChange, onPageSizeChange,
    columnsVisible
}) => {
    const createSortHandler = (field: EquipmentItemTableProps['orderBy']) => () => onRequestSort(field);
    const totalPages = Math.max(1, Math.ceil(total / pageSize));

    const safeFormatDate = (dateString: string) => {
        try {
            return formatDate(dateString);
        } catch (e) {
            return '-';
        }
    };

    return (
        <Paper elevation={3} sx={{ borderRadius: 2 }}>
            <TableContainer>
                <Table sx={{ minWidth: 900 }} aria-label="equipment item table" size="small">
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
                            {columnsVisible.serialNumber && (
                                <TableCell sx={{ fontWeight: 'bold' }}>
                                    <TableSortLabel
                                        active={orderBy === 'serialNumber'}
                                        direction={orderBy === 'serialNumber' ? order : 'asc'}
                                        onClick={createSortHandler('serialNumber')}
                                    >
                                        Serial Number
                                    </TableSortLabel>
                                </TableCell>
                            )}
                            {columnsVisible.status && <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>}
                            {columnsVisible.base && <TableCell sx={{ fontWeight: 'bold' }}>Base Equipment</TableCell>}
                            {columnsVisible.lab && <TableCell sx={{ fontWeight: 'bold' }}>Lab</TableCell>}
                            {columnsVisible.purchaseDate && (
                                <TableCell sx={{ fontWeight: 'bold' }}>
                                    <TableSortLabel
                                        active={orderBy === 'purchaseDate'}
                                        direction={orderBy === 'purchaseDate' ? order : 'asc'}
                                        onClick={createSortHandler('purchaseDate')}
                                    >
                                        Purchase Date
                                    </TableSortLabel>
                                </TableCell>
                            )}
                            {columnsVisible.warrantyExpiration && (
                                <TableCell sx={{ fontWeight: 'bold' }}>
                                    <TableSortLabel
                                        active={orderBy === 'warrantyExpiration'}
                                        direction={orderBy === 'warrantyExpiration' ? order : 'asc'}
                                        onClick={createSortHandler('warrantyExpiration')}
                                    >
                                        Warranty Expiration
                                    </TableSortLabel>
                                </TableCell>
                            )}
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {rows.map(row => (
                            <TableRow
                                key={row.id}
                                hover
                                selected={row.id === selectedItemId}
                                onClick={() => setSelectedItemId(row.id)}
                                sx={{ cursor: 'pointer', height: '40px' }}
                            >
                                {columnsVisible.id && (
                                    <TableCell>
                                        <NameWithIdChip id={row.id} />
                                    </TableCell>
                                )}
                                {columnsVisible.serialNumber && <TableCell>{row.serialNumber}</TableCell>}
                                {columnsVisible.status && <TableCell>{row.status?.description ?? '-'}</TableCell>}
                                {columnsVisible.base && <TableCell>{row.base?.name ?? '-'}</TableCell>}
                                {columnsVisible.lab && <TableCell>{row.lab?.code ?? '-'}</TableCell>}
                                {columnsVisible.purchaseDate && <TableCell>{safeFormatDate(row.purchaseDate)}</TableCell>}
                                {columnsVisible.warrantyExpiration && <TableCell>{safeFormatDate(row.warrantyExpiration)}</TableCell>}
                            </TableRow>
                        ))}

                        {rows.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={8} align="center" sx={{ py: 4, color: 'text.secondary' }}>
                                    No equipment items found.
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
                            />
                        </TableRow>
                    </TableFooter>
                </Table>
            </TableContainer>
        </Paper>
    );
};

export default EquipmentItemTable;
