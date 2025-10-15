import React from "react";
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, TableSortLabel, TableFooter, TablePagination, Box
} from "@mui/material";
import NameWithIdChip from "@/components/NameWithIdChip";
import type { Staff, StaffOrderField, Order, AcademicTitle, Program } from "@/services/types";

const STAFF_COLUMNS = [
  "id", "code", "fullName", "function", "title", "email", "phoneNumber",
  "expertises", "academicTitles", "programs"
] as const;

export type StaffColumnKey = typeof STAFF_COLUMNS[number];
export type StaffRow = Staff & { fullName: string };

interface Props {
  rows: Staff[];
  selectedItemId: number | null;
  setSelectedItemId: (id: number | null) => void;

  order: Order;
  orderBy: StaffOrderField;
  onRequestSort: (field: StaffOrderField) => void;

  page: number;
  pageSize: number;
  total: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;

  columnsVisible: Record<StaffColumnKey, boolean>;
}

const StaffTable: React.FC<Props> = ({
  rows, selectedItemId, setSelectedItemId,
  order, orderBy, onRequestSort,
  page, pageSize, total, onPageChange, onPageSizeChange,
  columnsVisible
}) => {
  const createSortHandler = (field: StaffOrderField) => () => onRequestSort(field);
  const getFullName = (row: Staff) => `${row.firstName} ${row.middleName ? row.middleName + ' ' : ''}${row.lastName}`;
console.log("////", rows);
  const renderObjectArrayAsChips = <T extends { id: number; name: string }>(
      data: T[] | null | undefined
  ) => {
      if (!data || data.length === 0) {
          return "-";
      }

      return (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, maxWidth: 300 }}>
              {data.map((item) => (
                  <NameWithIdChip 
                      key={item.id} 
                      name={item.name} 
                      id={item.id} 
                  />
              ))}
          </Box>
      );
  };
    
  // Hàm hiển thị mảng chuỗi (expertises)
  const renderStringArrayAsChips = (
      data: string[] | null | undefined
  ) => {
      if (!data || data.length === 0) {
          return "-";
      }

      // expertises không có ID, nên dùng NameWithIdChip với key=index và id=0
      return (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, maxWidth: 300 }}>
              {data.map((item, index) => (
                  <NameWithIdChip 
                      key={index} 
                      name={item} 
                      id={0} // Sử dụng id mặc định vì không có ID thực tế
                  />
              ))}
          </Box>
      );
  };


  return (
    <Paper elevation={3} sx={{ borderRadius: 2 }}>
      <TableContainer>
        <Table sx={{ minWidth: 1200 }} size="small" aria-label="staff table">
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

              {columnsVisible.code && (
                <TableCell sx={{ fontWeight: "bold" }}>
                  <TableSortLabel
                    active={orderBy === "code"}
                    direction={orderBy === "code" ? order : "asc"}
                    onClick={createSortHandler("code")}
                  >
                    Code
                  </TableSortLabel>
                </TableCell>
              )}

              {columnsVisible.fullName && (
                <TableCell sx={{ fontWeight: "bold" }}>
                  <TableSortLabel
                    active={orderBy === "firstName" || orderBy === "lastName" || orderBy === "middleName"}
                    direction={orderBy === "firstName" || orderBy === "lastName" || orderBy === "middleName" ? order : "asc"}
                    onClick={createSortHandler("firstName")}
                  >
                    Full Name
                  </TableSortLabel>
                </TableCell>
              )}

              {columnsVisible.function && (
                <TableCell sx={{ fontWeight: "bold" }}>
                  <TableSortLabel
                    active={orderBy === "function"}
                    direction={orderBy === "function" ? order : "asc"}
                    onClick={createSortHandler("function")}
                  >
                    Function
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
              
              {columnsVisible.expertises && <TableCell sx={{ fontWeight: "bold" }}>Expertises</TableCell>}
              {columnsVisible.academicTitles && <TableCell sx={{ fontWeight: "bold" }}>Academic Titles</TableCell>}
              {columnsVisible.programs && <TableCell sx={{ fontWeight: "bold" }}>Programs</TableCell>}
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
                {columnsVisible.code && <TableCell>{row.code}</TableCell>}
                {columnsVisible.fullName && <TableCell>{getFullName(row)}</TableCell>}
                {columnsVisible.function && <TableCell>{row.function ?? "-"}</TableCell>}
                {columnsVisible.title && <TableCell>{row.title ?? "-"}</TableCell>}
                {columnsVisible.email && <TableCell>{row.email ?? "-"}</TableCell>}
                {columnsVisible.phoneNumber && <TableCell>{row.phoneNumber ?? "-"}</TableCell>}
                
                {/* HIỂN THỊ EXPERTISES (MẢNG CHUỖI) */}
                {columnsVisible.expertises && (
                    <TableCell>
                      {renderStringArrayAsChips(row.expertises)}
                    </TableCell>
                )}
                {/* HIỂN THỊ ACADEMIC TITLES (MẢNG OBJECT) */}
                {columnsVisible.academicTitles && (
                    <TableCell>
                      {renderObjectArrayAsChips(row.academicTitles)}
                    </TableCell>
                )}
                {/* HIỂN THỊ PROGRAMS (MẢNG OBJECT) */}
                {columnsVisible.programs && (
                    <TableCell>
                      {renderObjectArrayAsChips(row.programs)}
                    </TableCell>
                )}
              </TableRow>
            ))}

            {rows.length === 0 && (
              <TableRow>
                <TableCell colSpan={10} align="center" sx={{ py: 4, color: "text.secondary" }}>
                  No staff found.
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
                labelDisplayedRows={({ from, to, count }) => `${from}-${to} of ${count}`}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default StaffTable;