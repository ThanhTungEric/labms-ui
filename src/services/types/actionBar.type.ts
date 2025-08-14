export interface actionBar {
  onImport?: (file: File) => void;
  onExport?: () => void;
  onDelete?: (selectedIds: number[]) => void;
 selectedIds: number[]; }