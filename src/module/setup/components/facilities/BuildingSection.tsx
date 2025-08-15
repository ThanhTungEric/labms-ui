import React, { useEffect, useState } from 'react';
import { Box, Typography, Divider, Stack } from '@mui/material';
import StyledTextBox from '../../../../components/StyledTextBox';
import { BuildingDetail } from '../../../../services/types/building.type';
import { updateBuilding } from '../../../../services/api/building/building';

type BuildingSectionProps = {
    data: BuildingDetail;
    isEditing: boolean;
    saveTick?: number;
    cancelTick?: number;
    onSaved?: () => void;
};

export default function BuildingSection({
    data,
    isEditing,
    saveTick = 0,
    cancelTick = 0,
    onSaved,
}: BuildingSectionProps) {
    const [editedData, setEditedData] = useState(data);

    useEffect(() => setEditedData(data), [data]);

    const handleFieldChange = (field: keyof BuildingDetail, value: string | number) => {
        setEditedData(prev => ({ ...prev, [field]: value as any }));
    };

    const save = async () => {
        const payload: { name?: string; description?: string } = {};
        if (editedData.code !== data.code) payload.name = String(editedData.code);
        if (editedData.description !== data.description) payload.description = String(editedData.description ?? '');

        if (Object.keys(payload).length === 0) {
            onSaved?.();
            return;
        }

        try {
            await updateBuilding(editedData.id, payload);
            setEditedData(prev => ({
                ...prev,
                code: payload.name ?? prev.code,
                description: payload.description ?? prev.description,
            }));
            onSaved?.();
        } catch {
        }
    };

    const cancel = () => setEditedData(data);

    useEffect(() => { if (isEditing) save(); }, [saveTick]);
    useEffect(() => { if (isEditing) cancel(); }, [cancelTick]);

    return (
        <Stack spacing={2}>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                <Box sx={{ flex: '1 1 auto', minWidth: 200 }}>
                    <StyledTextBox label="ID" value={editedData.id} />
                </Box>

                <Box sx={{ flex: '1 1 auto', minWidth: 200 }}>
                    <StyledTextBox
                        label="Name"
                        value={editedData.code}
                        isEditing={isEditing}
                        onChange={(val) => handleFieldChange('code', val)}
                    />
                </Box>

                <Box sx={{ flex: '1 1 auto', minWidth: 200 }}>
                    <StyledTextBox
                        label="Description"
                        value={editedData.description || '—'}
                        isEditing={isEditing}
                        onChange={(val) => handleFieldChange('description', val)}
                    />
                </Box>
            </Box>

            <Divider sx={{ width: '100%' }} />

            {Array.isArray(editedData.floors) && editedData.floors.length > 0 && (
                <Box sx={{ width: '100%' }}>
                    <Typography variant="body1" fontWeight="bold">Floors</Typography>
                    <Stack spacing={1} sx={{ pl: 1, mt: 1 }}>
                        {editedData.floors.map((f) => (
                            <Box key={`f-${f.id}`}>
                                <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                    {f.level}
                                </Typography>
                                <Typography variant="caption" color="text.secondary" sx={{ ml: 2 }}>
                                    {f.description || '—'} — Rooms: {f.rooms?.length ?? 0}
                                </Typography>
                            </Box>
                        ))}
                    </Stack>
                </Box>
            )}
        </Stack>
    );
}