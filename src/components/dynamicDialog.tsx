import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Slide
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import { DynamicDialogProps } from "../services/types/dynamicDialog";



// Transition animation (fade in from bottom)
const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children: React.ReactElement },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function DynamicDialog({
  open,
  onClose,
  onConfirm,
  title,
  content,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  confirmColor = "error",
}: DynamicDialogProps) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      TransitionComponent={Transition}
      keepMounted
      maxWidth="xs"
      fullWidth
    >
      <DialogTitle sx={{ fontWeight: "bold", textAlign: "center" }}>
        {title}
      </DialogTitle>
      <DialogContent>
        <Typography
          variant="body1"
          sx={{ textAlign: "center", mt: 1, mb: 1 }}
        >
          {content}
        </Typography>
      </DialogContent>
      <DialogActions sx={{ justifyContent: "center", pb: 2 }}>
        <Button
          onClick={onClose}
          variant="outlined"
          color="inherit"
          sx={{ minWidth: 100 }}
        >
          {cancelLabel}
        </Button>
        <Button
          onClick={onConfirm}
          variant="contained"
          color={confirmColor}
          sx={{ minWidth: 100 }}
        >
          {confirmLabel}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
