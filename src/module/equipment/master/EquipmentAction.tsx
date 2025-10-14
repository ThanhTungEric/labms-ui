import React from 'react';
import { Box, IconButton, Stack } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { CustomButton, MoreActionsMenu, ExportReportButton, LabSearch } from '@/components';

import type { EquipmentActionsProps } from './types/EquipmentActions.types';

const EquipmentActions: React.FC<EquipmentActionsProps> = ({
    selectedItemId,
    canAdd,
    moreActionItems,
    onAdd,
    onEdit,
    onDelete,
    onExportReport,
    onMoreActionClick,
    onColumnClick,
    searchValue,
    onSearchChange,
    
}) => {
    return (
        <Stack spacing={1.5} sx={{ mb: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flexWrap: 'wrap' }}>
                <CustomButton onClick={onColumnClick}>Columns</CustomButton>

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

                <LabSearch searchValue={searchValue} onSearchChange={onSearchChange} />
            </Box>
        </Stack>
    );
};

export default EquipmentActions;