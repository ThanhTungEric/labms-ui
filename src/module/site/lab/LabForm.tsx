import React, { useEffect, useMemo, useState } from 'react';
import { Box, Typography, TextField, Chip, CircularProgress } from '@mui/material';
import StyledTextBox from '../../../components/StyledTextBox';
import SaveButton from '../../../components/SaveButton';
import CancelButton from '../../../components/CancelButton';

import StyledMultiSelect, { MoreActionItem } from '../../../components/StyledMultiSelect';
import StyledSearchSelect from '../../../components/StyledSearchSelect';
import { styled } from '@mui/system';
import { useLabs, useRooms } from '../../../services/hooks';

interface LabFormProps {
    initialData?: {
        name: string;
        area: number | null;
        layout: string | null;
        condition: string[] | null;
        status: string;
        room: number | null; // id phòng được chọn
    };
    isEditing: boolean;
    editingId?: number;
    onSave: (data: any) => void;
    onCancel: () => void;
}

const statusOptions: MoreActionItem[] = [
    { key: 'ACTIVE', label: 'Active' },
    { key: 'INACTIVE', label: 'Inactive' },
];

const ConditionInputBox = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
    borderRadius: 4,
    padding: 8,
    minHeight: 40,
    '&:hover': { borderColor: '#000' },
});

const ConditionChipContainer = styled(Box)({
    display: 'flex',
    flexWrap: 'wrap',
});

const emptyForm = {
    name: '',
    area: null as number | null,
    layout: '',
    condition: [] as string[],
    status: 'ACTIVE',
    room: null as number | null,
};

// ==== Helpers ================================================================
function getFloorCode(floor?: { code?: string; level?: string }) {
    return floor?.code ?? floor?.level ?? 'Unknown floor';
}
function formatRoomLabel(r: any) {
    const building = r?.building?.code ?? r?.building?.name ?? 'Unknown building';
    const floor = getFloorCode(r?.floor);
    const room = r?.name ?? `Room #${r?.id ?? ''}`;
    return `${building} - ${floor} - ${room}`;
}
// ============================================================================

const LabForm: React.FC<LabFormProps> = ({ initialData, isEditing, editingId, onSave, onCancel }) => {
    // fetch lab detail khi edit
    const { labs, loading: labLoading, error: labError } = useLabs(isEditing && editingId ? editingId : undefined);
    // fetch toàn bộ rooms
    const { rooms, loading: roomsLoading, error: roomsError } = useRooms();

    // Prefill từ lab detail (API bạn trả rooms là mảng)
    const fetchedDetail = useMemo(() => {
        if (!isEditing || !editingId || !labs || labs.length === 0) return undefined;
        const d: any = labs[0];
        return {
            name: d?.name ?? '',
            area: d?.area ?? null,
            layout: d?.layout ?? '',
            condition: d?.condition ?? [],
            status: (d?.status?.name ?? 'ACTIVE').toString().toUpperCase(),
            room: Array.isArray(d?.rooms) && d.rooms.length > 0 ? d.rooms[0]?.id ?? null : null,
        };
    }, [isEditing, editingId, labs]);

    // Map RoomListItem[] -> items cho StyledSearchSelect
    const roomItems = useMemo(
        () =>
            (rooms ?? []).map((r: any) => ({
                key: r.id,
                label: formatRoomLabel(r), // "building code - floor code/level - room name"
            })),
        [rooms]
    );

    const [formData, setFormData] = useState(() => initialData ?? emptyForm);
    const [newCondition, setNewCondition] = useState('');

    // Prefill khi có dữ liệu (edit/create)
    useEffect(() => {
        if (isEditing && fetchedDetail) setFormData(fetchedDetail);
        if (!isEditing && initialData) setFormData(initialData);
        if (!isEditing && !initialData) setFormData(emptyForm);
    }, [isEditing, fetchedDetail, initialData]);

    const handleInputChange = (field: string, value: any) => {
        const v = field === 'area' ? (value === '' ? null : Number(value)) : value;
        setFormData((prev) => ({ ...prev, [field]: v }));
    };

    const handleAddCondition = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter' && newCondition.trim() !== '') {
            event.preventDefault();
            setFormData((prev) => ({ ...prev, condition: [...(prev.condition || []), newCondition.trim()] }));
            setNewCondition('');
        }
    };

    const handleDeleteCondition = (conditionToDelete: string) => {
        setFormData((prev) => ({
            ...prev,
            condition: (prev.condition || []).filter((c) => c !== conditionToDelete),
        }));
    };

    const handleStatusMultiSelectChange = (keys: string[]) => {
        const lastSelectedKey = keys[keys.length - 1] || '';
        setFormData((prev) => ({ ...prev, status: lastSelectedKey }));
    };

    const handleRoomSelect = (key: number | null) => {
        setFormData((prev) => ({ ...prev, room: key }));
    };

    const handleSubmit = () => {
        // Nếu API update/create cần rooms là mảng { id }, map tại đây:
        const payload = {
            ...formData,
            rooms: formData.room ? [{ id: formData.room }] : [],
            status: { name: formData.status }, // nếu backend cần object
        };
        onSave(payload);
    };

    if ((isEditing && labLoading) || roomsLoading) {
        return (
            <Box sx={{ p: 2, display: 'flex', justifyContent: 'center' }}>
                <CircularProgress size={24} />
            </Box>
        );
    }
    if ((isEditing && labError) || roomsError) {
        return (
            <Box sx={{ p: 2, color: 'error.main' }}>
                {labError ? `Failed to load lab detail: ${labError.message}` : `Failed to load rooms: ${roomsError?.message}`}
            </Box>
        );
    }

    return (
        <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: 2 }}>
                {/* Left column */}
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, flex: 1, minWidth: '45%' }}>
                    <StyledTextBox
                        label="Lab Name"
                        value={formData.name}
                        isEditing
                        onChange={(value) => handleInputChange('name', value)}
                    />
                    <StyledTextBox
                        label="Area (sqm)"
                        value={formData.area ?? ''}
                        isEditing
                        onChange={(value) => handleInputChange('area', value)}
                    />
                    <StyledTextBox
                        label="Layout"
                        value={formData.layout}
                        isEditing
                        onChange={(value) => handleInputChange('layout', value)}
                    />
                </Box>

                {/* Right column */}
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, flex: 1, minWidth: '45%' }}>
                    <Box>
                        <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 700, fontSize: 14, mb: 1 }}>
                            Condition:
                        </Typography>
                        <ConditionInputBox>
                            <ConditionChipContainer>
                                {formData.condition?.map((condition) => (
                                    <Chip key={condition} label={condition} onDelete={() => handleDeleteCondition(condition)} size="small" />
                                ))}
                            </ConditionChipContainer>
                            <TextField
                                value={newCondition}
                                onChange={(e) => setNewCondition(e.target.value)}
                                onKeyDown={handleAddCondition}
                                placeholder="Add new condition..."
                                fullWidth
                                size="small"
                                variant="outlined"
                                sx={{ '& .MuiOutlinedInput-root': { '& fieldset': { border: 'none' }, minHeight: 0 } }}
                            />
                        </ConditionInputBox>
                    </Box>

                    <Box display="flex" alignItems="center" gap={1}>
                        <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 700, fontSize: 14, flexShrink: 0 }}>
                            Room:
                        </Typography>
                        <StyledSearchSelect
                            items={roomItems}
                            selectedKey={formData.room}
                            onSelectChange={handleRoomSelect}
                            label="Search and select room"
                        />
                    </Box>

                    <Box display="flex" alignItems="center" gap={1}>
                        <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 700, fontSize: 14, flexShrink: 0 }}>
                            Status:
                        </Typography>
                        <StyledMultiSelect
                            items={statusOptions}
                            selectedKeys={[formData.status]}
                            onSelectChange={handleStatusMultiSelectChange}
                            label="Select Status"
                        />
                    </Box>
                </Box>
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1, mt: 2 }}>
                <CancelButton onClick={onCancel} />
                <SaveButton onClick={handleSubmit} />
            </Box>
        </Box>
    );
};

export default LabForm;
