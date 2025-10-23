import React from "react";
import {
  Box,
  CircularProgress,
  Chip,
  Stack,
  Typography,
} from "@mui/material";
import { DynamicModal, StyledTextBox, SaveButton, CancelButton, StyledTextWithButton, StyledMultiSelect } from "@/components";

import type { Staff, AcademicTitle, Program } from "@/services/types";
import { useStaffForm, usePrograms, useAcademicTitles } from "@/services/hooks";

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
    addStringItems,
    removeStringItem,
  } = useStaffForm(staff);

  const [expertiseInput, setExpertiseInput] = React.useState<string>("");

  const handleAddExpertise = () => {
    if (!expertiseInput.trim()) return;
    addStringItems('expertises', expertiseInput);
    setExpertiseInput("");
  };

  const handleRemoveExpertise = (e: string) => {
    removeStringItem('expertises', e);
  };

  const { programs, loadingPrograms, errorPrograms } = usePrograms({ searchKeyword: "" });
  const { academicTitles, loadingAcademicTitles, errorAcademicTitles } = useAcademicTitles({ search: "" });

  // Handler cho Programs: Cập nhật trực tiếp vào form.programIds
  const handleProgramChange = (keys: string[]) => {
    change("programIds", keys.map(Number)); // Chuyển string sang number vì program.id là number
  };

  // Handler cho Academic Titles: Cập nhật trực tiếp vào form.academicTitleIds
  const handleAcademicTitleChange = (keys: string[]) => {
    change("academicTitleIds", keys.map(Number)); // Chuyển string sang number vì title.id là number
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
          <StyledTextBox label="Code" value={form.code} isEditing onChange={(v) => change("code", v)} />
          <StyledTextBox label="Function" value={form.function} isEditing onChange={(v) => change("function", v)} />
          <StyledTextBox label="First Name" value={form.firstName} isEditing onChange={(v) => change("firstName", v)} />
          <StyledTextBox label="Middle Name" value={form.middleName || ""} isEditing onChange={(v) => change("middleName", v)} />
          <StyledTextBox label="Last Name" value={form.lastName} isEditing onChange={(v) => change("lastName", v)} />
          <StyledTextBox label="Title" value={form.title || ""} isEditing onChange={(v) => change("title", v)} />
          <StyledTextBox label="Email" value={form.email || ""} isEditing onChange={(v) => change("email", v)} />
          <StyledTextBox label="Phone" value={form.phoneNumber || ""} isEditing onChange={(v) => change("phoneNumber", v)} />
        </Box>

        <Box sx={{ mt: 2 }}>
          <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 700, fontSize: 14, mb: 1 }}>
            Expertises:
          </Typography>

          <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap" sx={{ mb: 1 }}>
            {(form.expertises ?? []).length > 0 ? (
              (form.expertises ?? []).map((e, index) => (
                <Chip
                  key={index}
                  label={e}
                  onDelete={() => handleRemoveExpertise(e)}
                  size="small"
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
        </Box>

        <Box sx={{ mt: 2 }}>
          <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 700, fontSize: 14 }}>
            Selected Programs:
          </Typography>
          <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
            {form.programIds.length > 0 ? (
              form.programIds.map((programId) => {
                const program = programs.find((p) => p.id === programId);
                return (
                  program && (
                    <Chip
                      key={program.id}
                      label={program.name}
                      onDelete={() => {
                        const newIds = form.programIds.filter((id) => id !== program.id);
                        change("programIds", newIds); // Cập nhật form.programIds khi xóa Chip
                      }}
                      size="small"
                    />
                  )
                );
              })
            ) : (
              <Typography variant="body2" color="text.disabled">No programs selected</Typography>
            )}
          </Stack>
        </Box>
        <Box sx={{ mt: 1 }}>
          {loadingPrograms ? (
            <CircularProgress size={20} />
          ) : errorPrograms ? (
            <Typography variant="body2" color="error">{errorPrograms.message}</Typography>
          ) : (
            <StyledMultiSelect
              label="Programs"
              items={programs.map((program) => ({ key: program.id.toString(), label: program.name }))}
              selectedKeys={form.programIds.map((id) => id.toString())} // Dùng form.programIds
              onSelectChange={handleProgramChange}
              multiple
              placeholder="Select programs"
            />
          )}
        </Box>

        <Box sx={{ mt: 2 }}>
          <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 700, fontSize: 14 }}>
            Selected Academic Titles:
          </Typography>
          <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap" sx={{ mb: 1 }}>
            {form.academicTitleIds.length > 0 ? (
              form.academicTitleIds.map((titleId) => {
                const title = academicTitles.find((t) => t.id === titleId);
                return (
                  title && (
                    <Chip
                      key={title.id}
                      label={title.label}
                      onDelete={() => {
                        const newIds = form.academicTitleIds.filter((id) => id !== title.id);
                        change("academicTitleIds", newIds);
                      }}
                      size="small"
                    />
                  )
                );
              })
            ) : (
              <Typography variant="body2" color="text.disabled">No academic titles selected</Typography>
            )}
          </Stack>
        </Box>
        <Box sx={{ mt: 1 }}>
          {loadingAcademicTitles ? (
            <CircularProgress size={20} />
          ) : errorAcademicTitles ? (
            <Typography variant="body2" color="error">{errorAcademicTitles.message}</Typography>
          ) : (
            <StyledMultiSelect
              label="Academic Titles"
              items={academicTitles.map((title) => ({ key: title.id.toString(), label: title.label }))}
              selectedKeys={form.academicTitleIds.map((id) => id.toString())} // Dùng form.academicTitleIds
              onSelectChange={handleAcademicTitleChange}
              multiple
              placeholder="Select academic titles"
            />
          )}
        </Box>

        <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: "block" }}>
          Tip: paste multiple expertises separated by commas/semicolons or new lines, then press Enter.
        </Typography>

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