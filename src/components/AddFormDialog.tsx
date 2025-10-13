import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  MenuItem,
  Typography,
  Stack,
} from "@mui/material";
import { fucultyItems } from "../services/types/faculties.type";

interface AddDialogProps {
  type: string;
  open: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
  faculty: fucultyItems[];
}

export default function AddDialog({ type, open, onClose, onSave, faculty }: AddDialogProps) {
  const [formData, setFormData] = useState<any>({});

  const handleChange = (field: string, value: any) => {
    setFormData((prev: any) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    onSave(formData);
    setFormData({});
    onClose();
  };

  // Kiểm tra xem có ô nào có giá trị không rỗng
  const isFormFilled = Object.values(formData).some(
    (val) => val && val.toString().trim() !== ""
  );

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
          {type === "faculty" && "Add New Faculty"}
          {type === "programs" && "Add New Program"}
          {type === "forms" && "Add New Form"}
          {type === "academic-titles" && "Add New Academic Title"}
          {type === "functional-categories" && "Add New Functional Category"}
          {type === "functional-domains" && "Add New Functional Domain"}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Fill in the information below and click Save to add new.
        </Typography>
      </DialogTitle>

      <DialogContent dividers sx={{ mt: 1 }}>
        {/* Faculty */}
        {type === "faculty" && (
          <Stack spacing={2}>
            <TextField
              fullWidth
              size="small"
              label="Faculty Name"
              value={formData.name || ""}
              onChange={(e) => handleChange("name", e.target.value)}
            />
            <TextField
              fullWidth
              size="small"
              multiline
              rows={3}
              label="Description"
              value={formData.description || ""}
              onChange={(e) => handleChange("description", e.target.value)}
            />
          </Stack>
        )}

        {/* Academic Titles */}
        {type === "academic-titles" && (
          <Stack spacing={2}>
            <TextField
              fullWidth
              size="small"
              label="Academic Title Label"
              value={formData.label || ""}
              onChange={(e) => handleChange("label", e.target.value)}
            />
            <TextField
              fullWidth
              size="small"
              label="Academic Title Description"
              value={formData.description || ""}
              onChange={(e) => handleChange("description", e.target.value)}
            />
          </Stack>
        )}

        {/* Functional Categories */}
        {type === "functional-categories" && (
          <Stack spacing={2}>
            <TextField
              fullWidth
              size="small"
              label="Functional Category Label"
              value={formData.label || ""}
              onChange={(e) => handleChange("label", e.target.value)}
            />
            <TextField
              fullWidth
              size="small"
              label="Functional Category Description"
              value={formData.description || ""}
              onChange={(e) => handleChange("description", e.target.value)}
            />
          </Stack>
        )}

        {/* Forms */}
        {type === "forms" && (
          <Stack spacing={2}>
            <TextField
              fullWidth
              size="small"
              label="Form Name"
              value={formData.name || ""}
              onChange={(e) => handleChange("name", e.target.value)}
            />
            <TextField
              fullWidth
              size="small"
              label="Form Description"
              value={formData.description || ""}
              onChange={(e) => handleChange("description", e.target.value)}
            />
          </Stack>
        )}

        {/* Functional Domains */}
        {type === "functional-domains" && (
          <Stack spacing={2}>
            <TextField
              fullWidth
              size="small"
              label="Functional Domain Label"
              value={formData.label || ""}
              onChange={(e) => handleChange("label", e.target.value)}
            />
            <TextField
              fullWidth
              size="small"
              label="Functional Domain Description"
              value={formData.description || ""}
              onChange={(e) => handleChange("description", e.target.value)}
            />
          </Stack>
        )}

        {/* Programs */}
        {type === "programs" && (
          <Stack spacing={2}>
            <TextField
              fullWidth
              size="small"
              label="Program Code"
              value={formData.code || ""}
              onChange={(e) => handleChange("code", e.target.value)}
            />
            <TextField
              fullWidth
              size="small"
              label="Program Name"
              value={formData.name || ""}
              onChange={(e) => handleChange("name", e.target.value)}
            />
            <TextField
              select
              fullWidth
              size="small"
              label="Select Faculty"
              value={formData.facultyId || ""}
              onChange={(e) => handleChange("facultyId", e.target.value)}
            >
              {faculty?.length ? (
                faculty.map((d) => (
                  <MenuItem key={d.id} value={d.id}>
                    {d.name}
                  </MenuItem>
                ))
              ) : (
                <MenuItem disabled>No faculties available</MenuItem>
              )}
            </TextField>
          </Stack>
        )}
      </DialogContent>

      <DialogActions sx={{ p: 2 }}>
        {/* Cancel button - viền đỏ */}
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

        {/* Save button - xanh lá khi có dữ liệu */}
        <Button
          onClick={handleSave}
          variant="contained"
          disabled={!isFormFilled}
          sx={{
            borderRadius: 2,
            px: 3,
            backgroundColor: isFormFilled ? "success.main" : "grey.400",
            "&:hover": {
              backgroundColor: isFormFilled ? "success.dark" : "grey.500",
            },
          }}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
