import React, { useEffect, useMemo, useState } from 'react';
import {
    Box,
    Typography,
    Stack,
    LinearProgress,
    Card,
    CardContent,
    Chip,
    Divider,
    Tooltip,
    Skeleton,
} from '@mui/material';
import ApartmentIcon from '@mui/icons-material/Apartment';
import StairsIcon from '@mui/icons-material/Stairs';
import StyledTextBox from '../../../../components/StyledTextBox';
import { createRoom } from '../../../../services/api/room/room';
import { useFloors } from '../../../../services/hooks';
import { useBuildingMutations } from '../../../../services/hooks';

type AddRoomFormProps = {
    parentFloorId: number;
    saveTick: number;
    onSaved?: () => void;
};

export default function AddRoomForm({ parentFloorId, saveTick, onSaved }: AddRoomFormProps) {
    const [roomName, setRoomName] = useState('');
    const [description, setDescription] = useState('');
    const [saving, setSaving] = useState(false);
    const [localError, setLocalError] = useState<string | null>(null);

    // Floor info
    const { floors, loading: floorLoading, error: floorError } = useFloors(parentFloorId);
    const floor = useMemo(() => floors[0], [floors]);
    const floorLevel = useMemo(
        () => (floor?.level || `#${parentFloorId}`),
        [floor, parentFloorId]
    );

    // Building info by floor
    const { getByFloorId, busy: buildingLoading, error: buildingError } = useBuildingMutations();
    const [buildingName, setBuildingName] = useState<string>('');
    const [buildingId, setBuildingId] = useState<number | null>(null);

    useEffect(() => {
        let active = true;
        (async () => {
            if (!parentFloorId) return;
            try {
                const b = await getByFloorId(parentFloorId);
                if (!active) return;
                setBuildingName(b.description || b.code || 'Unnamed');
                setBuildingId(b.id ?? null);
            } catch {
                if (!active) return;
                setBuildingName('Failed to load');
                setBuildingId(null);
            }
        })();
        return () => {
            active = false;
        };
    }, [parentFloorId, getByFloorId]);

    // Save room
    useEffect(() => {
        if (saveTick <= 0) return;

        (async () => {
            if (!roomName.trim()) {
                setLocalError('Room name cannot be empty.');
                return;
            }

            setSaving(true);
            setLocalError(null);

            try {
                await createRoom({
                    floorId: parentFloorId,
                    name: roomName.trim(),
                    description: description.trim(),
                });
                onSaved?.();
            } catch (e) {
                setLocalError('Failed to add room.');
                console.error(e);
            } finally {
                setSaving(false);
            }
        })();
    }, [saveTick, roomName, description, parentFloorId, onSaved]);

    const anyLoading = saving || floorLoading || buildingLoading;
    const anyErrorMsg = localError || floorError?.message || buildingError?.message;

    return (
        <Box>
            <Typography variant="body1" sx={{ fontSize: '1rem', mb: 1 }}>Add New Room</Typography>

            <Card variant="outlined" sx={{ mb: 2 }}>
                <CardContent>
                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems="center">

                        <Stack direction="row" spacing={1.5} alignItems="center" sx={{ flex: 1, minWidth: 220 }}>
                            <ApartmentIcon fontSize="small" />
                            <Box sx={{ minWidth: 0 }}>
                                <Typography variant="body2" color="text.secondary">Building</Typography>
                                {buildingLoading ? (
                                    <Skeleton variant="text" width={160} />
                                ) : (
                                    <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: 0.25 }}>
                                        <Tooltip title={buildingName}>
                                            <Typography variant="subtitle2" noWrap maxWidth={220}>
                                                {buildingName}
                                            </Typography>
                                        </Tooltip>
                                        {!!buildingId && <Chip label={`ID: ${buildingId}`} size="small" />}
                                    </Stack>
                                )}
                            </Box>
                        </Stack>

                        <Divider flexItem orientation="vertical" sx={{ display: { xs: 'none', sm: 'block' } }} />

                        {/* Floor */}
                        <Stack direction="row" spacing={1.5} alignItems="center" sx={{ flex: 1, minWidth: 220 }}>
                            <StairsIcon fontSize="small" />
                            <Box sx={{ minWidth: 0 }}>
                                <Typography variant="body2" color="text.secondary">Floor</Typography>
                                {floorLoading ? (
                                    <Skeleton variant="text" width={120} />
                                ) : (
                                    <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: 0.25 }}>
                                        <Typography variant="subtitle2">{floorLevel}</Typography>
                                        <Chip label={`ID: ${parentFloorId}`} size="small" />
                                    </Stack>
                                )}
                            </Box>
                        </Stack>
                    </Stack>
                </CardContent>
            </Card>

            {/* Form fields */}
            <Stack spacing={2}>
                <StyledTextBox
                    label="Room Name"
                    value={roomName}
                    isEditing
                    onChange={setRoomName}
                />
                <StyledTextBox
                    label="Description"
                    value={description}
                    isEditing
                    onChange={setDescription}
                />
            </Stack>

            {anyLoading && <LinearProgress sx={{ mt: 2 }} />}

            {anyErrorMsg && (
                <Typography color="error" mt={2}>
                    {anyErrorMsg}
                </Typography>
            )}
        </Box>
    );
}
