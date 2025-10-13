import React, { useMemo, useState } from 'react';
import { Box, CircularProgress, Paper } from '@mui/material';
import EquipmentItemTable, { EquipmentItemRow } from '@/module/equipment/equipmentItem/EquipmentItemTable';
import EquipmentItemActions from '@/module/equipment/equipmentItem/EquipmentItemActions';
import ConfirmationModal from '@/components/ConfirmationModal';
import ColumnSelectionDialog from '@/module/equipment/master/ColumnSelectionDialog';
import EquipmentItemDialog from '@/module/equipment/equipmentItem/EquipmentItemDialog';

import { useEquipmentItems, useEquipmentItemMutations } from '@/services/hooks';
import { MoreActionItem, EquipmentItem } from '@/services/types';

const toRow = (item: EquipmentItem): EquipmentItemRow => item;

const allColumns: (keyof EquipmentItemRow)[] = [
  'id',
  'serialNumber',
  'status',
  'base',
  'lab',
  'purchaseDate',
  'warrantyExpiration',
];

const EquipmentItemManagement: React.FC = () => {
  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isColumnDialogVisible, setIsColumnDialogVisible] = useState(false);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);

  const [columnsVisible, setColumnsVisible] = useState<
    Record<keyof EquipmentItemRow, boolean>
  >({
    id: true,
    serialNumber: true,
    status: true,
    base: true,
    lab: true,
    purchaseDate: true,
    warrantyExpiration: true,
  });

  const {
    data,
    loading,
    error,
    meta,
    page,
    setPage,
    pageSize,
    setPageSize,
    searchInput,
    setSearchInput,
    sorts,
    onRequestSort,
    reload,
  } = useEquipmentItems({}, true);

  const { remove } = useEquipmentItemMutations();

  const rows = useMemo(() => (data || []).map(toRow), [data]);

  const handleColumnToggle = (field: keyof EquipmentItemRow) =>
    setColumnsVisible((prev) => ({ ...prev, [field]: !prev[field] }));

  const handleAdd = () => {
    setSelectedItemId(null);
    setIsFormModalOpen(true);
  };

  const handleEdit = () => {
    if (selectedItemId) setIsFormModalOpen(true);
  };

  const handleDelete = () => {
    if (selectedItemId) setIsConfirmModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedItemId) return;
    try {
      await remove(selectedItemId);
      setIsConfirmModalOpen(false);
      reload();
      setSelectedItemId(null);
    } catch (err) {
      console.error('Failed to delete equipment item:', err);
    }
  };

  const orderBy = sorts?.[0]?.field || 'id';
  const order = sorts?.[0]?.dir || 'asc';
  const canAdd = true;
  const moreActionItems: MoreActionItem[] = [];

  return (
    <Box>
      <EquipmentItemActions
        selectedItemId={selectedItemId}
        canAdd={canAdd}
        moreActionItems={moreActionItems}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onExportReport={() => console.log('Export report')}
        onMoreActionClick={() => { }}
        onColumnClick={() => setIsColumnDialogVisible(true)}
        searchValue={searchInput}
        onSearchChange={setSearchInput}
      />

      {loading ? (
        <Paper
          elevation={3}
          sx={{
            p: 3,
            borderRadius: 2,
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <CircularProgress />
        </Paper>
      ) : error ? (
        <Box sx={{ color: 'error.main', mb: 2 }}>
          Failed to load data
        </Box>
      ) : (
        <EquipmentItemTable
          rows={rows}
          selectedItemId={selectedItemId}
          setSelectedItemId={setSelectedItemId}
          order={order}
          orderBy={orderBy as any}
          onRequestSort={onRequestSort as any}
          page={page}
          pageSize={pageSize}
          total={meta?.count || 0}
          onPageChange={setPage}
          onPageSizeChange={(n) => {
            setPageSize(n);
            setPage(1);
          }}
          columnsVisible={columnsVisible}
        />
      )}

      <ConfirmationModal
        open={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Confirm Deletion"
        message="Are you sure you want to delete this equipment item?"
      />

      <ColumnSelectionDialog
        open={isColumnDialogVisible}
        onClose={() => setIsColumnDialogVisible(false)}
        allColumns={allColumns}
        columnsVisible={columnsVisible as any}
        onColumnToggle={handleColumnToggle as any}
      />

      <EquipmentItemDialog
        open={isFormModalOpen}
        onClose={() => setIsFormModalOpen(false)}
        onSuccess={() => {
          reload();
          setIsFormModalOpen(false);
          setSelectedItemId(null);
        }}
        item={rows.find((row) => row.id === selectedItemId) || null}
      />
    </Box>
  );
};

export default EquipmentItemManagement;
