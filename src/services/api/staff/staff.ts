import api from "@/services/config/axios";
import type { Staff, StaffDetail, StaffQuery, StaffSort } from "@/services/types";

const BASE = "/staffs";

export async function getAllStaff(
  params: StaffQuery = {}
): Promise<{ data: Staff[]; meta: { count: number } }> {
  const page = params.page ?? 1;
  const pageSize = params.pageSize ?? 10;

  const skip = (page - 1) * pageSize;
  const take = pageSize;

  const sortsPayload =
    params.sorts && params.sorts.length
      ? JSON.stringify(params.sorts.map((s: StaffSort) => ({ field: s.field, direction: s.dir })))
      : undefined;

  const res = await api.get<{ data: Staff[]; meta: { count: number } }>(BASE, {
    params: {
      skip,
      take,
      searchCode: params.searchCode || undefined,
      searchName: params.searchName || undefined,
      searchPhoneNumber: params.searchPhoneNumber || undefined,
      searchEmail: params.searchEmail || undefined,
      sorts: sortsPayload,
    },
  });

  return res.data;
}

export async function getStaffById(id: number): Promise<StaffDetail> {
  const res = await api.get<StaffDetail>(`${BASE}/${id}`);
  return res.data;
}

export async function createStaff(payload: {
  code: string;
  function: string;
  firstName: string;
  lastName: string;
  middleName?: string;
  phoneNumber: string;
  email: string;
  title: string;
  expertises: string[];
  academicTitleIds: number[];
  programIds: number[];
}): Promise<StaffDetail> {
  const res = await api.post<StaffDetail>(BASE, {
    code: payload.code,
    function: payload.function,
    firstName: payload.firstName,
    lastName: payload.lastName,
    middleName: payload.middleName || undefined,
    phoneNumber: payload.phoneNumber,
    email: payload.email,
    title: payload.title,
    expertises: payload.expertises,
    academicTitles: payload.academicTitleIds.map(id => ({ id })), 
    programs: payload.programIds.map(id => ({ id })), 
  });
  return res.data;
}

export async function updateStaff(
  id: number,
  payload: {
    code?: string;
    function?: string;
    firstName?: string;
    lastName?: string;
    middleName?: string;
    phoneNumber?: string;
    email?: string;
    title?: string;
    addedExpertises?: string[];
    removedExpertises?: string[];
    addedAcademicTitleIds?: number[];
    removedAcademicTitleIds?: number[];
    addedProgramIds?: number[];
    removedProgramIds?: number[];
  }
): Promise<StaffDetail> {
  const cleanedPayload: any = {};
  Object.entries(payload).forEach(([key, value]) => {
    if (value !== undefined) {
      cleanedPayload[key] = value;
    }
  });

  const res = await api.patch<StaffDetail>(`${BASE}/${id}`, cleanedPayload);
  return res.data;
}

export async function deleteStaff(id: number): Promise<void> {
  await api.delete(`${BASE}/${id}`);
}

export async function deleteStaffs(ids: number[]): Promise<void> {
  await api.delete(`${BASE}`, { params: { ids } });
}