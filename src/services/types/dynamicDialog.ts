export interface DynamicDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void | Promise<void>;
  title: string;
  content: string;
  confirmLabel?: string;
  cancelLabel?: string;
  confirmColor?: "error" | "primary" | "secondary" | "success" | "info" | "warning";
}