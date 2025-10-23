import React, { useMemo, useRef } from 'react';
import { Box, Chip, CircularProgress, Typography } from '@mui/material';
import { DynamicModal, StyledTextBox, SaveButton, CancelButton, StyledMultiSelect } from '@/components';
import { useEquipmentForm, useEquipmentForms, useFunctionalCategories, useFunctionalDomains } from '@/services/hooks';
import type { Equipment } from '@/services/types';

const EquipmentDialog: React.FC<{ open: boolean; onClose: () => void; onSuccess: () => void; equipment?: Equipment | null; }> = ({ open, onClose, onSuccess, equipment }) => {
    const { formState, isEditing, busy, error, handleInputChange, handleMultiSelectChange, handleFormSelectChange, handleSubmit } = useEquipmentForm(equipment);
    const formsParams = useMemo(() => ({}), []);
const { 
        forms, 
        loadingForms,  
        errorForms   
    } = useEquipmentForms(formsParams);
    const emptyParams = useRef({}).current;
    const { functionalCategories: categories, loadingFunctionalCategories: loadingCategories } = useFunctionalCategories(emptyParams);
    const { functionalDomains: domains, loadingFunctionalDomains: loadingDomains } = useFunctionalDomains(emptyParams);
    const isLoading = loadingForms || loadingCategories || loadingDomains;

    if (errorForms) return (<DynamicModal open={open} onClose={onClose} title="Error"><Typography color="error.main">Failed to load equipment forms</Typography></DynamicModal>);

    return (
        <DynamicModal open={open} onClose={onClose} title={isEditing ? 'Edit equipment' : 'Add new equipment'}>
            <Box component="form" onSubmit={(e) => { e.preventDefault(); handleSubmit(onSuccess, onClose); }}>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: 2 }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, flex: 1, minWidth: '45%' }}>
                        <StyledTextBox label="Code" value={formState.code} isEditing onChange={(v) => handleInputChange('code', v)} />
                        <StyledTextBox label="Name" value={formState.name} isEditing onChange={(v) => handleInputChange('name', v)} />
                        <StyledTextBox label="Manufacturer" value={formState.manufacturer} isEditing onChange={(v) => handleInputChange('manufacturer', v)} />
                        <StyledTextBox label="Price" value={formState.price} isEditing onChange={(v) => handleInputChange('price', v)} />
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, flex: 1, minWidth: '45%' }}>
                        <StyledTextBox label="Model Code" value={formState.modelCode} isEditing onChange={(v) => handleInputChange('modelCode', v)} />
                        {isLoading ? (
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                <CircularProgress size={20} />
                                <Typography>Loading options...</Typography>
                            </Box>
                        ) : (
                            <>
                                <StyledMultiSelect label="Select Form" items={forms.map(f => ({ key: String(f.id), label: f.name }))} selectedKeys={formState.formId ? [String(formState.formId)] : []} onSelectChange={handleFormSelectChange} />

                                <Box>
                                    <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 700, fontSize: 14, mb: 1 }}>Categories:</Typography>
                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 1 }}>
                                        {(formState.categoryIds || []).map(id => {
                                            const cat = (categories || []).find(c => c.id === id);
                                            return (
                                                <Chip
                                                    key={id}
                                                    label={cat ? cat.label : `Category ${id}`}
                                                    onDelete={() => handleMultiSelectChange('categoryIds', formState.categoryIds.filter(cid => cid !== id).map(String))}
                                                    size="small"
                                                />
                                            );
                                        })}
                                    </Box>
                                    <StyledMultiSelect label="Add categories" items={(categories || []).map(c => ({ key: String(c.id), label: c.label }))} selectedKeys={(formState.categoryIds || []).map(String)} onSelectChange={(keys) => handleMultiSelectChange('categoryIds', keys)} />
                                </Box>

                                <Box>
                                    <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 700, fontSize: 14, mb: 1 }}>Domains:</Typography>
                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 1 }}>
                                        {(formState.domainIds || []).map(id => {
                                            const domain = (domains || []).find(d => d.id === id);
                                            return (
                                                <Chip
                                                    key={id}
                                                    label={domain ? domain.label : `Domain ${id}`}
                                                    onDelete={() => handleMultiSelectChange('domainIds', formState.domainIds.filter(did => did !== id).map(String))}
                                                    size="small"
                                                />
                                            );
                                        })}
                                    </Box>
                                    <StyledMultiSelect label="Add domains" items={(domains || []).map(d => ({ key: String(d.id), label: d.label }))} selectedKeys={(formState.domainIds || []).map(String)} onSelectChange={(keys) => handleMultiSelectChange('domainIds', keys)} />
                                </Box>
                            </>
                        )}
                    </Box>
                </Box>

                {error && <Box sx={{ color: 'error.main', mt: 2 }}>{error.message}</Box>}
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1, mt: 3 }}>
                    <CancelButton onClick={onClose} />
                    <SaveButton onClick={() => handleSubmit(onSuccess, onClose)} variant="contained" disabled={busy} startIcon={busy ? <CircularProgress size={20} /> : undefined} />
                </Box>
            </Box>
        </DynamicModal>
    );
};

export default EquipmentDialog;
