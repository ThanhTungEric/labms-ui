import api from '../../config/axios';
import {
    FloorListItem,
    FloorDetail,
    CreateFloorDto,
    UpdateFloorDto,
} from '../../types/floor.type';

export async function getAllFloors(): Promise<FloorListItem[]> {
    const res = await api.get<FloorListItem[]>('/floors');
    return res.data ?? [];
}

export async function getFloorById(id: number): Promise<FloorDetail> {
    const res = await api.get<FloorDetail>(`/floors/${id}`);
    return res.data;
}

export async function createFloor(payload: CreateFloorDto): Promise<FloorDetail> {
    const res = await api.post<FloorDetail>('/floors', payload);
    return res.data;
}

export async function updateFloor(id: number, payload: UpdateFloorDto): Promise<FloorDetail> {
    const res = await api.patch<FloorDetail>(`/floors/${id}`, payload);
    return res.data;
}

export async function deleteFloor(id: number): Promise<void> {
    await api.delete(`/floors/${id}`);
}
