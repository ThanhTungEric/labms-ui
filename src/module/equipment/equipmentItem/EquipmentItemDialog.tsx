import React, { useEffect } from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';
import {
    DynamicModal,
    StyledTextBox,
    SaveButton,
    CancelButton,
} from '@/components';
import StyledMultiSelect from '@/components/StyledMultiSelect';
import { useEquipmentItemForm } from '@/services/hooks';
import type { EquipmentItem } from '@/services/types';

interface EquipmentItemDialogProps {
    open: boolean;
    onClose: () => void;
    onSuccess: () => void;
    item?: EquipmentItem | null;
}

const EquipmentItemDialog: React.FC<EquipmentItemDialogProps> = ({
    open,
    onClose,
    onSuccess,
    item,
}) => {
    const {
        formState,
        busy,
        error,
        handleInputChange,
        handleSelectChange,
        handleSubmit,
        baseOptions,
        labOptions,
        statusOptions,
        loadingOptions,
    } = useEquipmentItemForm(item);

    const isEditing = !!item;
    return (
        <DynamicModal
            open={open}
            onClose={onClose}
            title={isEditing ? 'Edit Equipment Item' : 'Add Equipment Item'}
            key={isEditing ? item?.id : 'new'}
        >
            <Box
                component="form"
                onSubmit={(e) => {
                    e.preventDefault();
                    handleSubmit(onSuccess, onClose);
                }}
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 3,
                }}
            >
                {loadingOptions ? (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <CircularProgress size={20} />
                        <Typography>Loading options...</Typography>
                    </Box>
                ) : (
                    <Box
                        sx={{
                            display: 'flex',
                            gap: 3,
                            alignItems: 'flex-start',
                            justifyContent: 'space-between',
                        }}
                    >
                        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
                            <StyledTextBox
                                label="Serial Number"
                                value={formState.serialNumber}
                                isEditing
                                onChange={(v) => handleInputChange('serialNumber', v)}
                            />

                            <StyledMultiSelect
                                label="Base Equipment"
                                items={baseOptions}
                                selectedKeys={formState.baseId ? [String(formState.baseId)] : []}
                                onSelectChange={(keys) =>
                                    handleSelectChange('baseId', keys[0] ? Number(keys[0]) : '')
                                }
                                multiple={false}
                                fullWidth
                            />

                            <StyledTextBox
                                label="Purchase Date"
                                type="date"
                                value={formState.purchaseDate}
                                onChange={(v) => handleInputChange('purchaseDate', v)}
                            />
                        </Box>

                        {/* ✅ Cột phải */}
                        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
                            <StyledMultiSelect
                                label="Lab"
                                items={labOptions}
                                selectedKeys={formState.labId ? [String(formState.labId)] : []}
                                onSelectChange={(keys) =>
                                    handleSelectChange('labId', keys[0] ? Number(keys[0]) : '')
                                }
                                multiple={false}
                                fullWidth
                            />

                            <StyledMultiSelect
                                label="Status"
                                items={statusOptions}
                                selectedKeys={formState.statusId ? [String(formState.statusId)] : []}
                                onSelectChange={(keys) =>
                                    handleSelectChange('statusId', keys[0] ? Number(keys[0]) : '')
                                }
                                multiple={false}
                                fullWidth
                            />

                            <StyledTextBox
                                label="Warranty Expiration"
                                type="date"
                                value={formState.warrantyExpiration}
                                onChange={(v) => handleInputChange('warrantyExpiration', v)}
                            />
                        </Box>
                    </Box>
                )}

                {error && (
                    <Box sx={{ color: 'error.main', mt: 1 }}>
                        {typeof error === 'string'
                            ? error
                            : (error as Error)?.message || 'An unexpected error occurred.'}
                    </Box>
                )}

                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        gap: 1.5,
                        mt: 1,
                    }}
                >
                    <CancelButton onClick={onClose} />
                    <SaveButton
                        onClick={() => handleSubmit(onSuccess, onClose)}
                        variant="contained"
                        disabled={busy}
                        startIcon={busy ? <CircularProgress size={20} /> : undefined}
                    />
                </Box>
            </Box>
        </DynamicModal>
    );
};

export default EquipmentItemDialog;
