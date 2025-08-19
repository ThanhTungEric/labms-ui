import api from '../../config/axios';
import { LabStatusDto } from '../../types';

export async function getAllLabStatuses(): Promise<{ data: LabStatusDto[]; count: number }> {
    const response = await api.get<{ data: LabStatusDto[]; count: number }>('/lab-statuses');
    return response.data;
}

export async function getLabStatusById(id: number): Promise<LabStatusDto> {
    const response = await api.get<LabStatusDto>(`/lab-statuses/${id}`);
    return response.data;
}
