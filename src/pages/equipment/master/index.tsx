import React, { useMemo, useState } from 'react';
import { Box, CircularProgress, Paper } from '@mui/material';

import EquipmentTable, { EquipmentRow } from '../../../module/equipment/master/EquipmentTable';
import EquipmentActions from '../../../module/equipment/master/EquipmentAction';
import ConfirmationModal from '../../../components/ConfirmationModal';
import ColumnSelectionDialog from '../../../module/equipment/master/ColumnSelectionDialog';
import EquipmentDialog from '../../../module/equipment/master/EquipmentDialog';

import { useEquipmentData, useEquipmentMutations } from '@/services/hooks';
import type { Equipment } from '@/services/types';
import { MoreActionItem } from '@/services/types';

const toRow = (item: Equipment): EquipmentRow => ({
  id: item.id,
  code: item.code,
  name: item.name,
  manufacturer: item.manufacturer,
  photo: item.photo,
  manual: item.manual,
  price: item.price,
  priceCategory: item.priceCategory,
  modelCode: item.modelCode,
  components: item.components,
  specifications: item.specifications,
  form: item.form,
  categories: item.categories,
  domains: item.domains,
});


const allColumns: (keyof EquipmentRow)[] = ['id','code','name','manufacturer','price','modelCode','form','categories','domains'];

const EquipmentManagement: React.FC = () => {
  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState<boolean>(false);
  const [isColumnDialogVisible, setIsColumnDialogVisible] = useState(false);
  const [isFormModalOpen, setIsFormModalOpen] = useState<boolean>(false);


  const [searchValue, setSearchValue] = useState<string>('');

  const [columnsVisible, setColumnsVisible] = useState<Record<keyof EquipmentRow, boolean>>({
    id: true, code: true, name: true, manufacturer: true, price: true, modelCode: true,
    form: true, categories: true, domains: true, photo: false, manual: false,
    priceCategory: false, components: false, specifications: false,
  });

  const {
    data, loading, error, total, page, setPage, pageSize, setPageSize,
    sorts, onRequestSort, reload,
  } = useEquipmentData();

  const { remove } = useEquipmentMutations();

  const rows: EquipmentRow[] = useMemo(() => (data || []).map(toRow), [data]);

  const filteredRows = useMemo(() => {
    if (!searchValue?.trim()) return rows;
    const q = searchValue.toLowerCase();
    return rows.filter(r =>
      r.name?.toLowerCase().includes(q) ||
      r.code?.toLowerCase().includes(q) ||
      r.manufacturer?.toLowerCase().includes(q) ||
      r.modelCode?.toLowerCase().includes(q)
    );
  }, [rows, searchValue]);

  const handleColumnToggle = (field: keyof EquipmentRow) => {
    setColumnsVisible(prev => ({ ...prev, [field]: !prev[field] }));
  };

  const handleExportReport = () => console.log('Exporting equipment report...');
  const handleAdd = () => { setSelectedItemId(null); setIsFormModalOpen(true); };
  const handleEdit = () => { if (selectedItemId == null) return; setIsFormModalOpen(true); };
  const handleDelete = () => { if (selectedItemId == null) return; setIsConfirmModalOpen(true); };

  const handleConfirmDelete = async () => {
    if (selectedItemId == null) return;
    try {
      await remove(selectedItemId);
      setIsConfirmModalOpen(false);
      reload();
      setSelectedItemId(null);
    } catch (error) {
      console.error('Failed to delete equipment:', error);
    }
  };

  const orderBy = sorts?.[0]?.field || 'id';
  const order = sorts?.[0]?.dir || 'asc';
  const canAdd = true;
  const moreActionItems: MoreActionItem[] = [];
  const handleMoreActionClick = (key: string) => console.log('More action clicked:', key);

  return (
    <Box>
      <EquipmentActions
        selectedItemId={selectedItemId}
        canAdd={canAdd}
        moreActionItems={moreActionItems}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onExportReport={handleExportReport}
        onMoreActionClick={handleMoreActionClick}
        onColumnClick={() => setIsColumnDialogVisible(true)}
        searchValue={searchValue}
        onSearchChange={setSearchValue}
      />

      {loading ? (
        <Paper elevation={3} sx={{ borderRadius: 2, p: 3, display: 'flex', justifyContent: 'center' }}>
          <CircularProgress />
        </Paper>
      ) : error ? (
        <Box sx={{ color: 'error.main', mb: 2 }}>Failed to load data</Box>
      ) : (
        <EquipmentTable
          rows={filteredRows}
          selectedItemId={selectedItemId}
          setSelectedItemId={setSelectedItemId}
          order={order}
          orderBy={orderBy as any}
          onRequestSort={onRequestSort as any}
          page={page}
          pageSize={pageSize}
          total={total}
          onPageChange={setPage}
          onPageSizeChange={(n) => { setPageSize(n); setPage(1); }}
          columnsVisible={columnsVisible}
        />
      )}

      <ConfirmationModal
        open={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Confirm Deletion"
        message="Are you sure you want to delete this equipment? This action cannot be undone."
      />

      <ColumnSelectionDialog
        open={isColumnDialogVisible}
        onClose={() => setIsColumnDialogVisible(false)}
        allColumns={allColumns}
        columnsVisible={columnsVisible as any}
        onColumnToggle={handleColumnToggle as any}
      />

      <EquipmentDialog
        open={isFormModalOpen}
        onClose={() => setIsFormModalOpen(false)}
        onSuccess={() => {
          setIsFormModalOpen(false);
          reload();
          setSelectedItemId(null);
        }}
        equipment={rows.find(row => row.id === selectedItemId)}
      />
    </Box>
  );
};

export default EquipmentManagement;
