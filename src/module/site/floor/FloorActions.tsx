// src/module/site/lab/LabActions.tsx
import React from 'react';
import { Box, IconButton, TextField, InputAdornment, Typography, Stack } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';

import MoreActionsMenu, { MoreActionItem } from '../../../components/MoreActionsMenu';
import ExportReportButton from '../../../components/ExportReportButton';

interface FloorActionsProps {
    selectedItemId: number | null;
    canAdd: boolean;
    moreActionItems: MoreActionItem[];
    onAdd: () => void;
    onEdit: () => void;
    onDelete: () => void;
    onExportReport: () => void;
    onMoreActionClick: (key: string) => void;

    searchValue: string;
    onSearchChange: (v: string) => void;
}

const FloorActions: React.FC<FloorActionsProps> = ({
    selectedItemId,
    canAdd,
    moreActionItems,
    onAdd,
    onEdit,
    onDelete,
    onExportReport,
    onMoreActionClick,
    searchValue,
    onSearchChange,
}) => {
    return (
        <Stack spacing={1.5} sx={{ mb: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flexWrap: 'wrap' }}>
                <MoreActionsMenu items={moreActionItems} onActionClick={onMoreActionClick} />

                <IconButton size="small" onClick={onAdd} disabled={!canAdd}>
                    <AddIcon />
                </IconButton>
                <IconButton size="small" onClick={onEdit} disabled={selectedItemId == null}>
                    <EditIcon />
                </IconButton>
                <IconButton size="small" color="error" onClick={onDelete} disabled={selectedItemId == null}>
                    <DeleteIcon />
                </IconButton>

                <ExportReportButton onClick={onExportReport} />
                <TextField
                    size="small"
                    placeholder="Search by lab code/name…"
                    value={searchValue}
                    onChange={(e) => onSearchChange(e.target.value)}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon fontSize="small" />
                            </InputAdornment>
                        ),
                        endAdornment: searchValue ? (
                            <InputAdornment position="end">
                                <IconButton size="small" onClick={() => onSearchChange('')}>
                                    <ClearIcon fontSize="small" />
                                </IconButton>
                            </InputAdornment>
                        ) : undefined,
                    }}
                    sx={{ ml: 'auto', minWidth: 280 }}
                />
            </Box>
        </Stack>
    );
};

export default FloorActions;
