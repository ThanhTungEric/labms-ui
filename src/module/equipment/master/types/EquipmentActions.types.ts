import type { MoreActionItem } from "@/services/types";

export interface EquipmentActionsProps {
    selectedItemId: number | null;
    canAdd: boolean;
    moreActionItems: MoreActionItem[];
    onAdd: () => void;
    onEdit: () => void;
    onDelete: () => void;
    onExportReport: () => void;
    onMoreActionClick: (key: string) => void;
    searchValue: string;
    onSearchChange: (v: string) => void;
    onColumnClick: () => void;
}