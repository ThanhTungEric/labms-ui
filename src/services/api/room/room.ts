import api from '../../config/axios';
import {
    RoomsListResponse,
    RoomDetail,
    CreateRoomDto,
    UpdateRoomDto,
} from '../../types/room.type';

export async function getAllRooms(): Promise<RoomsListResponse> {
    const res = await api.get<RoomsListResponse>('/rooms');
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