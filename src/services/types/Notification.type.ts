export interface NotificationProps {
  open: boolean;
  message: string;
  severity?: 'success' | 'error' | 'warning' | 'info';
  onClose: () => void;
  autoHideDuration?: number;
}
export type NotificationSeverity = 'success' | 'error' | 'info' | 'warning';

export interface Notify {
  open: boolean;
  message: string;
  severity: NotificationSeverity;
}