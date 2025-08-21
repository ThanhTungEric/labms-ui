// src/pages/site/lab/LabManagement.tsx
import React, { useState } from 'react';
import { Box, CircularProgress, Paper } from '@mui/material';

import FloorsTable, { FloorRow } from '../../../module/site/floor/FloorTable';
import FloorActions from '../../../module/site/floor/FloorActions';
import DynamicModal from '../../../components/DynamicModal';
import FloorForm from '../../../module/site/floor/FloorForm';
import ConfirmationModal from '../../../components/ConfirmationModal';

import { useFloors } from '../../../services/hooks';
import { useFloorMutations } from '../../../services/hooks';
import { MoreActionItem } from '../../../components/MoreActionsMenu';
import { useDebounce } from '../../../utils';

const FloorManagement: React.FC = () => {
    const { floors, loading, error, reload } = useFloors();
    const { create, update, remove, busy, error: mutationError } = useFloorMutations();

    const rows = (floors as unknown as FloorRow[]) ?? [];

    const [selectedItemId, setSelectedItemId] = useState<number | null>(null);
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState<boolean>(false);
    const [canAdd] = useState<boolean>(true);

    const moreActionItems: MoreActionItem[] = [];
    const handleMoreActionClick = (key: string) => console.log('More action clicked:', key);

    const handleAdd = () => { setSelectedItemId(null); setModalOpen(true); };
    const handleEdit = () => { if (selectedItemId == null) return; setModalOpen(true); };
    const handleDelete = () => { if (selectedItemId == null) return; setIsConfirmModalOpen(true); };

    const handleConfirmDelete = async () => {
        if (selectedItemId == null) return;
        try {
            await remove(selectedItemId);
            setSelectedItemId(null);
            reload();
            setIsConfirmModalOpen(false);
        } catch (e) {
            console.error(e);
            setIsConfirmModalOpen(false);
        }
    };

    const handleSave = async (formData: any) => {
        const payload: any = { ...formData };
        payload.statusId = payload.status === 'ACTIVE' ? 1 : 2;
        delete payload.status;

        if (payload.room != null) payload.roomId = payload.room;
        delete payload.room;
        delete payload.rooms;

        try {
            if (selectedItemId) await update(selectedItemId, payload);
            else await create(payload);

            setModalOpen(false);
            setSelectedItemId(null);
            reload();
        } catch (e) {
            console.error('Failed to save floor:', e);
        }
    };

    const handleCancel = () => { setModalOpen(false); setSelectedItemId(null); };
    const handleExportReport = () => console.log('Exporting report...');

    // Sorting (placeholder, you can wire real sort later)
    const orderBy: 'id' = 'id';
    const order: 'asc' | 'desc' = 'asc';
    const onRequestSort = () => { /* not implemented yet */ };

    // Search
    const [searchInput, setSearchInput] = useState("");
    const debouncedSearch = useDebounce(searchInput, 400);

    const isEditing = selectedItemId != null;

    return (
        <Box>
            <FloorActions
                selectedItemId={selectedItemId}
                canAdd={canAdd}
                moreActionItems={moreActionItems}
                onAdd={handleAdd}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onExportReport={handleExportReport}
                onMoreActionClick={handleMoreActionClick}
                searchValue={searchInput}
                onSearchChange={setSearchInput}
            />

            {loading || busy ? (
                <Paper elevation={3} sx={{ borderRadius: 2, p: 3, display: 'flex', justifyContent: 'center' }}>
                    <CircularProgress />
                </Paper>
            ) : (error || mutationError) ? (
                <Box sx={{ color: 'error.main', mb: 2 }}>
                    Failed to load data: {error?.message || mutationError?.message}
                </Box>
            ) : (
                <FloorsTable
                    rows={rows}
                    selectedItemId={selectedItemId}
                    setSelectedItemId={setSelectedItemId}
                    order={order}
                    orderBy={orderBy}
                    onRequestSort={onRequestSort}
                    page={1} // fixed for now
                    pageSize={rows.length} // no paging, show all
                    total={rows.length}
                    onPageChange={() => { }}
                    onPageSizeChange={() => { }}
                />
            )}

            <DynamicModal open={modalOpen} onClose={handleCancel} title={isEditing ? 'Edit floor' : 'Add new floor'}>
                <FloorForm
                    isEditing={isEditing}
                    editingId={selectedItemId ?? undefined}
                    onSave={handleSave}
                    onCancel={handleCancel}
                />
            </DynamicModal>

            <ConfirmationModal
                open={isConfirmModalOpen}
                onClose={() => setIsConfirmModalOpen(false)}
                onConfirm={handleConfirmDelete}
                title="Confirm Deletion"
                message="Are you sure you want to delete this floor? This action cannot be undone."
            />
        </Box>
    );
};

export default FloorManagement;
