import React, { useEffect, useMemo, useState } from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import StyledTextBox from '../../../components/StyledTextBox';
import SaveButton from '../../../components/SaveButton';
import CancelButton from '../../../components/CancelButton';
import StyledSearchSelect from '../../../components/StyledSearchSelect';
import { useBuildings, useFloors } from '../../../services/hooks';

interface RoomFormProps {
    initialData?: {
        id: number;
        name: string;
        description: string;
        notes: string;
        floor: number | null;
        building: number | null;
    };

    isEditing: boolean;
    editingId?: number;
    onSave: (data: any) => void;
    onCancel: () => void;
}

const emptyForm = {
    name: '',
    description: '',
    notes: '',
    floor: null as number | null,
    building: null as number | null,
};

const RoomForm: React.FC<RoomFormProps> = ({ initialData, isEditing, editingId, onSave, onCancel }) => {
    const { buildings, loading: buildingsLoading, error: buildingsError } = useBuildings();
    const { floors, loading: floorsLoading, error: floorsError } = useFloors();

    const buildingItems = useMemo(
        () =>
            (buildings ?? []).map((b: any) => ({
                key: b.id,
                label: b.name ?? `Building #${b.id}`,
            })),
        [buildings]
    );

    const floorItems = useMemo(
        () =>
            (floors ?? []).map((f: any) => ({
                key: f.id,
                label: f.level ?? `Floor #${f.id}`,
            })),
        [floors]
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

    const handleFloorSelect = (key: number | string | null) => {
        const value = key === null || key === '' ? null : Number(key);
        setFormData((prev) => ({ ...prev, floor: value }));
    };

    const handleSubmit = () => {
        const payload = {
            id: editingId ?? 0,
            name: formData.name,
            description: formData.description,
            notes: formData.notes,
            floorId: formData.floor,
            buildingId: formData.building,
        };
        onSave(payload);
    };

    if (buildingsLoading || floorsLoading) {
        return (
            <Box sx={{ p: 2, display: 'flex', justifyContent: 'center' }}>
                <CircularProgress size={24} />
            </Box>
        );
    }

    if (buildingsError || floorsError) {
        return (
            <Box sx={{ p: 2, color: 'error.main' }}>
                Failed to load {buildingsError ? 'buildings' : 'floors'}: {(buildingsError ?? floorsError)?.message}
            </Box>
        );
    }

    return (
        <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <StyledTextBox
                label="Name"
                value={formData.name}
                isEditing
                onChange={(value) => handleInputChange('name', value)}
            />

            <StyledTextBox
                label="Description"
                value={formData.description}
                isEditing
                onChange={(value) => handleInputChange('description', value)}
            />

            <StyledTextBox
                label="Notes"
                value={formData.notes}
                isEditing
                onChange={(value) => handleInputChange('notes', value)}
            />

            <Box display="flex" alignItems="center" gap={1}>
                <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 700, fontSize: 14, flexShrink: 0 }}>
                    Building:
                </Typography>
                <StyledSearchSelect
                    items={buildingItems}
                    selectedKey={formData.building}
                    onSelectChange={handleBuildingSelect}
                    label="Select Building"
                />
            </Box>

            <Box display="flex" alignItems="center" gap={1}>
                <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 700, fontSize: 14, flexShrink: 0 }}>
                    Floor:
                </Typography>
                <StyledSearchSelect
                    items={floorItems}
                    selectedKey={formData.floor}
                    onSelectChange={handleFloorSelect}
                    label="Select Floor"
                />
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1, mt: 2 }}>
                <CancelButton onClick={onCancel} />
                <SaveButton onClick={handleSubmit} />
            </Box>
        </Box>
    );
};

export default RoomForm;
