import api from '@/services/config/axios';
import {
    CreateEquipmentDto,
    EquipmentDetail,
    Equipment,
    EquipmentQuery,
    UpdateEquipmentDto,
} from '../../types';

const BASE = '/equipment';

export async function getAllEquipment(
    params: EquipmentQuery = {}
): Promise<{ data: Equipment[]; meta: { count: number } }> {
    const page = params.page ?? 1;
    const pageSize = params.pageSize ?? 10;

    const skip = (page - 1) * pageSize;
    const take = pageSize;

    const sortsPayload =
        params.sorts && params.sorts.length
            ? JSON.stringify(params.sorts.map(s => ({ field: s.field, direction: s.dir })))
            : undefined;

    const res = await api.get<{ data: Equipment[]; meta: { count: number } }>(BASE, {
        params: {
            skip,
            take,
            search: params.search?.trim() || undefined,
            formId: params.formId ?? undefined,
            categoryIds: params.categoryIds && params.categoryIds.length ? params.categoryIds : undefined,
            domainIds: params.domainIds && params.domainIds.length ? params.domainIds : undefined,
            manufacturer: params.manufacturer?.trim() || undefined,
            ids: params.ids && params.ids.length ? params.ids : undefined,
            sorts: sortsPayload,
        },
    });

    return res.data;
}

export async function getEquipmentById(id: number): Promise<EquipmentDetail> {
    const res = await api.get<EquipmentDetail>(`${BASE}/${id}`);
    return res.data;
}

export async function createEquipment(payload: CreateEquipmentDto): Promise<EquipmentDetail> {
    const res = await api.post<EquipmentDetail>(BASE, payload);
    return res.data;
}

export async function updateEquipment(
    id: number,
    payload: UpdateEquipmentDto
): Promise<EquipmentDetail> {
    const res = await api.patch<EquipmentDetail>(`${BASE}/${id}`, payload);
    return res.data;
}

export async function deleteEquipment(id: number): Promise<void> {
    await api.delete(`${BASE}/${id}`);
}

export async function deleteEquipments(ids: number[]): Promise<void> {
    await api.delete(`${BASE}`, { params: { ids } });
}
