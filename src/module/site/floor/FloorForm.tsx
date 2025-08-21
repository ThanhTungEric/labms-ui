import React, { useEffect, useMemo, useState } from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import StyledTextBox from '../../../components/StyledTextBox';
import SaveButton from '../../../components/SaveButton';
import CancelButton from '../../../components/CancelButton';
import StyledSearchSelect from '../../../components/StyledSearchSelect';
import { useBuildings } from '../../../services/hooks';

interface FloorFormProps {
    initialData?: {
        id: number;
        level: string;
        description: string;
        building: number | null;
    };

    isEditing: boolean;
    editingId?: number;
    onSave: (data: any) => void;
    onCancel: () => void;
}

const emptyForm = {
    level: '',
    description: '',
    building: null as number | null,
};

const FloorForm: React.FC<FloorFormProps> = ({ initialData, isEditing, editingId, onSave, onCancel }) => {
    const { buildings, loading: buildingsLoading, error: buildingsError } = useBuildings();

    const buildingItems = useMemo(
        () =>
            (buildings ?? []).map((b: any) => ({
                key: b.id,
                label: b.code ?? b.name ?? `Building #${b.id}`,
            })),
        [buildings]
    );

    const [formData, setFormData] = useState(() => initialData ?? emptyForm);

    useEffect(() => {
        if (isEditing && initialData) setFormData(initialData);
        if (!isEditing && !initialData) setFormData(emptyForm);
    }, [isEditing, initialData]);

    const handleInputChange = (field: string, value: any) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleBuildingSelect = (key: number | string | null) => {
        const value = key === null || key === '' ? null : Number(key);
        setFormData((prev) => ({ ...prev, building: value }));
    };

    const handleSubmit = () => {
        const payload = {
            ...formData,
            buildingId: formData.building,
        };
        onSave(payload);
    };

    if (buildingsLoading) {
        return (
            <Box sx={{ p: 2, display: 'flex', justifyContent: 'center' }}>
                <CircularProgress size={24} />
            </Box>
        );
    }
    if (buildingsError) {
        return (
            <Box sx={{ p: 2, color: 'error.main' }}>
                Failed to load buildings: {buildingsError.message}
            </Box>
        );
    }

    return (
        <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <StyledTextBox
                label="Level"
                value={formData.level}
                isEditing
                onChange={(value) => handleInputChange('level', value)}
            />

            <StyledTextBox
                label="Description"
                value={formData.description}
                isEditing
                onChange={(value) => handleInputChange('description', value)}
            />

            <Box display="flex" alignItems="center" gap={1}>
                <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ fontWeight: 700, fontSize: 14, flexShrink: 0 }}
                >
                    Building:
                </Typography>
                <StyledSearchSelect
                    items={buildingItems}
                    selectedKey={formData.building}
                    onSelectChange={handleBuildingSelect}
                    label="Select Building"
                />
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1, mt: 2 }}>
                <CancelButton onClick={onCancel} />
                <SaveButton onClick={handleSubmit} />
            </Box>
        </Box>
    );
};

export default FloorForm;
