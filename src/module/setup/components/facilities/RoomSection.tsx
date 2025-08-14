import React, { useState, useEffect } from 'react';
import { Box, Typography, Divider, Stack } from '@mui/material';
import StyledTextBox from '../../../../components/StyledTextBox';
import { RoomDetail, UpdateRoomDto } from '../../../../services/types/room.type';
import { useRoomMutations } from '../../../../services/hooks';


type RoomSectionProps = {
    data: RoomDetail;
    isEditing: boolean;
    saveTick?: number;
    cancelTick?: number;
    onSaved?: () => void;
};

export default function RoomSection({ data, isEditing, saveTick = 0, cancelTick = 0, onSaved }: RoomSectionProps) {
    const [edited, setEdited] = useState(data);
    const { update, busy, error } = useRoomMutations();

    useEffect(() => setEdited(data), [data]);

    const onField = (field: keyof RoomDetail, val: string | number) =>
        setEdited((p) => ({ ...p, [field]: val as any }));

    const save = async () => {
        const payload: UpdateRoomDto = {};
        if (edited.name !== data.name) payload.name = edited.name;
        if (edited.description !== data.description) payload.description = edited.description;
        if (edited.notes !== data.notes) payload.notes = edited.notes;

        if (Object.keys(payload).length === 0) { onSaved?.(); return; }

        try {
            const res = await update(edited.id, payload);
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
                <Box sx={{ flex: '1 1 200px' }}><StyledTextBox label="ID" value={edited.id} /></Box>
                <Box sx={{ flex: '1 1 200px' }}>
                    <StyledTextBox label="Name" value={edited.name} isEditing={isEditing} onChange={(v) => onField('name', v)} />
                </Box>
                <Box sx={{ flex: '1 1 200px' }}>
                    <StyledTextBox label="Description" value={edited.description} isEditing={isEditing} onChange={(v) => onField('description', v)} />
                </Box>
            </Box>

            <Divider />

            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                <Box sx={{ flex: '1 1 200px' }}><StyledTextBox label="Floor" value={edited.floor?.level || '—'} /></Box>
                <Box sx={{ flex: '1 1 200px' }}><StyledTextBox label="Building" value={edited.building?.name || edited.building?.code || '—'} /></Box>
            </Box>

            {error && (
                <Typography color="error" variant="caption">
                    {error.message}
                </Typography>
            )}
        </Stack>
    );
}