import api from '../../config/axios';
import { CreateLabDto, LabDetail, LabListItem, UpdateLabDto } from '../../types';

export async function getAllLabs(): Promise<{ data: LabListItem[]; meta: { count: number } }> {
    const response = await api.get<{ data: LabListItem[]; meta: { count: number } }>('/labs');
    return response.data;
}

export async function getLabById(id: number): Promise<LabDetail> {
    const response = await api.get<LabDetail>(`/labs/${id}`);
    return response.data;
}

export async function createLab(payload: CreateLabDto): Promise<LabListItem> {
    const response = await api.post<LabListItem>('/labs', payload);
    return response.data;
}

export async function updateLab(id: number, payload: UpdateLabDto): Promise<LabListItem> {
    const response = await api.patch<LabListItem>(`/labs/${id}`, payload);
    return response.data;
}

export async function deleteLab(id: number): Promise<void> {
    await api.delete(`/labs/${id}`);
}