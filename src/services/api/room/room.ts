import api from '../../config/axios';
import {
    RoomsListResponse,
    RoomDetail,
    CreateRoomDto,
    UpdateRoomDto,
} from '../../types/room.type';

export type RoomsSort = { field: string; direction: 'asc' | 'desc' };

export async function getAllRooms(params?: {
    skip?: number;
    take?: number;
    search?: string;
    sorts?: RoomsSort[] | RoomsSort;
}): Promise<RoomsListResponse> {
    const qs = new URLSearchParams();

    if (typeof params?.skip === 'number') qs.set('skip', String(params.skip));
    if (typeof params?.take === 'number') qs.set('take', String(params.take));
    if (params?.search) qs.set('search', params.search);

    if (params?.sorts) {
        const arr = Array.isArray(params.sorts) ? params.sorts : [params.sorts];
        qs.set('sorts', JSON.stringify(arr));
    }

    const url = `/rooms${qs.toString() ? `?${qs}` : ''}`;
    const res = await api.get<RoomsListResponse>(url);
    return res.data;
}

export async function getRoomById(id: number): Promise<RoomDetail> {
    const res = await api.get<RoomDetail>(`/rooms/${id}`);
    return res.data;
}

export async function createRoom(payload: CreateRoomDto): Promise<RoomDetail> {
    const res = await api.post<RoomDetail>('/rooms', payload);
    return res.data;
}

export async function updateRoom(id: number, payload: UpdateRoomDto): Promise<RoomDetail> {
    const res = await api.patch<RoomDetail>(`/rooms/${id}`, payload);
    return res.data;
}

export async function deleteRoom(id: number): Promise<void> {
    await api.delete(`/rooms/${id}`);
}