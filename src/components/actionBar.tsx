import React, { useCallback, useRef } from "react";
import {
  Box,
  IconButton,
  Tooltip,
  styled,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { actionBar } from "../services/types/actionBar.type";
import { useNotification } from "../services/hooks/notification/notification";
import ExportReportButton from "./ExportReportButton";
import ImportButton from "./ImportButton";
import FilterSection from "./fiterSearch";

//
// 🎨 Styled containers for consistent spacing & alignment
//
const StyledActionBar = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  flexWrap: "wrap", // allows wrapping on smaller screens
  gap: theme.spacing(1.5),
  padding: theme.spacing(1),
  border: `1px solid ${theme.palette.grey[300]}`,
  borderRadius: 8,
  backgroundColor: theme.palette.background.paper,
}));

const ButtonGroup = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  flexWrap: "wrap",
  gap: theme.spacing(1),
}));

export default function ActionBar({
  type,
  onDelete,
  onImport,
  onExport,
  selectedIds = [],
  onAdd,
  handleFilter,
}: actionBar) {
  const hiddenAddTypes = ["equipment-statuses", "lab-positions", "something-else"];
  const filterRef = useRef<{ reset: () => void }>(null);

  // Handle export click
  const handleExportReport = useCallback(() => {
    if (typeof onExport === "function") onExport();
  }, [onExport]);

  // Handle import click
  const handleImportClick = useCallback(() => {
    if (typeof onExport === "function") onImport();
  }, [onImport]);

  // Handle delete click (only if items selected)
  const handleDeleteClick = () => {
    if (onDelete && selectedIds.length > 0) {
      onDelete(selectedIds);
    }
  };

  // Check if delete button should be active
  const isDeleteDisabled = selectedIds.length === 0;

  return (
    <StyledActionBar>
      {/* ✅ Left section — action buttons */}
      <ButtonGroup>
        {/* Add button (hidden for some types) */}
        {!hiddenAddTypes.includes(type) && (
          <Tooltip title="Add">
            <IconButton size="small" onClick={onAdd}>
              <AddIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        )}

        {/* Delete button — only active when items are selected */}
        {!hiddenAddTypes.includes(type) && (
          <Tooltip title={isDeleteDisabled ? "Select items to delete" : "Delete"}>
            <span>
              <IconButton
                size="small"
                onClick={handleDeleteClick}
                disabled={isDeleteDisabled}
                color={isDeleteDisabled ? "default" : "error"} // 🔴 turns red when active
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
            </span>
          </Tooltip>
        )}

        {/* Import button */}
        <ImportButton onClick={handleImportClick} />

        {/* Export button */}
        <ExportReportButton onClick={handleExportReport} />
      </ButtonGroup>

      {/* ✅ Right section — search bar */}
      <Box flex={1} display="flex" justifyContent="flex-end" minWidth={200}>
        <FilterSection ref={filterRef} onSearch={handleFilter} />
      </Box>
    </StyledActionBar>
  );
}
