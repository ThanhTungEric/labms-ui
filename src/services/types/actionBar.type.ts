export interface actionBar {
  onImport?: (file: File) => void;
  onExport?: () => void;
   onAdd?: () => void;
  onDelete?: (selectedIds: number[]) => void;
 selectedIds: number[]; }