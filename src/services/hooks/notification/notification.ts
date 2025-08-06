// hooks/useNotification.ts
import { useState } from 'react';

export type NotificationSeverity = 'success' | 'error' | 'info' | 'warning';

export interface Notify {
  open: boolean;
  message: string;
  severity: NotificationSeverity;
}

export function useNotification() {
  const [notify, setNotify] = useState<Notify>({
    open: false,
    message: '',
    severity: 'info',
  });

  const showNotification = (
    message: string,
    severity: NotificationSeverity = 'info'
  ) => {
    setNotify({ open: true, message, severity });
  };

  return {
    notify,
    showInfo: (msg: string) => showNotification(msg, 'info'),
    showSuccess: (msg: string) => showNotification(msg, 'success'),
    showError: (msg: string) => showNotification(msg, 'error'),
    showWarning: (msg: string) => showNotification(msg, 'warning'),
    close: () => setNotify((prev) => ({ ...prev, open: false })),
  };
}
