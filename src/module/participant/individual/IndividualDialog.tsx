import React from "react";
import { Box, CircularProgress } from "@mui/material";
import { DynamicModal, StyledTextBox, SaveButton, CancelButton } from "@/components";
import type { IndividualGuestParticipant } from "@/services/types";
import { useIgpForm } from "@/services/hooks";

interface Props {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  person?: IndividualGuestParticipant | null;
}

const IndividualDialog: React.FC<Props> = ({ open, onClose, onSuccess, person }) => {
  const { form, change, submit, busy, isEditing } = useIgpForm(person);

  return (
    <DynamicModal open={open} onClose={onClose} title={isEditing ? "Edit participant" : "Add participant"}>
      <Box component="form" onSubmit={(e) => { e.preventDefault(); submit(onSuccess, onClose); }}>
        <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
          <StyledTextBox label="First name" value={form.firstName} isEditing onChange={(v) => change("firstName", v)} />
          <StyledTextBox label="Middle name" value={form.middleName || ""} isEditing onChange={(v) => change("middleName", v)} />
          <StyledTextBox label="Last name" value={form.lastName} isEditing onChange={(v) => change("lastName", v)} />
          <StyledTextBox label="Title" value={form.title || ""} isEditing onChange={(v) => change("title", v)} />
          <StyledTextBox label="Email" value={form.email || ""} isEditing onChange={(v) => change("email", v)} />
          <StyledTextBox label="Phone" value={form.phoneNumber || ""} isEditing onChange={(v) => change("phoneNumber", v)} />
          <StyledTextBox label="Description" value={form.description || ""} isEditing onChange={(v) => change("description", v)} />
        </Box>

        <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1, mt: 3 }}>
          <CancelButton onClick={onClose} />
          <SaveButton
            onClick={() => submit(onSuccess, onClose)}
            variant="contained"
            disabled={busy}
            startIcon={busy ? <CircularProgress size={20} /> : undefined}
          />
        </Box>
      </Box>
    </DynamicModal>
  );
};

export default IndividualDialog;
