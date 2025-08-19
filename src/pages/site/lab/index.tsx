import React, { useState } from 'react';
import { Box, CircularProgress } from '@mui/material';

import LabsTable from '../../../module/site/lab/LabsTable';
import LabActions from '../../../module/site/lab/LabActions';
import DynamicModal from '../../../components/DynamicModal';
import LabForm from '../../../module/site/lab/LabForm';

import { useLabs } from '../../../services/hooks';
import { MoreActionItem } from '../../../components/MoreActionsMenu';

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
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [canAdd] = useState<boolean>(true);

    const moreActionItems: MoreActionItem[] = [];

    const handleMoreActionClick = (key: string) => {
        console.log('More action clicked:', key);
    };

    const handleAdd = () => {
        setSelectedItemId(null);
        setModalOpen(true);
    };

    const handleEdit = () => {
        if (selectedItemId == null) return;
        setModalOpen(true);
    };

    const handleDelete = async () => {
        if (selectedItemId == null) return;
        try {
            setSelectedItemId(null);
            reload();
        } catch (e) {
            console.error(e);
        }
    };

    const handleSave = (formData: any) => {
        console.log(selectedItemId ? 'Save (update)...' : 'Save (create)...', formData);
        setModalOpen(false);
        setSelectedItemId(null);
        reload();
    };

    const handleCancel = () => {
        setModalOpen(false);
        setSelectedItemId(null);
    };

    const handleExportReport = () => {
        console.log('Exporting report...');
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

    const isEditing = selectedItemId != null;

    return (
        <Box>
            <LabActions
                selectedItemId={selectedItemId}
                canAdd={canAdd}
                moreActionItems={moreActionItems}
                onAdd={handleAdd}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onExportReport={handleExportReport}
                onMoreActionClick={handleMoreActionClick}
            />

            <LabsTable
                rows={rows}
                selectedItemId={selectedItemId}
                setSelectedItemId={setSelectedItemId}
            />

            <DynamicModal
                open={modalOpen}
                onClose={handleCancel}
                title={isEditing ? 'Edit lab' : 'Add new lab'}
            >
                <LabForm
                    isEditing={isEditing}
                    editingId={selectedItemId ?? undefined}
                    onSave={handleSave}
                    onCancel={handleCancel}
                />
            </DynamicModal>
        </Box>
    );
};

export default LabManagement;
