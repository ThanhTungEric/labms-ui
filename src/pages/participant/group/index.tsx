import React, { useMemo, useState } from "react";
import { Box, Paper, CircularProgress } from "@mui/material";

import ParticipantTable, { ParticipantRow } from "@/module/participant/master/ParticipantTable";
import ParticipantActions from "@/module/participant/master/ParticipantAction";
import ConfirmationModal from "@/components/ConfirmationModal";
import ColumnSelectionDialog from "@/module/equipment/master/ColumnSelectionDialog";
import ParticipantDialog from "@/module/participant/master/ParticipantDialog";

import type {
  MoreActionItem,
  GroupGuestParticipant as Participant,
  Order,
  GgpOrderField as ParticipantOrderField,
} from "@/services/types";

import { useGgpData, useGgpMutations } from "@/services/hooks";

type ColumnKey = "id" | "name" | "email" | "phoneNumber" | "description" | "members";
const ALL_COLUMNS: ColumnKey[] = ["id", "name", "email", "phoneNumber", "description", "members"];

const ParticipantManagement: React.FC = () => {
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
  } = useGgpData();


  const rows: ParticipantRow[] = useMemo(() => (data || []) as ParticipantRow[], [data]);


  const orderBy: ParticipantOrderField = (sorts?.[0]?.field ?? "id") as ParticipantOrderField;
  const order: Order = (sorts?.[0]?.dir ?? "asc") as Order;

  const [columnsVisible, setColumnsVisible] = useState<Record<ColumnKey, boolean>>({
    id: true,
    name: true,
    email: true,
    phoneNumber: true,
    description: false,
    members: true,
  });

  const handleColumnToggle = (field: ColumnKey) =>
    setColumnsVisible((prev) => ({ ...prev, [field]: !prev[field] }));

  const { remove } = useGgpMutations();

  const handleExportReport = () => console.log("Exporting participant report...");
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
      console.error("Failed to delete participant:", e);
    }
  };

  const canAdd = true;
  const moreActionItems: MoreActionItem[] = [];
  const handleMoreActionClick = (key: string) => console.log("More action clicked:", key);

  return (
    <Box>
      <ParticipantActions
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
        <ParticipantTable
          rows={rows}
          selectedItemId={selectedItemId}
          setSelectedItemId={setSelectedItemId}
          order={order}
          orderBy={orderBy}
          onRequestSort={onRequestSort as (field: ParticipantOrderField) => void}
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
        message="Are you sure you want to delete this participant? This action cannot be undone."
      />

      <ColumnSelectionDialog
        open={isColumnDialogVisible}
        onClose={() => setIsColumnDialogVisible(false)}
        allColumns={[...ALL_COLUMNS]}
        columnsVisible={columnsVisible}
        onColumnToggle={handleColumnToggle}
      />

      <ParticipantDialog
        open={isFormModalOpen}
        onClose={() => setIsFormModalOpen(false)}
        onSuccess={() => {
          setIsFormModalOpen(false);
          reload();
          setSelectedItemId(null);
        }}
        participant={rows.find((x) => x.id === selectedItemId) as Participant | undefined}
      />
    </Box>
  );
};

export default ParticipantManagement;
