export interface actionBar {
  type: string;
  onImport?: (file: File) => void;
  onExport?: () => void;
  onAdd?: () => void;
  onDelete?: (selectedIds: number[]) => void;
  selectedIds: number[];
}