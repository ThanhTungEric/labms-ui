import type { MoreActionItem } from "@/services/types";

export interface ParticipantActionsProps {
  selectedItemId: number | null;
  canAdd: boolean;
  moreActionItems: MoreActionItem[];
  onAdd: () => void;
  onEdit: () => void;
  onDelete: () => void;
  onExportReport: () => void;
  onMoreActionClick: (key: string) => void;
  onColumnClick: () => void;
  searchValue: string;
  onSearchChange: (v: string) => void;
}
