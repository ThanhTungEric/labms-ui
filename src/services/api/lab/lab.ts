import api from '../../config/axios';
import { CreateLabDto, LabDetail, LabListItem, UpdateLabDto } from '../../types';

export type LabSort = {
    field: 'id' | 'name' | 'area' | 'layout' | 'condition';
    dir: 'asc' | 'desc';
};

export type LabQuery = {
    page?: number;
    pageSize?: number;
    search?: string;
    sorts?: LabSort[];
};

export async function getAllLabs(
    params: LabQuery = {}
): Promise<{ data: LabListItem[]; meta: { count: number } }> {
    const page = params.page ?? 1;
    const pageSize = params.pageSize ?? 10;

    const skip = (page - 1) * pageSize;
    const take = pageSize;

    const sortsPayload =
        params.sorts && params.sorts.length
            ? JSON.stringify(params.sorts.map(s => ({ field: s.field, direction: s.dir })))
            : undefined;

    const response = await api.get<{ data: LabListItem[]; meta: { count: number } }>(
        '/labs',
        {
            params: {
                skip,
                take,
                search: params.search?.trim() || undefined,
                sorts: sortsPayload,
            },
        }
    );

    return response.data;
}

export async function getLabById(id: number): Promise<LabDetail> {
    const response = await api.get<LabDetail>(`/labs/${id}`);
    return response.data;
}

export async function createLab(payload: CreateLabDto): Promise<LabDetail> {
    const response = await api.post<LabDetail>('/labs', payload);
    return response.data;
}

export async function updateLab(id: number, payload: UpdateLabDto): Promise<LabDetail> {
    const response = await api.patch<LabDetail>(`/labs/${id}`, payload);
    return response.data;
}

export async function deleteLab(id: number): Promise<void> {
    await api.delete(`/labs/${id}`);
}
