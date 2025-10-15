import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Tabs,
  Tab,
  Box,
  Button,
  Typography,
  Paper,
} from "@mui/material";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

export default function ImportDialog({
  open,
  onClose,
  keys = [],
  onImport,
}: {
  open: boolean;
  onClose: () => void;
  keys: string[];
  onImport: (data: any[]) => void;
}) {
  const [tabIndex, setTabIndex] = useState(0);
  const [file, setFile] = useState<File | null>(null);
  const [previewData, setPreviewData] = useState<any[]>([]);

  // 📥 Tải file template Excel
  const handleDownloadTemplate = () => {
    if (!keys.length) return;
    const sample = [Object.fromEntries(keys.map((k) => [k, ""]))];
    const worksheet = XLSX.utils.json_to_sheet(sample);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Template");
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const blob = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    saveAs(blob, "import_template.xlsx");
  };

  // 📂 Xử lý khi chọn file .xlsx
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;
    setFile(selectedFile);

    const reader = new FileReader();
    reader.onload = (event) => {
      const data = new Uint8Array(event.target?.result as ArrayBuffer);
      const workbook = XLSX.read(data, { type: "array" });
      const firstSheet = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[firstSheet];
      const jsonData: any[] = XLSX.utils.sheet_to_json(worksheet, { defval: "" });

      // Map đúng theo keys
      const mappedData = jsonData.map((row) => {
        const mapped: Record<string, any> = {};
        keys.forEach((k) => {
          const match = Object.keys(row).find(
            (c) => c.trim().toLowerCase() === k.toLowerCase()
          );
          mapped[k] = match ? row[match] : "";
        });
        return mapped;
      });

      setPreviewData(mappedData.slice(0, 5)); // hiển thị preview 5 dòng đầu
    };

    reader.readAsArrayBuffer(selectedFile);
  };

  // ✅ Import dữ liệu
  const handleConfirmImport = () => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const data = new Uint8Array(event.target?.result as ArrayBuffer);
      const workbook = XLSX.read(data, { type: "array" });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { defval: "" });

      onImport(jsonData);

      // reset sau khi import thành công
      setFile(null);
      setPreviewData([]);
      onClose();
    };
    reader.readAsArrayBuffer(file);
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: { borderRadius: 3, p: 1.5, boxShadow: 6 },
      }}
    >
      <DialogTitle component="div">
        <Typography variant="h6" fontWeight="bold">
          Import Data
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Download a template or upload an Excel file to import data.
        </Typography>
      </DialogTitle>

      <DialogContent dividers sx={{ mt: 1 }}>
        <Tabs
          value={tabIndex}
          onChange={(_, v) => setTabIndex(v)}
          sx={{ mb: 2 }}
        >
          <Tab label="Download Template" />
          <Tab label="Upload File" />
        </Tabs>

        {/* --- Tab 1: Download Template --- */}
        {tabIndex === 0 && (
          <Box textAlign="center" py={3}>
            <Typography mb={2}>
              Download the Excel template with all required columns.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={handleDownloadTemplate}
              sx={{ borderRadius: 2, px: 3 }}
            >
              Download Template (.xlsx)
            </Button>
          </Box>
        )}

        {/* --- Tab 2: Upload File --- */}
        {tabIndex === 1 && (
          <Box>
            <Box py={2} textAlign="center">
              <input
                type="file"
                accept=".xlsx"
                onChange={handleFileChange}
                style={{
                  display: "block",
                  margin: "0 auto 16px auto",
                }}
              />
              <Typography
                variant="body2"
                color={file ? "success.main" : "text.secondary"}
              >
                {file ? `Selected file: ${file.name}` : "No file selected"}
              </Typography>
            </Box>

            {previewData.length > 0 && (
              <Paper
                variant="outlined"
                sx={{
                  mt: 2,
                  p: 1.5,
                  borderRadius: 2,
                  backgroundColor: "#fafafa",
                  maxHeight: 220,
                  overflow: "auto",
                }}
              >
                <Typography
                  variant="subtitle2"
                  fontWeight="bold"
                  color="primary"
                  mb={1}
                >
                  Preview (first 5 rows)
                </Typography>
                <pre
                  style={{
                    margin: 0,
                    fontSize: "12px",
                    whiteSpace: "pre-wrap",
                    wordBreak: "break-word",
                  }}
                >
                  {JSON.stringify(previewData, null, 2)}
                </pre>
              </Paper>
            )}
          </Box>
        )}
      </DialogContent>

      <DialogActions sx={{ p: 2 }}>
        <Button
          onClick={onClose}
          variant="outlined"
          sx={{
            borderRadius: 2,
            borderColor: "error.main",
            color: "error.main",
            "&:hover": {
              borderColor: "error.dark",
              backgroundColor: "rgba(255,0,0,0.04)",
            },
          }}
        >
          Cancel
        </Button>

        {tabIndex === 1 && (
          <Button
            onClick={handleConfirmImport}
            variant="contained"
            disabled={!file}
            sx={{
              borderRadius: 2,
              px: 3,
              backgroundColor: file ? "success.main" : "grey.400",
              "&:hover": {
                backgroundColor: file ? "success.dark" : "grey.500",
              },
            }}
          >
            Import
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
}
