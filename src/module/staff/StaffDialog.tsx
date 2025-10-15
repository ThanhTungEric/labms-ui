import React from "react";
import {
  Box,
  CircularProgress,
  Chip,
  Stack,
  Typography,
} from "@mui/material";
import { DynamicModal, StyledTextBox, SaveButton, CancelButton, StyledTextWithButton } from "@/components";

import type { Staff, AcademicTitle, Program } from "@/services/types";
import { useStaffForm, useProgramsCSM, useAcademicTitles } from "@/services/hooks";

interface Props {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  staff?: Staff | null;
}

const StaffDialog: React.FC<Props> = ({ open, onClose, onSuccess, staff }) => {
  const { 
    form, 
    change, 
    submit, 
    busy, 
    isEditing, 
    addStringItems, // Lấy hàm mới từ hook
    removeStringItem, // Lấy hàm mới từ hook
  } = useStaffForm(staff);
  
  // State quản lý input tạm thời cho Expertises
  const [expertiseInput, setExpertiseInput] = React.useState<string>("");
  
  // Hàm xử lý việc thêm Expertises từ input
  const handleAddExpertise = () => {
    if (!expertiseInput.trim()) return;
    addStringItems('expertises', expertiseInput);
    setExpertiseInput("");
  };

  // Hàm xử lý việc xóa Expertises
  const handleRemoveExpertise = (e: string) => {
    removeStringItem('expertises', e);
  };

// ----------------------------------------------------------------------
// HIỂN THỊ CHIP CHO MẢNG READ-ONLY
// ----------------------------------------------------------------------

  // Hàm render Chip cho mảng object (academicTitles, programs)
  // Lưu ý: Vì dialog này chỉ làm việc với IDs (academicTitleIds, programIds) 
  // trong StaffFormState, ta phải dựa vào prop 'staff' (chứa object) để hiển thị tên.
  // Việc thêm/xóa CHÍNH XÁC phải dùng Autocomplete cho ID, nhưng ta chỉ hiển thị Read-Only.
  const renderObjectChips = (data: AcademicTitle[] | Program[] | undefined) => {
    const items = data ?? [];
    return (
        <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
            {items.length > 0 ? (
                items.map((item) => (
                    // Chỉ hiển thị tên, không có chức năng xóa (read-only)
                    <Chip 
                        key={item.id} 
                        label={item.name} 
                        size="small"
                        variant="outlined" // Dùng variant khác để phân biệt
                    />
                ))
            ) : (
                <Typography variant="body2" color="text.disabled">None</Typography>
            )}
        </Stack>
    );
  };
  

  return (
    <DynamicModal 
      open={open} 
      onClose={onClose} 
      title={isEditing ? "Edit Staff" : "Add Staff"}
    >
      <Box 
        component="form" 
        onSubmit={(e) => { 
          e.preventDefault(); 
          submit(onSuccess, onClose); 
        }}
      >
        <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
          {/* CÁC TRƯỜNG CƠ BẢN */}
          <StyledTextBox label="Code" value={form.code} isEditing onChange={(v) => change("code", v)} />
          <StyledTextBox label="Function" value={form.function} isEditing onChange={(v) => change("function", v)} />
          
          <StyledTextBox label="First Name" value={form.firstName} isEditing onChange={(v) => change("firstName", v)} />
          <StyledTextBox label="Middle Name" value={form.middleName || ""} isEditing onChange={(v) => change("middleName", v)} />
          <StyledTextBox label="Last Name" value={form.lastName} isEditing onChange={(v) => change("lastName", v)} />

          <StyledTextBox label="Title" value={form.title || ""} isEditing onChange={(v) => change("title", v)} />
          <StyledTextBox label="Email" value={form.email || ""} isEditing onChange={(v) => change("email", v)} />
          <StyledTextBox label="Phone" value={form.phoneNumber || ""} isEditing onChange={(v) => change("phoneNumber", v)} />
        </Box>

        {/* --- EXPERTISES FIELD (CHỨC NĂNG THÊM/XÓA) --- */}
        <Box sx={{ mt: 2 }}>
          <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 700, fontSize: 14, mb: 1 }}>
            Expertises:
          </Typography>
          
          {/* Hiển thị Expertises chips */}
          <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap" sx={{ mb: 1 }}>
            {(form.expertises ?? []).length > 0 ? (
                (form.expertises ?? []).map((e, index) => (
                    <Chip 
                        key={index} 
                        label={e} 
                        onDelete={() => handleRemoveExpertise(e)} 
                        size="small" 
                        color="primary"
                    />
                ))
            ) : (
                <Typography variant="body2" color="text.disabled">No expertises</Typography>
            )}
          </Stack>

          <StyledTextWithButton
            label="Add expertise"
            value={expertiseInput}
            placeholder="Enter expertise"
            onChange={setExpertiseInput}
            onSubmit={handleAddExpertise}
            buttonAriaLabel="add expertise"
            buttonTooltip="Add expertise"
          />

          <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: "block" }}>
            Tip: paste multiple expertises separated by commas/semicolons or new lines, then press Enter.
          </Typography>
        </Box>
        
        {/* --- ACADEMIC TITLES FIELD (READ-ONLY) --- */}
        <Box sx={{ mt: 2 }}>
            <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 700, fontSize: 14, mb: 1 }}>
                Academic Titles (Read-only):
            </Typography>
            {/* Dùng staff.academicTitles (chứa object) để hiển thị tên */}
            {renderObjectChips(staff?.academicTitles)}
        </Box>
        
        {/* --- PROGRAMS FIELD (READ-ONLY) --- */}
        <Box sx={{ mt: 2 }}>
            <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 700, fontSize: 14, mb: 1 }}>
                Programs (Read-only):
            </Typography>
            {/* Dùng staff.programs (chứa object) để hiển thị tên */}
            {renderObjectChips(staff?.programs)}
        </Box>


        {/* HÀNH ĐỘNG */}
        <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1, mt: 3 }}>
          <CancelButton onClick={onClose} />
          <SaveButton
            type="submit"
            variant="contained"
            disabled={busy}
            startIcon={busy ? <CircularProgress size={20} /> : undefined}
          />
        </Box>
      </Box>
    </DynamicModal>
  );
};

export default StaffDialog;