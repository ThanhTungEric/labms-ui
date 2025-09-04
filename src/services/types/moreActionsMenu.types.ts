export interface MoreActionItem {
    key: string;
    label: string;
}

export interface MoreActionsMenuProps {
    items: MoreActionItem[];
    onActionClick: (key: string) => void;
    label?: string;
}