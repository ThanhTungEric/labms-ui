import React from 'react';
import { Box, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import MoreActionsMenu, { MoreActionItem } from '../../../components/MoreActionsMenu';
import ExportReportButton from '../../../components/ExportReportButton';

interface LabActionsProps {
    selectedItemId: number | null;
    canAdd: boolean;
    moreActionItems: MoreActionItem[];
    onAdd: () => void;
    onEdit: () => void;
    onDelete: () => void;
    onExportReport: () => void;
    onMoreActionClick: (key: string) => void;
}

const LabActions: React.FC<LabActionsProps> = ({
    selectedItemId,
    canAdd,
    moreActionItems,
    onAdd,
    onEdit,
    onDelete,
    onExportReport,
    onMoreActionClick,
}) => {
    return (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1.5, flexWrap: 'wrap' }}>
            <MoreActionsMenu items={moreActionItems} onActionClick={onMoreActionClick} />

            <IconButton size="small" onClick={onAdd} disabled={!canAdd}>
                <AddIcon />
            </IconButton>
            <IconButton
                size="small"
                onClick={onEdit}
                disabled={selectedItemId == null}
            >
                <EditIcon />
            </IconButton>
            <IconButton
                size="small"
                color="error"
                onClick={onDelete}
                disabled={selectedItemId == null}
            >
                <DeleteIcon />
            </IconButton>

            <ExportReportButton onClick={onExportReport} />
        </Box>
    );
};

export default LabActions;