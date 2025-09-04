import React from 'react';
import {
    FormGroup, FormControlLabel, Checkbox, DialogContent,
    DialogActions, Button
} from '@mui/material';
import { DynamicModal } from '@/components';

interface ColumnSelectionDialogProps<T extends string> {
    open: boolean;
    onClose: () => void;
    allColumns: T[];
    columnsVisible: Record<T, boolean>;
    onColumnToggle: (field: T) => void;
}

const ColumnSelectionDialog = <T extends string>({
    open, onClose, allColumns, columnsVisible, onColumnToggle
}: ColumnSelectionDialogProps<T>) => {
    return (
        <DynamicModal
            open={open}
            onClose={onClose}
            title="Select Columns"
        >
            <DialogContent>
                <FormGroup>
                    {allColumns.map(field => (
                        <FormControlLabel
                            key={field}
                            control={
                                <Checkbox
                                    checked={columnsVisible[field]}
                                    onChange={() => onColumnToggle(field)}
                                />
                            }
                            label={field.charAt(0).toUpperCase() + field.slice(1)}
                        />
                    ))}
                </FormGroup>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Close</Button>
            </DialogActions>
        </DynamicModal>
    );
};

export default ColumnSelectionDialog;