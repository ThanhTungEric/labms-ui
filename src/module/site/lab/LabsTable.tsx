// src/components/LabsTable.tsx
import React from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Typography,
} from '@mui/material';
import NameWithIdChip from '../../../components/NameWithIdChip';

// ---- Types (match your API shapes) ----
interface LabStatusDto {
    id: number;
    name: string;
}

interface LabRow {
    id: number;
    name: string;
    area: number | null;
    layout: string | null;
    condition: string[] | null;
    status: LabStatusDto;
}

// ---- Props interface for the new component ----
interface LabsTableProps {
    rows: LabRow[];
    selectedItemId: number | null;
    setSelectedItemId: (id: number | null) => void;
}

// ---- Helpers ----
const formatCondition = (condition?: string[] | null): string =>
    condition && condition.length > 0 ? condition.join(', ') : '-';

const statusColor = (name: string): string => {
    if (name === 'ACTIVE') return 'success.main';
    if (name === 'INACTIVE') return 'error.main';
    return 'warning.main';
};

const LabsTable: React.FC<LabsTableProps> = ({
    rows,
    selectedItemId,
    setSelectedItemId,
}) => {
    return (
        <TableContainer component={Paper} elevation={3} sx={{ borderRadius: 2 }}>
            <Table sx={{ minWidth: 900 }} aria-label="lab table" size="small">
                <TableHead>
                    <TableRow>
                        <TableCell sx={{ fontWeight: 'bold' }}>ID</TableCell>
                        <TableCell sx={{ fontWeight: 'bold' }}>Lab Name</TableCell>
                        <TableCell align="right" sx={{ fontWeight: 'bold' }}>Area</TableCell>
                        <TableCell sx={{ fontWeight: 'bold' }}>Layout</TableCell>
                        <TableCell sx={{ fontWeight: 'bold' }}>Condition</TableCell>
                        <TableCell align="right" sx={{ fontWeight: 'bold' }}>Status</TableCell>
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
            </Table>
        </TableContainer>
    );
};

export default LabsTable;