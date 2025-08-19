// src/pages/LabManagement.tsx
import React, { useState } from 'react';
import {
    Box,
    CircularProgress,
    IconButton,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

// Import the new component
import LabsTable from '../../../module/site/lab/LabsTable';

import MoreActionsMenu, { MoreActionItem } from '../../../components/MoreActionsMenu';
import ExportReportButton from '../../../components/ExportReportButton';
import SaveButton from '../../../components/SaveButton';
import CancelButton from '../../../components/CancelButton';
import ResetButton from '../../../components/ResetButton';

import { useLabs } from '../../../services/hooks';


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

const LabManagement: React.FC = () => {
    const { labs, loading, error, reload } = useLabs();
    const rows = (labs as unknown as LabRow[]) ?? [];

    const [selectedItemId, setSelectedItemId] = useState<number | null>(null);
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [isAdding, setIsAdding] = useState<boolean>(false);
    const [canAdd] = useState<boolean>(true);

    const moreActionItems: MoreActionItem[] = [
    ];

    const handleMoreActionClick = (key: string) => {
        console.log('More action clicked:', key);
        // Handle actions by key
    };

    const handleAdd = () => {
        setIsAdding(true);
        setSelectedItemId(null);
    };

    const handleEdit = (id?: number | null) => {
        if (id == null) return;
        setIsEditing(true);
        setIsAdding(false);
        setSelectedItemId(id);
    };

    const handleDelete = async (id?: number | null) => {
        if (id == null) return;
        try {
            setSelectedItemId(null);
            reload();
        } catch (e) {
            console.error(e);
        }
    };

    const handleSave = () => {
        // TODO: call create/update depending on isAdding / isEditing
        console.log(isAdding ? 'Save (create)...' : 'Save (update)...');
        setIsAdding(false);
        setIsEditing(false);
        reload();
    };

    const handleCancel = () => {
        setIsAdding(false);
        setIsEditing(false);
        setSelectedItemId(null);
    };

    const handleExportReport = () => {
        console.log('Exporting report...');
    };

    const handleResetFilters = () => {
        console.log('Resetting filters...');
    };

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Box sx={{ color: 'error.main', mt: 2 }}>
                Failed to load data: {error.message}
            </Box>
        );
    }

    return (
        <Box>
            {/* Actions Bar */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1.5, flexWrap: 'wrap' }}>
                <MoreActionsMenu items={moreActionItems} onActionClick={handleMoreActionClick} />

                {!isEditing && !isAdding && (
                    <IconButton size="small" onClick={handleAdd} disabled={!canAdd}>
                        <AddIcon />
                    </IconButton>
                )}
                {!isEditing && !isAdding && (
                    <IconButton
                        size="small"
                        onClick={() => handleEdit(selectedItemId)}
                        disabled={selectedItemId == null}
                    >
                        <EditIcon />
                    </IconButton>
                )}
                {!isEditing && !isAdding && (
                    <IconButton
                        size="small"
                        color="error"
                        onClick={() => handleDelete(selectedItemId)}
                        disabled={selectedItemId == null}
                    >
                        <DeleteIcon />
                    </IconButton>
                )}

                {(isEditing || isAdding) && (
                    <>
                        <SaveButton variant="contained" size="small" onClick={handleSave} />
                        <CancelButton variant="outlined" size="small" onClick={handleCancel} />
                    </>
                )}

                <ExportReportButton onClick={handleExportReport} />
                <ResetButton onClick={handleResetFilters} />
            </Box>

            {/* Table */}
            <LabsTable
                rows={rows}
                selectedItemId={selectedItemId}
                setSelectedItemId={setSelectedItemId}
            />
        </Box>
    );
};

export default LabManagement;