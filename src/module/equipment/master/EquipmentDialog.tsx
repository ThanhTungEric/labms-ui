// src/components/dialogs/EquipmentDialog.tsx
import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import { styled } from '@mui/system';

import { DynamicModal, StyledTextBox, SaveButton, CancelButton, StyledMultiSelect } from '@/components';

import { useEquipmentForm } from '@/services/hooks';
import type { EquipmentListItem } from '@/services/types';

interface EquipmentDialogProps {
    open: boolean;
    onClose: () => void;
    onSuccess: () => void;
    equipment?: EquipmentListItem | null;
}

const StyledMultiSelectWithLabel = styled(Box)({
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    flex: 1,
});

const formsData = [
    { id: 1, name: 'Form A' },
    { id: 2, name: 'Form B' },
    { id: 3, name: 'Form C' },
];

const categoriesData = [
    { id: 101, label: 'Category A' },
    { id: 102, label: 'Category B' },
    { id: 103, label: 'Category C' },
];

const domainsData = [
    { id: 201, label: 'Domain X' },
    { id: 202, label: 'Domain Y' },
    { id: 203, label: 'Domain Z' },
];

const EquipmentDialog: React.FC<EquipmentDialogProps> = ({
    open,
    onClose,
    onSuccess,
    equipment,
}) => {
    const {
        formState,
        isEditing,
        busy,
        error,
        handleInputChange,
        handleMultiSelectChange,
        handleFormSelectChange,
        handleSubmit,
    } = useEquipmentForm(equipment);

    return (
        <DynamicModal
            open={open}
            onClose={onClose}
            title={isEditing ? 'Edit equipment' : 'Add new equipment'}
        >
            <Box component="form" onSubmit={(e) => { e.preventDefault(); handleSubmit(onSuccess, onClose); }}>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: 2 }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, flex: 1, minWidth: '45%' }}>
                        <StyledTextBox
                            label="Code"
                            value={formState.code}
                            isEditing={true}
                            onChange={(value) => handleInputChange('code', value)}
                        />
                        <StyledTextBox
                            label="Name"
                            value={formState.name}
                            isEditing={true}
                            onChange={(value) => handleInputChange('name', value)}
                        />
                        <StyledTextBox
                            label="Manufacturer"
                            value={formState.manufacturer}
                            isEditing={true}
                            onChange={(value) => handleInputChange('manufacturer', value)}
                        />
                        <StyledTextBox
                            label="Price"
                            value={formState.price}
                            isEditing={true}
                            onChange={(value) => handleInputChange('price', value)}
                        />
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, flex: 1, minWidth: '45%' }}>
                        <StyledTextBox
                            label="Model Code"
                            value={formState.modelCode}
                            isEditing={true}
                            onChange={(value) => handleInputChange('modelCode', value)}
                        />

                        <StyledMultiSelectWithLabel>
                            <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 700, fontSize: 14, flexShrink: 0 }}>
                                Select Form:
                            </Typography>
                            <StyledMultiSelect
                                label="Select Form"
                                items={formsData.map(f => ({ key: String(f.id), label: f.name }))}
                                selectedKeys={formState.formId ? [String(formState.formId)] : []}
                                onSelectChange={handleFormSelectChange}
                            />
                        </StyledMultiSelectWithLabel>

                        <StyledMultiSelectWithLabel>
                            <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 700, fontSize: 14, flexShrink: 0 }}>
                                Categories:
                            </Typography>
                            <StyledMultiSelect
                                label="Categories"
                                items={categoriesData.map(c => ({ key: String(c.id), label: c.label }))}
                                selectedKeys={formState.categoryIds.map(String)}
                                onSelectChange={(keys) => handleMultiSelectChange('categoryIds', keys)}
                            />
                        </StyledMultiSelectWithLabel>

                        <StyledMultiSelectWithLabel>
                            <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 700, fontSize: 14, flexShrink: 0 }}>
                                Domains:
                            </Typography>
                            <StyledMultiSelect
                                label="Domains"
                                items={domainsData.map(d => ({ key: String(d.id), label: d.label }))}
                                selectedKeys={formState.domainIds.map(String)}
                                onSelectChange={(keys) => handleMultiSelectChange('domainIds', keys)}
                            />
                        </StyledMultiSelectWithLabel>
                    </Box>
                </Box>

                {error && <Box sx={{ color: 'error.main', mt: 2 }}>{error.message}</Box>}

                <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1, mt: 3 }}>
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

export default EquipmentDialog;