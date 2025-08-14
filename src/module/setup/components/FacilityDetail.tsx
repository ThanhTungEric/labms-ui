// src/pages/Facilities/FacilityDetail.tsx
import React, { useEffect, useMemo, useState } from 'react';
import { Box, Card, CardContent, Typography, LinearProgress, Divider, Stack } from '@mui/material';
import useFacilityTree from '../data/facilitiesData';

// APIs
import { getBuildingById } from '../../../services/api/building/building';
import { getFloorById } from '../../../services/api/floor/floor';
import { getRoomById } from '../../../services/api/room/room';

// Types
import { BuildingDetail } from '../../../services/types/building.type';
import { FloorDetail } from '../../../services/types/floor.type';
import { RoomDetail } from '../../../services/types/room.type';

// Icons for visual distinction
import LocationOnIcon from '@mui/icons-material/LocationOn';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import BusinessIcon from '@mui/icons-material/Business';
import ApartmentIcon from '@mui/icons-material/Apartment';

type FacilityDetailProps = {
    selectedItemId: string | null;
};

// Union state cho detail
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

export default function FacilityDetail({ selectedItemId }: FacilityDetailProps) {
    // Nếu bạn vẫn muốn dùng tree để tìm nhãn hiển thị phụ thì giữ hook này.
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
                    console.log(data, "==========")
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

    // Ưu tiên loading chi tiết; nếu chưa chọn item và tree đang load thì hiển thị bar
    if (loading || treeLoading) {
        return <LinearProgress />;
    }

    if (error || treeError) {
        return <Typography color="error">Error loading facility data.</Typography>;
    }

    if (!parsed || !detail) {
        return (
            <Typography variant="body1" color="text.secondary">
                Select a building, floor, or room to see details.
            </Typography>
        );
    }

    return (
        <Box sx={{ minHeight: 352, minWidth: 260, flexGrow: 1 }}>
            <Typography variant="body1" sx={{ fontSize: '1rem', mb: 1 }}>
                Resource Details
            </Typography>

            <Box sx={{ p: 2 }}>
                {detail.kind === 'building' && <BuildingSection data={detail.data} />}
                {detail.kind === 'floor' && <FloorSection data={detail.data} />}
                {detail.kind === 'room' && <RoomSection data={detail.data} />}
            </Box>

        </Box>
    );
}

/* -------- Renderers -------- */

function BuildingSection({ data }: { data: BuildingDetail }) {
    return (
        <Stack spacing={1.5}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <ApartmentIcon color="primary" />
                <Typography variant="body1" sx={{ fontSize: '1rem' }}>
                    {data.code}
                </Typography>
            </Box>
            <Typography color="text.secondary" variant="body2" sx={{ fontSize: '1rem' }}>ID: {data.id}</Typography>
            <Typography variant="body2" sx={{ fontSize: '1rem' }}>Description: {data.description || '—'}</Typography>

            <Divider />

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <LocationOnIcon fontSize="small" />
                <Typography variant="body2" fontWeight="bold" sx={{ fontSize: '1rem' }}>Floors: {data.floors?.length ?? 0}</Typography>
            </Box>
            {Array.isArray(data.floors) && data.floors.length > 0 && (
                <Box sx={{ pl: 1 }}>
                    {data.floors.map((f) => (
                        <Box key={`f-${f.id}`} sx={{ mb: 1 }}>
                            <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', gap: 0.5, fontSize: '1rem' }}>
                                • {f.level}
                            </Typography>
                            <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.875rem' }}>
                                {f.description || '—'} — Rooms: {f.rooms?.length ?? 0}
                            </Typography>
                        </Box>
                    ))}
                </Box>
            )}
        </Stack>
    );
}

function FloorSection({ data }: { data: FloorDetail }) {
    return (
        <Stack spacing={1.5}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <BusinessIcon color="secondary" />
                <Typography variant="body1" sx={{ fontSize: '1rem' }}>
                    Floor {data.level}
                </Typography>
            </Box>
            <Typography color="text.secondary" variant="body2" sx={{ fontSize: '1rem' }}>ID: {data.id}</Typography>
            <Typography variant="body2" sx={{ fontSize: '1rem' }}>Description: {data.description || '—'}</Typography>

            <Divider />

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <MeetingRoomIcon fontSize="small" />
                <Typography variant="body2" fontWeight="bold" sx={{ fontSize: '1rem' }}>Rooms: {data.rooms?.length ?? 0}</Typography>
            </Box>
            {Array.isArray(data.rooms) && data.rooms.length > 0 && (
                <Box sx={{ pl: 1 }}>
                    {data.rooms.map((r) => (
                        <Box key={`r-${r.id}`} sx={{ mb: 1 }}>
                            <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', gap: 0.5, fontSize: '1rem' }}>
                                • {r.name}
                            </Typography>
                            <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.875rem' }}>
                                {r.description || '—'}
                            </Typography>
                        </Box>
                    ))}
                </Box>
            )}
        </Stack>
    );
}

function RoomSection({ data }: { data: RoomDetail }) {
    return (
        <Stack spacing={1.5}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <MeetingRoomIcon color="action" />
                <Typography variant="body1" sx={{ fontSize: '1rem' }}>
                    Room {data.name}
                </Typography>
            </Box>
            <Typography color="text.secondary" variant="body2" sx={{ fontSize: '1rem' }}>ID: {data.id}</Typography>
            <Typography variant="body2" sx={{ fontSize: '1rem' }}>Description: {data.description || '—'}</Typography>
            <Typography variant="body2" sx={{ fontSize: '1rem' }}>Notes: {data.notes || '—'}</Typography>

            <Divider />

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <BusinessIcon fontSize="small" />
                <Typography variant="body2" fontWeight="bold" sx={{ fontSize: '1rem' }}>Floor</Typography>
            </Box>
            <Box sx={{ pl: 1 }}>
                <Typography variant="body2" sx={{ fontSize: '1rem' }}>
                    {data.floor?.level}
                </Typography>
                {data.floor?.description && (
                    <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.875rem' }}>
                        {data.floor.description}
                    </Typography>
                )}
            </Box>

            <Divider />

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <ApartmentIcon fontSize="small" />
                <Typography variant="body2" fontWeight="bold" sx={{ fontSize: '1rem' }}>Building</Typography>
            </Box>
            <Box sx={{ pl: 1 }}>
                <Typography variant="body2" sx={{ fontSize: '1rem' }}>
                    {data.building?.name || data.building?.code}
                </Typography>
            </Box>
        </Stack>
    );
}
