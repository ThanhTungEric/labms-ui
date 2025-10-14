import React from "react";
import {
  Box,
  CircularProgress,
  Chip,
  Stack,
  Typography,
} from "@mui/material";
import { DynamicModal, StyledTextBox, SaveButton, CancelButton, StyledTextWithButton } from "@/components";

import type { GroupGuestParticipant as Participant } from "@/services/types";
import { useGgpForm } from "@/services/hooks";

interface Props {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  participant?: Participant | null;
}

const ParticipantDialog: React.FC<Props> = ({ open, onClose, onSuccess, participant }) => {
  const { form, change, submit, busy, isEditing } = useGgpForm(participant ?? null);

  const [memberInput, setMemberInput] = React.useState<string>("");

  const addMembers = (raw: string) => {
    const parts = raw
      .split(/[,;\n]/)
      .map((x) => x.trim())
      .filter(Boolean);

    if (!parts.length) return;

    const current = form.members ?? [];
    const existing = new Set(current.map((m) => m.trim()));
    const next = [...current];

    for (const p of parts) {
      if (!existing.has(p)) {
        existing.add(p);
        next.push(p);
      }
    }
    change("members", next);
  };

  const addMemberFromInput = () => {
    if (!memberInput.trim()) return;
    addMembers(memberInput);
    setMemberInput("");
  };

  const removeMember = (m: string) => {
    const next = (form.members ?? []).filter((x) => x !== m);
    change("members", next);
  };

  const handleSubmit = () => {
    submit(onSuccess, onClose);
  };

  return (
    <DynamicModal open={open} onClose={onClose} title={isEditing ? "Edit participant" : "Add participant"}>
      <Box
        component="form"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
          <StyledTextBox label="Name" value={form.name} isEditing onChange={(v) => change("name", v)} />
          <StyledTextBox label="Email" value={form.email || ""} isEditing onChange={(v) => change("email", v)} />
          <StyledTextBox label="Phone" value={form.phoneNumber || ""} isEditing onChange={(v) => change("phoneNumber", v)} />
          <StyledTextBox label="Description" value={form.description || ""} isEditing onChange={(v) => change("description", v)} />
        </Box>

        <Box sx={{ mt: 2 }}>
          <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 700, fontSize: 14, mb: 1 }}>
            Members:
          </Typography>

          <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap" sx={{ mb: 1 }}>
            {(form.members ?? []).length > 0 ? (
              (form.members ?? []).map((m) => (
                <Chip key={m} label={m} onDelete={() => removeMember(m)} size="small" />
              ))
            ) : (
              <Typography variant="body2" color="text.disabled">No members</Typography>
            )}
          </Stack>

          <StyledTextWithButton
            label="Add member"
            value={memberInput}
            placeholder="Enter name"
            onChange={setMemberInput}
            onSubmit={addMemberFromInput}
            buttonAriaLabel="add member"
            buttonTooltip="Add member"
          />

          <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: "block" }}>
            Tip: you can paste multiple names separated by commas/semicolons or new lines, then press Enter to add them in bulk.
          </Typography>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1, mt: 3 }}>
          <CancelButton onClick={onClose} />
          <SaveButton
            onClick={handleSubmit}
            variant="contained"
            disabled={busy}
            startIcon={busy ? <CircularProgress size={20} /> : undefined}
          />
        </Box>
      </Box>
    </DynamicModal>
  );
};

export default ParticipantDialog;
