// src/module/site/room/RoomsTable.tsx
import React from 'react';
import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    Paper, TableSortLabel, TableFooter, TablePagination
} from '@mui/material';
import NameWithIdChip from '../../../components/NameWithIdChip';

export interface RoomRow {
    id: number;
    name: string;
    description: string;
    notes: string;
    // floor: string;
    // building: string;
    floor: {
        id: number;
        level: string;
        description: string;
    };
    building: {
        id: number;
        name: string;
        description: string;
    };
}

type Order = 'asc' | 'desc';

interface RoomsTableProps {
    rows: RoomRow[];
    selectedItemId: number | null;
    setSelectedItemId: (id: number | null) => void;

    order: Order;
    orderBy: keyof Pick<RoomRow, 'id' | 'name' | 'description' | 'notes'>;
    onRequestSort: (field: RoomsTableProps['orderBy']) => void;

    page: number;
    pageSize: number;
    total: number;
    onPageChange: (page: number) => void;
    onPageSizeChange: (size: number) => void;
}

const RoomsTable: React.FC<RoomsTableProps> = ({
    rows, selectedItemId, setSelectedItemId,
    order, orderBy, onRequestSort,
    page, pageSize, total, onPageChange, onPageSizeChange,
}) => {
    const createSortHandler = (field: RoomsTableProps['orderBy']) => () => onRequestSort(field);

    const totalPages = Math.max(1, Math.ceil(total / pageSize));

    return (
        <Paper elevation={3} sx={{ borderRadius: 2 }}>
            <TableContainer>
                <Table sx={{ minWidth: 800 }} aria-label="rooms table" size="small">
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
                                    Name
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

                            <TableCell sx={{ fontWeight: 'bold' }}>
                                <TableSortLabel
                                    active={orderBy === 'notes'}
                                    direction={orderBy === 'notes' ? order : 'asc'}
                                    onClick={createSortHandler('notes')}
                                >
                                    Notes
                                </TableSortLabel>
                            </TableCell>

                            <TableCell sx={{ fontWeight: 'bold' }}>
                                Floor
                            </TableCell>

                            <TableCell sx={{ fontWeight: 'bold' }}>
                                Building
                            </TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {rows.map((room) => (
                            <TableRow
                                key={room.id}
                                onClick={() => setSelectedItemId(room.id)}
                                selected={room.id === selectedItemId}
                                hover
                                sx={{ cursor: 'pointer', height: '40px' }}
                            >
                                <TableCell>
                                    <NameWithIdChip id={room.id} />
                                </TableCell>
                                <TableCell>{room.name}</TableCell>
                                <TableCell>{room.description}</TableCell>
                                <TableCell>{room.notes}</TableCell>
                                <TableCell>
                                    {room.floor.level}
                                </TableCell>
                                <TableCell>
                                    {room.building.description}
                                </TableCell>
                            </TableRow>
                        ))}

                        {rows.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={6} align="center" sx={{ py: 4, color: 'text.secondary' }}>
                                    No rooms found.
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
                                labelDisplayedRows={({ from, to, count }) =>
                                    `${from}-${to} of ${count} (page ${page}/${totalPages})`}
                            />
                        </TableRow>
                    </TableFooter>
                </Table>
            </TableContainer>
        </Paper>
    );
};

export default RoomsTable;
