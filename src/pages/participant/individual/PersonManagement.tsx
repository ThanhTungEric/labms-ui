import React, { useMemo, useState } from "react";
import { Box, Paper, CircularProgress } from "@mui/material";

import IndividualTable, {
  PersonRow,
  INDIVIDUAL_COLUMNS,
  IndividualColumnKey,
} from "@/module/participant/individual/IndividualTable";
import IndividualAction from "@/module/participant/individual/IndividualAction";
import ConfirmationModal from "@/components/ConfirmationModal";
import ColumnSelectionDialog from "@/module/equipment/master/ColumnSelectionDialog";
import IndividualDialog from "@/module/participant/individual/IndividualDialog";

import type {
  IndividualGuestParticipant,
  IgpOrderField,
  Order,
  MoreActionItem,
} from "@/services/types";

import { useIgpData, useIgpMutations } from "@/services/hooks";

const IndividualManagement: React.FC = () => {
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
    searchInput,
    setSearchInput,
  } = useIgpData();

  const rows: PersonRow[] = useMemo(() => {
    return (data || []).map((p) => ({
      ...p,
      fullName: [p.lastName, p.middleName, p.firstName]
        .filter(Boolean)
        .join(" ")
        .replace(/\s+/g, " ")
        .trim(),
    }));
  }, [data]);

  const orderBy: IgpOrderField = (sorts?.[0]?.field ?? "id") as IgpOrderField;
  const order: Order = (sorts?.[0]?.dir ?? "asc") as Order;

  const [columnsVisible, setColumnsVisible] = useState<Record<IndividualColumnKey, boolean>>({
    id: true,
    fullName: true,
    title: true,
    email: true,
    phoneNumber: true,
    description: false,
  });
  const handleColumnToggle = (field: IndividualColumnKey) =>
    setColumnsVisible((prev) => ({ ...prev, [field]: !prev[field] }));

  const { remove } = useIgpMutations();

  const handleExportReport = () => console.log("Exporting individual guest report...");
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
      console.error("Failed to delete individual guest:", e);
    }
  };

  const canAdd = true;
  const moreActionItems: MoreActionItem[] = [];
  const handleMoreActionClick = (key: string) => console.log("More action clicked:", key);

  return (
    <Box>
      <IndividualAction
        selectedItemId={selectedItemId}
        canAdd={canAdd}
        moreActionItems={moreActionItems}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onExportReport={handleExportReport}
        onMoreActionClick={handleMoreActionClick}
        onColumnClick={() => setIsColumnDialogVisible(true)}
        searchValue={searchInput}
        onSearchChange={setSearchInput}
      />

      {loading ? (
        <Paper
          elevation={3}
          sx={{
            borderRadius: 2,
            p: 3,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <CircularProgress />
        </Paper>
      ) : error ? (
        <Box sx={{ color: "error.main", mb: 2 }}>Failed to load data</Box>
      ) : (
        <IndividualTable
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
        allColumns={[...INDIVIDUAL_COLUMNS]}
        columnsVisible={columnsVisible}
        onColumnToggle={handleColumnToggle}
      />

      <IndividualDialog
        open={isFormModalOpen}
        onClose={() => setIsFormModalOpen(false)}
        onSuccess={() => {
          setIsFormModalOpen(false);
          reload();
          setSelectedItemId(null);
        }}
        person={rows.find((x) => x.id === selectedItemId) as IndividualGuestParticipant | undefined}
      />
    </Box>
  );
};

export default IndividualManagement;
