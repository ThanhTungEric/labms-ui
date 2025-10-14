import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Box,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import ScheduleForm from "./ScheduleForm";

interface Props {
  open: boolean;
  onClose: () => void;
}

const CreateScheduleDialog: React.FC<Props> = ({ open, onClose }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: "16px",
          overflow: "hidden",
        },
      }}
    >
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          pb: 2,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Box
            sx={{
              width: 50,
              height: 50,
              borderRadius: 2,
              border: "2px solid #e0e0e0",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <EventAvailableIcon
              sx={{ color: "rgba(0,0,0,0.6)" }}
              fontSize="large"
            />
          </Box>
          <Box>
            <Typography variant="h6" fontWeight={700} lineHeight={1.4}>
              Create Schedule
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Fill in the details below to add a schedule.
            </Typography>
          </Box>
        </Box>

        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers>
        <Box sx={{ mt: 2 }}>
          <ScheduleForm onSubmit={onClose} />
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default CreateScheduleDialog;
