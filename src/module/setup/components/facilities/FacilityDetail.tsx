// src/pages/Facilities/FacilityDetail.tsx
import React, { useEffect, useMemo, useState } from 'react';
import { Box, Typography, LinearProgress, Divider } from '@mui/material';
import useFacilityTree from '../../data/facilitiesData';

// APIs
import { getBuildingById } from '../../../../services/api/building/building';
import { getFloorById } from '../../../../services/api/floor/floor';
import { getRoomById } from '../../../../services/api/room/room';

// Types
import { BuildingDetail } from '../../../../services/types/building.type';
import { FloorDetail } from '../../../../services/types/floor.type';
import { RoomDetail } from '../../../../services/types/room.type';

// Child components
import BuildingSection from './BuildingSection';
import FloorSection from './FloorSection';
import RoomSection from './RoomSection';
import AddFloorForm from './AddFloorForm';
import AddRoomForm from './AddRoomForm';

type FacilityDetailProps = {
    selectedItemId: string | null;
    isEditing: boolean;
    isAdding: boolean;
    saveTick?: number;
    cancelTick?: number;
    onSaved?: () => void;
};

type DetailState =
    | { kind: 'building'; data: BuildingDetail }
    | { kind: 'floor'; data: FloorDetail }
    | { kind: 'room'; data: RoomDetail }
    | null;

function parseSelected(selectedId: string | null): { kind: 'building' | 'floor' | 'room'; id: number } | null {
    if (!selectedId) return null;
    if (selectedId.startsWith('b-')) return { kind: 'building', id: Number(selectedId.slice(2)) };
    if (selectedId.startsWith('f-')) return { kind: 'floor', id: Number(selectedId.slice(2)) };
    if (selectedId.startsWith('r-')) return { kind: 'room', id: Number(selectedId.slice(2)) };
    return null;
}

export default function FacilityDetail({ selectedItemId, isEditing, isAdding, saveTick = 0, cancelTick = 0, onSaved }: FacilityDetailProps) {
    const { loading: treeLoading, error: treeError } = useFacilityTree();
    const [detail, setDetail] = useState<DetailState>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<Error | null>(null);

    const parsed = useMemo(() => parseSelected(selectedItemId), [selectedItemId]);

    useEffect(() => {
        let active = true;
        (async () => {
            setError(null);
            setDetail(null);
            if (!parsed) return;

            try {
                setLoading(true);
                if (parsed.kind === 'building') {
                    const data = await getBuildingById(parsed.id);
                    if (!active) return;
                    setDetail({ kind: 'building', data });
                } else if (parsed.kind === 'floor') {
                    const data = await getFloorById(parsed.id);
                    if (!active) return;
                    setDetail({ kind: 'floor', data });
                } else {
                    const data = await getRoomById(parsed.id);
                    if (!active) return;
                    setDetail({ kind: 'room', data });
                }
            } catch (e) {
                if (!active) return;
                setError(e as Error);
            } finally {
                if (active) setLoading(false);
            }
        })();
        return () => {
            active = false;
        };
    }, [parsed]);

    if (loading || treeLoading) {
        return <LinearProgress />;
    }

    if (error || treeError) {
        return <Typography color="error">Error loading facility data.</Typography>;
    }

    if (!parsed) {
        return (
            <Typography variant="body1" color="text.secondary">
                Select a building, floor, or room to see details.
            </Typography>
        );
    }

    if (isAdding) {
        if (!detail) {
            return <LinearProgress />;
        }
        if (parsed.kind === 'floor' && detail.kind === 'floor') {
            return <AddRoomForm parentFloorId={parsed.id} saveTick={saveTick} onSaved={onSaved} />;
        }
        if (parsed.kind === 'building' && detail.kind === 'building') {
            return <AddFloorForm parentBuildingId={parsed.id} saveTick={saveTick} onSaved={onSaved} />;
        }

        return (
            <Typography variant="body1" color="text.secondary">
                Cannot add a child to this item.
            </Typography>
        );
    }

    if (!detail) {
        return (
            <Typography variant="body1" color="text.secondary">
                No details available.
            </Typography>
        );
    }

    return (
        <Box sx={{ minHeight: 352, minWidth: 260, flexGrow: 1 }}>
            <Typography variant="body1" sx={{ fontSize: '1rem' }}>
                Resource Details
            </Typography>

            <Box sx={{ p: 2 }}>
                {detail.kind === 'building' && (
                    <BuildingSection data={detail.data} isEditing={isEditing} saveTick={saveTick} cancelTick={cancelTick} onSaved={onSaved} />
                )}
                {detail.kind === 'floor' && (
                    <FloorSection data={detail.data} isEditing={isEditing} saveTick={saveTick} cancelTick={cancelTick} onSaved={onSaved} />
                )}
                {detail.kind === 'room' && (
                    <RoomSection data={detail.data} isEditing={isEditing} saveTick={saveTick} cancelTick={cancelTick} onSaved={onSaved} />
                )}
            </Box>
        </Box>
    );
}
