import React from 'react';
import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    Paper, Typography, TableSortLabel, TableFooter, TablePagination, Box
} from '@mui/material';
import NameWithIdChip from '../../../components/NameWithIdChip';


interface CategoryOrDomain {
    id: number;
    label: string;
    description: string;
}

interface Form {
    id: number;
    name: string;
    description: string;
}

export interface EquipmentRow {
    id: number;
    code: string;
    name: string;
    manufacturer: string;
    photo: string;
    manual: string;
    price: number;
    priceCategory: string;
    modelCode: string;
    components: string[];
    specifications: string[];
    form: Form;
    categories: CategoryOrDomain[];
    domains: CategoryOrDomain[];
}

type Order = 'asc' | 'desc';

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
}


const formatLabels = (items?: CategoryOrDomain[] | null): string =>
    items && items.length > 0 ? items.map(item => item.label).join(', ') : '-';

const EquipmentTable: React.FC<EquipmentTableProps> = ({
    rows, selectedItemId, setSelectedItemId,
    order, orderBy, onRequestSort,
    page, pageSize, total, onPageChange, onPageSizeChange,
}) => {
    const createSortHandler = (field: EquipmentTableProps['orderBy']) => () => onRequestSort(field);

    const totalPages = Math.max(1, Math.ceil(total / pageSize));

    return (
        <Paper elevation={3} sx={{ borderRadius: 2 }}>
            <TableContainer>
                <Table sx={{ minWidth: 900 }} aria-label="equipment table" size="small">
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
                                    active={orderBy === 'code'}
                                    direction={orderBy === 'code' ? order : 'asc'}
                                    onClick={createSortHandler('code')}
                                >
                                    Code
                                </TableSortLabel>
                            </TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>
                                <TableSortLabel
                                    active={orderBy === 'name'}
                                    direction={orderBy === 'name' ? order : 'asc'}
                                    onClick={createSortHandler('name')}
                                >
                                    Name
                                </TableSortLabel>
                            </TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>
                                <TableSortLabel
                                    active={orderBy === 'manufacturer'}
                                    direction={orderBy === 'manufacturer' ? order : 'asc'}
                                    onClick={createSortHandler('manufacturer')}
                                >
                                    Manufacturer
                                </TableSortLabel>
                            </TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Form</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Categories</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Domains</TableCell>
                            <TableCell align="right" sx={{ fontWeight: 'bold' }}>
                                <TableSortLabel
                                    active={orderBy === 'price'}
                                    direction={orderBy === 'price' ? order : 'asc'}
                                    onClick={createSortHandler('price')}
                                >
                                    Price
                                </TableSortLabel>
                            </TableCell>
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
                                <TableCell>
                                    <NameWithIdChip id={row.id} />
                                </TableCell>
                                <TableCell>{row.code}</TableCell>
                                <TableCell>{row.name}</TableCell>
                                <TableCell>{row.manufacturer}</TableCell>
                                <TableCell>{row.form?.name ?? '-'}</TableCell>
                                <TableCell>{formatLabels(row.categories)}</TableCell>
                                <TableCell>{formatLabels(row.domains)}</TableCell>
                                <TableCell align="right">{row.price.toLocaleString()}</TableCell>
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