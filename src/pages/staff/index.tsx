import React, { useMemo, useState } from "react";
import { Box, Paper, CircularProgress } from "@mui/material";

import StaffTable, { StaffColumnKey, StaffRow } from "@/module/staff/StaffTable";
import StaffActions from "@/module/staff/StaffActions";
import ConfirmationModal from "@/components/ConfirmationModal";
import ColumnSelectionDialog from "@/module/equipment/master/ColumnSelectionDialog";
import StaffDialog from "@/module/staff/StaffDialog";

import type {
  MoreActionItem,
  Staff as StaffType,
  Order,
  StaffOrderField,
} from "@/services/types";

import { useStaffData, useStaffMutations } from "@/services/hooks";

const STAFF_COLUMNS: StaffColumnKey[] = [
    "id", "code", "fullName", "function", "title", "email", "phoneNumber",
    "expertises", "academicTitles", "programs"
];

const StaffManagement: React.FC = () => {
  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isColumnDialogVisible, setIsColumnDialogVisible] = useState(false);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);

  const {
    data,
    loading,
    error,
    total,
    page,
    setPage,
    pageSize,
    setPageSize,
    sorts,
    onRequestSort,
    reload,
    searchName,
    setSearchName,
  } = useStaffData();

  const rows: StaffRow[] = useMemo(() => (data || []) as StaffRow[], [data]);

  const orderBy: StaffOrderField = (sorts?.[0]?.field ?? "id") as StaffOrderField;
  const order: Order = (sorts?.[0]?.dir ?? "asc") as Order;

  const [columnsVisible, setColumnsVisible] = useState<Record<StaffColumnKey, boolean>>({
    id: true,
    code: true,
    fullName: true,
    function: true,
    title: true,
    email: true,
    phoneNumber: true,
    // CẬP NHẬT TRẠNG THÁI HIỂN THỊ BAN ĐẦU CHO CỘT MỚI
    expertises: false,
    academicTitles: false,
    programs: false,
  });

  const handleColumnToggle = (field: StaffColumnKey) =>
    setColumnsVisible((prev) => ({ ...prev, [field]: !prev[field] }));

  const { remove } = useStaffMutations();

  const handleExportReport = () => console.log("Exporting staff report...");
  const handleAdd = () => {
    setSelectedItemId(null);
    setIsFormModalOpen(true);
  };
  const handleEdit = () => {
    if (selectedItemId == null) return;
    setIsFormModalOpen(true);
  };
  const handleDelete = () => {
    if (selectedItemId == null) return;
    setIsConfirmModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (selectedItemId == null) return;
    try {
      await remove(selectedItemId);
      setIsConfirmModalOpen(false);
      setSelectedItemId(null);
      reload();
    } catch (e) {
      console.error("Failed to delete staff:", e);
    }
  };

  const canAdd = true;
  const moreActionItems: MoreActionItem[] = [];
  const handleMoreActionClick = (key: string) => console.log("More action clicked:", key);

  return (
    <Box>
      <StaffActions
        selectedItemId={selectedItemId}
        canAdd={canAdd}
        moreActionItems={moreActionItems}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onExportReport={handleExportReport}
        onMoreActionClick={handleMoreActionClick}
        onColumnClick={() => setIsColumnDialogVisible(true)}
        searchValue={searchName}
        onSearchChange={setSearchName}
      />

      {loading ? (
        <Paper elevation={3} sx={{ borderRadius: 2, p: 3, display: "flex", justifyContent: "center" }}>
          <CircularProgress />
        </Paper>
      ) : error ? (
        <Box sx={{ color: "error.main", mb: 2 }}>Failed to load data</Box>
      ) : (
        <StaffTable
          rows={rows}
          selectedItemId={selectedItemId}
          setSelectedItemId={setSelectedItemId}
          order={order}
          orderBy={orderBy}
          onRequestSort={onRequestSort as (field: StaffOrderField) => void}
          page={page}
          pageSize={pageSize}
          total={total}
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
        message="Are you sure you want to delete this staff? This action cannot be undone."
      />

      <ColumnSelectionDialog
        open={isColumnDialogVisible}
        onClose={() => setIsColumnDialogVisible(false)}
        allColumns={[...STAFF_COLUMNS]}
        columnsVisible={columnsVisible}
        onColumnToggle={handleColumnToggle}
      />

      <StaffDialog
        open={isFormModalOpen}
        onClose={() => setIsFormModalOpen(false)}
        onSuccess={() => {
          setIsFormModalOpen(false);
          reload();
          setSelectedItemId(null);
        }}
        staff={rows.find((x) => x.id === selectedItemId) as StaffType | undefined}
      />
    </Box>
  );
};

export default StaffManagement;