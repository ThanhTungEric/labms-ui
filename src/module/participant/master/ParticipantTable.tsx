import React from "react";
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, TableSortLabel, TableFooter, TablePagination
} from "@mui/material";
import NameWithIdChip from "@/components/NameWithIdChip";

import type {
  GroupGuestParticipant as Participant,
  GgpOrderField as ParticipantOrderField,
  Order,
} from "@/services/types";

export type ParticipantRow = Participant;

interface ParticipantTableProps {
  rows: ParticipantRow[];
  selectedItemId: number | null;
  setSelectedItemId: (id: number | null) => void;

  order: Order;
  orderBy: ParticipantOrderField;
  onRequestSort: (field: ParticipantOrderField) => void;

  page: number;
  pageSize: number;
  total: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;

  columnsVisible: Record<
    keyof Pick<ParticipantRow, "id" | "name" | "email" | "phoneNumber" | "description" | "members">,
    boolean
  >;
}

const ParticipantTable: React.FC<ParticipantTableProps> = ({
  rows, selectedItemId, setSelectedItemId,
  order, orderBy, onRequestSort,
  page, pageSize, total, onPageChange, onPageSizeChange,
  columnsVisible
}) => {
  const createSortHandler = (field: ParticipantOrderField) => () => onRequestSort(field);
  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  return (
    <Paper elevation={3} sx={{ borderRadius: 2 }}>
      <TableContainer>
        <Table sx={{ minWidth: 900 }} size="small" aria-label="participant table">
          <TableHead>
            <TableRow>
              {columnsVisible.id && (
                <TableCell sx={{ fontWeight: "bold" }}>
                  <TableSortLabel
                    active={orderBy === "id"}
                    direction={orderBy === "id" ? order : "asc"}
                    onClick={createSortHandler("id")}
                  >
                    ID
                  </TableSortLabel>
                </TableCell>
              )}
              {columnsVisible.name && (
                <TableCell sx={{ fontWeight: "bold" }}>
                  <TableSortLabel
                    active={orderBy === "name"}
                    direction={orderBy === "name" ? order : "asc"}
                    onClick={createSortHandler("name")}
                  >
                    Name
                  </TableSortLabel>
                </TableCell>
              )}
              {columnsVisible.email && (
                <TableCell sx={{ fontWeight: "bold" }}>
                  <TableSortLabel
                    active={orderBy === "email"}
                    direction={orderBy === "email" ? order : "asc"}
                    onClick={createSortHandler("email")}
                  >
                    Email
                  </TableSortLabel>
                </TableCell>
              )}
              {columnsVisible.phoneNumber && (
                <TableCell sx={{ fontWeight: "bold" }}>
                  <TableSortLabel
                    active={orderBy === "phoneNumber"}
                    direction={orderBy === "phoneNumber" ? order : "asc"}
                    onClick={createSortHandler("phoneNumber")}
                  >
                    Phone
                  </TableSortLabel>
                </TableCell>
              )}
              {columnsVisible.description && <TableCell sx={{ fontWeight: "bold" }}>Description</TableCell>}
              {columnsVisible.members && <TableCell sx={{ fontWeight: "bold" }}>Members</TableCell>}
            </TableRow>
          </TableHead>

          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.id}
                onClick={() => setSelectedItemId(row.id)}
                selected={row.id === selectedItemId}
                hover sx={{ cursor: "pointer", height: 40 }}
              >
                {columnsVisible.id && <TableCell><NameWithIdChip id={row.id} /></TableCell>}
                {columnsVisible.name && <TableCell>{row.name}</TableCell>}
                {columnsVisible.email && <TableCell>{row.email ?? "-"}</TableCell>}
                {columnsVisible.phoneNumber && <TableCell>{row.phoneNumber ?? "-"}</TableCell>}
                {columnsVisible.description && (
                  <TableCell sx={{ maxWidth: 360 }} title={row.description ?? ""}>
                    {row.description ?? "-"}
                  </TableCell>
                )}
                {columnsVisible.members && (
                  <TableCell>
                    {(row.members?.length ?? 0) > 0 ? row.members!.join(", ") : "-"}
                  </TableCell>
                )}
              </TableRow>
            ))}

            {rows.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} align="center" sx={{ py: 4, color: "text.secondary" }}>
                  No participants found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>

          <TableFooter>
            <TableRow>
              <TablePagination
                count={total}
                page={page - 1}
                onPageChange={(_, newPage) => onPageChange(newPage + 1)}
                rowsPerPage={pageSize}
                onRowsPerPageChange={(e) => onPageSizeChange(parseInt(e.target.value, 10))}
                rowsPerPageOptions={[10, 20, 50]}
                labelRowsPerPage="Rows per page:"
                labelDisplayedRows={({ from, to, count }) =>
                  `${from}-${to} of ${count} (page ${page}/${totalPages})`
                }
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default ParticipantTable;
