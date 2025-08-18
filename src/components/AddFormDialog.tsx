import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  MenuItem,
  Typography,
  Box,
  Stack
} from "@mui/material";
import Grid from "@mui/material/Grid";

interface AddDialogProps {
  type: string;
  open: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
}

export default function AddDialog({ type, open, onClose, onSave }: AddDialogProps) {
  const [formData, setFormData] = useState<any>({});

  const handleChange = (field: string, value: any) => {
    setFormData((prev: any) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    onSave(formData);
    setFormData({});
    onClose();
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
          {type === "faculty" && "Add New Faculty"}
          {type === "programs" && "Add New Program"}
          {type === "academic-titles" && "Add New Academic Title"}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Fill in the information below and click Save to add new.
        </Typography>
      </DialogTitle>

      <DialogContent dividers sx={{ mt: 1 }}>
          {/* Form cho "faculty" */}
          {type === "faculty" && (
            <>
            <Stack spacing={2}>
                <TextField
                fullWidth
                size="small"
                variant="outlined"
                label="Faculty name"
                value={formData.name || ""}
                onChange={(e) => handleChange("name", e.target.value)}
                />

                <TextField
                fullWidth
                size="small"
                variant="outlined"
                multiline
                rows={3}
                label="Description"
                value={formData.description || ""}
                onChange={(e) => handleChange("description", e.target.value)}
                />
            </Stack>
            </>
          )}

          {/* Form cho "programs" */}
          {type === "academic-titles" && (
            <>
              <Stack spacing={2}>
                <TextField
                  fullWidth
                  size="small"
                  variant="outlined"
                  label="Academic Title Label"
                  value={formData.label || ""}
                  onChange={(e) => handleChange("label", e.target.value)}
                />
                <TextField
                  fullWidth
                  size="small"
                  variant="outlined"
                  label="Academic Title Description"
                  value={formData.description || ""}
                  onChange={(e) => handleChange("description", e.target.value)}
                />
              
                {/* <TextField
                  select
                  fullWidth
                  size="small"
                  variant="outlined"
                  label="Vai Trò"
                  value={formData.role || ""}
                  onChange={(e) => handleChange("role", e.target.value)}
                >
                  <MenuItem value="admin">Admin</MenuItem>
                  <MenuItem value="editor">Editor</MenuItem>
                  <MenuItem value="viewer">Viewer</MenuItem>
                </TextField> */}
               </Stack>
            </>
          )}

          {/* Form cho "academic-titles" */}
          {type === "functional-categories" && (
            <>
              <Stack spacing={2}>
                <TextField
                  fullWidth
                  size="small"
                  variant="outlined"
                  label="Functional Categories Feild"
                  value={formData.field || ""}
                  onChange={(e) => handleChange("field", e.target.value)}
                />
             
                <TextField
                  fullWidth
                  size="small"
                  variant="outlined"
                  label="Functional Categories Direction"
                  value={formData.direction || ""}
                  onChange={(e) => handleChange("direction", e.target.value)}
                />
              </Stack>
            </>
          )}
      </DialogContent>

      <DialogActions sx={{ p: 2 }}>
        <Button
          onClick={onClose}
          variant="outlined"
          color="inherit"
          sx={{ borderRadius: 2 }}
        >
          Cancel
        </Button>
        <Button
          onClick={handleSave}
          variant="contained"
          color="primary"
          sx={{ borderRadius: 2, px: 3 }}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
