import { JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal, useState } from "react";
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
import {  faculties, fucultyItems } from "../services/types/faculties.type";

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
          {type === "forms" && "Add New Forms"}
          {type === "academic-titles" && "Add New Academic Title"}
          {type === "functional-categories" && "Add New Functional Catgories"}
          {type === "functional-domains" && "Add New Functional Domains"}
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
                  label="Functional Categories Label"
                  value={formData.label || ""}
                  onChange={(e) => handleChange("label", e.target.value)}
                />
             
                <TextField
                  fullWidth
                  size="small"
                  variant="outlined"
                  label="Functional Categories Description"
                  value={formData.description || ""}
                  onChange={(e) => handleChange("description", e.target.value)}
                />
              </Stack>
            </>
          )}
          {type === "forms" && (
            <>
              <Stack spacing={2}>
                <TextField
                  fullWidth
                  size="small"
                  variant="outlined"
                  label="Equipment Forms Name"
                  value={formData.name || ""}
                  onChange={(e) => handleChange("name", e.target.value)}
                />
             
                <TextField
                  fullWidth
                  size="small"
                  variant="outlined"
                  label="Equipment Forms Description"
                  value={formData.description || ""}
                  onChange={(e) => handleChange("description", e.target.value)}
                />
              </Stack>
            </>
          )}
          
          {type === "functional-domains" && (
            <>
              <Stack spacing={2}>
                <TextField
                  fullWidth
                  size="small"
                  variant="outlined"
                  label="Functional Domains Label"
                  value={formData.label || ""}
                  onChange={(e) => handleChange("label", e.target.value)}
                />
             
                <TextField
                  fullWidth
                  size="small"
                  variant="outlined"
                  label="Functional Domains Description"
                  value={formData.description || ""}
                  onChange={(e) => handleChange("description", e.target.value)}
                />
              </Stack>
            </>
          )}
          {type === "programs" && (
            <>
              <Stack spacing={2}>
                <TextField
                  fullWidth
                  size="small"
                  variant="outlined"
                  label="Functional Domains Label"
                  value={formData.code || ""}
                  onChange={(e) => handleChange("code", e.target.value)}
                />
             
                <TextField
                  fullWidth
                  size="small"
                  variant="outlined"
                  label="Functional Domains Description"
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
                  {faculty && faculty.length > 0 ? (
                    faculty.map((d) => (
                      <MenuItem key={d.id} value={d.id}>
                        {d.name}
                      </MenuItem>
                    ))
                  ) : (
                    <MenuItem disabled>No faculties</MenuItem>
                  )}
                </TextField>

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
