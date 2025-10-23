import api from "@/services/config/axios";
import type {
  IndividualGuestParticipant,
  IndividualGuestParticipantDetail,
  IgpQuery,
  IgpSort
} from "@/services/types";

const BASE = "/schedule/participants/individual-guest";

export async function getAllIndividualGuestParticipants(
  params: IgpQuery = {}
): Promise<{ data: IndividualGuestParticipant[]; meta: { count: number } }> {
  const page = params.page ?? 1;
  const pageSize = params.pageSize ?? 10;

  const skip = (page - 1) * pageSize;
  const take = pageSize;

  const sortsPayload =
    params.sorts && params.sorts.length
      ? JSON.stringify(params.sorts.map((s: IgpSort) => ({ field: s.field, direction: s.dir })))
      : undefined;

  const res = await api.get<{ data: IndividualGuestParticipant[]; meta: { count: number } }>(BASE, {
    params: {
      skip,
      take,
      searchName: params.searchName || undefined,
      searchPhoneNumber: params.searchPhoneNumber || undefined,
      searchEmail: params.searchEmail || undefined,
      ids: params.ids?.length ? params.ids : undefined,
      sorts: sortsPayload,
    },
  });

  return res.data;
}

export async function getIndividualGuestParticipantById(id: number): Promise<IndividualGuestParticipantDetail> {
  const res = await api.get<IndividualGuestParticipantDetail>(`${BASE}/${id}`);
  return res.data;
}

export async function createIndividualGuestParticipant(payload: {
  firstName: string;
  lastName: string;
  middleName?: string | null;
  description?: string | null;
  phoneNumber?: string | null;
  email?: string | null;
  title?: string | null;
}): Promise<IndividualGuestParticipantDetail> {
  const res = await api.post<IndividualGuestParticipantDetail>(BASE, payload);
  return res.data;
}

export async function updateIndividualGuestParticipant(
  id: number,
  payload: Partial<{
    firstName: string;
    lastName: string;
    middleName: string | null;
    description: string | null;
    phoneNumber: string | null;
    email: string | null;
    title: string | null;
  }>
): Promise<IndividualGuestParticipantDetail> {
  const res = await api.patch<IndividualGuestParticipantDetail>(`${BASE}/${id}`, payload);
  return res.data;
}

export async function deleteIndividualGuestParticipant(id: number): Promise<void> {
  await api.delete(`${BASE}/${id}`);
}


export async function deleteIndividualGuestParticipants(ids: number[]): Promise<void> {
  await api.delete(`${BASE}`, { params: { ids } });
}
