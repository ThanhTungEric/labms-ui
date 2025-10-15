import React from "react";
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, TableSortLabel, TableFooter, TablePagination
} from "@mui/material";
import NameWithIdChip from "@/components/NameWithIdChip";
import type { IndividualGuestParticipant, IgpOrderField, Order } from "@/services/types";

export type PersonRow = IndividualGuestParticipant & { fullName: string };

export const INDIVIDUAL_COLUMNS = [
  "id",
  "fullName",
  "title",
  "email",
  "phoneNumber",
  "description",
] as const;

export type IndividualColumnKey = typeof INDIVIDUAL_COLUMNS[number];

interface Props {
  rows: PersonRow[];
  selectedItemId: number | null;
  setSelectedItemId: (id: number | null) => void;

  order: Order;
  orderBy: IgpOrderField;
  onRequestSort: (field: IgpOrderField) => void;

  page: number;
  pageSize: number;
  total: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;

  columnsVisible: Record<IndividualColumnKey, boolean>;
}

const IndividualTable: React.FC<Props> = ({
  rows, selectedItemId, setSelectedItemId,
  order, orderBy, onRequestSort,
  page, pageSize, total, onPageChange, onPageSizeChange,
  columnsVisible
}) => {
  const createSortHandler = (field: IgpOrderField) => () => onRequestSort(field);
  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  return (
    <Paper elevation={3} sx={{ borderRadius: 2 }}>
      <TableContainer>
        <Table sx={{ minWidth: 900 }} size="small" aria-label="individual table">
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

              {columnsVisible.fullName && (
                <TableCell sx={{ fontWeight: "bold" }}>
                  <TableSortLabel
                    active={orderBy === "lastName"}
                    direction={orderBy === "lastName" ? order : "asc"}
                    onClick={createSortHandler("lastName")}
                  >
                    Full name
                  </TableSortLabel>
                </TableCell>
              )}

              {columnsVisible.title && (
                <TableCell sx={{ fontWeight: "bold" }}>
                  <TableSortLabel
                    active={orderBy === "title"}
                    direction={orderBy === "title" ? order : "asc"}
                    onClick={createSortHandler("title")}
                  >
                    Title
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

              {columnsVisible.description && (
                <TableCell sx={{ fontWeight: "bold" }}>Description</TableCell>
              )}
            </TableRow>
          </TableHead>

          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.id}
                onClick={() => setSelectedItemId(row.id)}
                selected={row.id === selectedItemId}
                hover
                sx={{ cursor: "pointer", height: 40 }}
              >
                {columnsVisible.id && <TableCell><NameWithIdChip id={row.id} /></TableCell>}
                {columnsVisible.fullName && <TableCell>{row.fullName}</TableCell>}
                {columnsVisible.title && <TableCell>{row.title ?? "-"}</TableCell>}
                {columnsVisible.email && <TableCell>{row.email ?? "-"}</TableCell>}
                {columnsVisible.phoneNumber && <TableCell>{row.phoneNumber ?? "-"}</TableCell>}
                {columnsVisible.description && (
                  <TableCell sx={{ maxWidth: 420 }} title={row.description ?? ""}>
                    {row.description ?? "-"}
                  </TableCell>
                )}
              </TableRow>
            ))}

            {rows.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} align="center" sx={{ py: 4, color: "text.secondary" }}>
                  No individual participants found.
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
                labelDisplayedRows={({ from, to, count }) => `${from}-${to} of ${count} (page ${page}/${totalPages})`}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default IndividualTable;
