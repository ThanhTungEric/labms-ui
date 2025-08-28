// src/pages/site/lab/LabManagement.tsx
import React, { useEffect, useState } from 'react';
import { Box, CircularProgress, Paper } from '@mui/material';

import LabsTable, { LabRow } from '../../../module/site/lab/LabsTable';
import LabActions from '../../../module/site/lab/LabActions';
import DynamicModal from '../../../components/DynamicModal';
import LabForm from '../../../module/site/lab/LabForm';
import ConfirmationModal from '../../../components/ConfirmationModal';

import { useLabs } from '../../../services/hooks';
import { useLabMutations } from '../../../services/hooks';
import { MoreActionItem } from '@/components';
import { useDebounce } from '../../../utils';

const LabManagement: React.FC = () => {
    const {
        labs, loading, error, reload,
        page, setPage, pageSize, setPageSize,
        total,
        search, setSearch,
        sorts, setSorts,
    } = useLabs();

    const { create, update, remove, busy, error: mutationError } = useLabMutations();
    const rows = (labs as unknown as LabRow[]) ?? [];

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
            console.error('Failed to save lab:', e);
        }
    };

    const handleCancel = () => { setModalOpen(false); setSelectedItemId(null); };
    const handleExportReport = () => console.log('Exporting report...');

    type Field = 'id' | 'name' | 'area' | 'layout' | 'condition';
    const orderBy = (sorts?.[0]?.field as Field) || 'id';
    const order = (sorts?.[0]?.dir as 'asc' | 'desc') || 'asc';

    const onRequestSort = (field: Field) => {
        if (sorts?.[0]?.field === field) {
            const nextDir = sorts[0].dir === 'asc' ? 'desc' : 'asc';
            setSorts([{ field, dir: nextDir }]);
        } else {
            setSorts([{ field, dir: 'asc' }]);
        }
        setPage(1);
    };

    const [searchInput, setSearchInput] = useState(search);
    const debouncedSearch = useDebounce(searchInput, 400);

    useEffect(() => {
        setSearch(debouncedSearch);
        setPage(1);
    }, [debouncedSearch, setSearch, setPage]);

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
                <LabsTable
                    rows={rows}
                    selectedItemId={selectedItemId}
                    setSelectedItemId={setSelectedItemId}
                    order={order}
                    orderBy={orderBy}
                    onRequestSort={onRequestSort}
                    page={page}
                    pageSize={pageSize}
                    total={total}
                    onPageChange={setPage}
                    onPageSizeChange={(n) => { setPageSize(n); setPage(1); }}
                />
            )}

            <DynamicModal open={modalOpen} onClose={handleCancel} title={isEditing ? 'Edit lab' : 'Add new lab'}>
                <LabForm
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
                message="Are you sure you want to delete this lab? This action cannot be undone."
            />
        </Box>
    );
};

export default LabManagement;
