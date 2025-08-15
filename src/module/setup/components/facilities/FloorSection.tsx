import React, { useEffect, useState } from 'react';
import { Box, Typography, Divider, Stack } from '@mui/material';
import StyledTextBox from '../../../../components/StyledTextBox';
import { FloorDetail, UpdateFloorDto } from '../../../../services/types/floor.type';
import { updateFloor } from '../../../../services/api/floor/floor';

type FloorSectionProps = {
    data: FloorDetail;
    isEditing: boolean;
    saveTick?: number;
    cancelTick?: number;
    onSaved?: () => void;
};

export default function FloorSection({
    data,
    isEditing,
    saveTick = 0,
    cancelTick = 0,
    onSaved,
}: FloorSectionProps) {
    const [edited, setEdited] = useState(data);

    useEffect(() => setEdited(data), [data]);

    const onField = (field: keyof FloorDetail, val: string | number) =>
        setEdited((p) => ({ ...p, [field]: val as any }));

    const save = async () => {
        const payload: UpdateFloorDto = {};
        if (edited.level !== data.level) payload.level = edited.level;
        if (edited.description !== data.description) payload.description = edited.description;

        if (Object.keys(payload).length === 0) {
            onSaved?.();
            return;
        }

        try {
            const res = await updateFloor(edited.id, payload);
            setEdited(res);
            onSaved?.();
        } catch {
        }
    };

    const cancel = () => setEdited(data);

    useEffect(() => { if (isEditing) save(); }, [saveTick]);
    useEffect(() => { if (isEditing) cancel(); }, [cancelTick]);

    return (
        <Stack spacing={2}>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                <Box sx={{ flex: '1 1 200px' }}>
                    <StyledTextBox label="ID" value={edited.id} />
                </Box>
                <Box sx={{ flex: '1 1 200px' }}>
                    <StyledTextBox
                        label="Level"
                        value={edited.level}
                        isEditing={isEditing}
                        onChange={(v) => onField('level', v)}
                    />
                </Box>
                <Box sx={{ flex: '1 1 200px' }}>
                    <StyledTextBox
                        label="Description"
                        value={edited.description}
                        isEditing={isEditing}
                        onChange={(v) => onField('description', v)}
                    />
                </Box>
            </Box>

            <Divider />

            {Array.isArray(edited.rooms) && edited.rooms.length > 0 && (
                <Box sx={{ width: '100%' }}>
                    <Stack spacing={1} sx={{ pl: 1, mt: 1 }}>
                        {edited.rooms.map((r) => (
                            <Box key={`r-${r.id}`}>
                                <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                    🏠 {r.name} - {r.description}
                                </Typography>
                            </Box>
                        ))}
                    </Stack>
                </Box>
            )}
        </Stack>
    );
}