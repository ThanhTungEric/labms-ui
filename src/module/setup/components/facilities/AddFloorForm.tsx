import React, { useEffect, useMemo, useState } from 'react';
import { Box, Typography, Stack, LinearProgress } from '@mui/material';
import StyledTextBox from '../../../../components/StyledTextBox';
import { createFloor } from '../../../../services/api/floor/floor';
import { useBuildings } from '../../../../services/hooks';
import { useFloors } from '../../../../services/hooks/floor/useFloor';

type AddFloorFormProps = {
    parentBuildingId: number;
    saveTick: number;
    onSaved?: () => void;
};

export default function AddFloorForm({ parentBuildingId, saveTick, onSaved }: AddFloorFormProps) {
    const { buildings, loading: buildingLoading, error: buildingError, reload: reloadBuilding } =
        useBuildings(parentBuildingId);

    const building = buildings[0];
    const buildingName = useMemo(
        () => (building?.description || building?.code || `#${parentBuildingId}`),
        [building, parentBuildingId]
    );

    const [floorName, setFloorName] = useState('');
    const [description, setDescription] = useState('');
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (saveTick <= 0) return;

        (async () => {
            if (!floorName) {
                setError('Floor name cannot be empty.');
                return;
            }

            setSaving(true);
            setError(null);

            try {
                await createFloor({
                    buildingId: parentBuildingId,
                    level: floorName,
                    description,
                });
                reloadBuilding?.();
                onSaved?.();
            } catch (e) {
                setError('Failed to add floor.');
                console.error(e);
            } finally {
                setSaving(false);
            }
        })();
    }, [saveTick, floorName, parentBuildingId, description, onSaved, reloadBuilding]);

    return (
        <Box>
            <Typography variant="body1" sx={{ fontSize: '1rem' }}>Add New Floor</Typography>

            <Stack spacing={2}>
                <Box>
                    <Typography variant="body1">
                        {buildingLoading ? 'Loading...' : buildingName}
                    </Typography>
                </Box>
                <StyledTextBox
                    label="Floor Name"
                    value={floorName}
                    isEditing
                    onChange={setFloorName}
                />
                <StyledTextBox
                    label="Description"
                    value={description}
                    isEditing
                    onChange={setDescription}
                />
            </Stack>

            {(saving || buildingLoading) && <LinearProgress sx={{ mt: 2 }} />}

            {(error || buildingError) && (
                <Typography color="error" mt={2}>
                    {error || buildingError?.message}
                </Typography>
            )}
        </Box>
    );
}