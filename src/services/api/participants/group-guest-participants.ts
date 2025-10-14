import api from "@/services/config/axios";
import type {
  GroupGuestParticipant,
  GroupGuestParticipantDetail,
  GgpQuery,
  GgpSort
} from "@/services/types";

const BASE = "/participants/group-guest";
export async function getAllGroupGuestParticipants(
  params: GgpQuery = {}
): Promise<{ data: GroupGuestParticipant[]; meta: { count: number } }> {
  const page = params.page ?? 1;
  const pageSize = params.pageSize ?? 10;

  const skip = (page - 1) * pageSize;
  const take = pageSize;

  const sortsPayload =
    params.sorts && params.sorts.length
      ? JSON.stringify(params.sorts.map((s: GgpSort) => ({ field: s.field, direction: s.dir })))
      : undefined;

  const res = await api.get<{ data: GroupGuestParticipant[]; meta: { count: number } }>(BASE, {
    params: {
      skip,
      take,
      searchName: params.searchName || undefined,
      searchPhoneNumber: params.searchPhoneNumber || undefined,
      searchEmail: params.searchEmail || undefined,
      searchMember: params.searchMember || undefined,
      ids: params.ids && params.ids.length ? params.ids : undefined,
      sorts: sortsPayload,
    },
  });

  return res.data;
}

export async function getGroupGuestParticipantById(id: number): Promise<GroupGuestParticipantDetail> {
  const res = await api.get<GroupGuestParticipantDetail>(`${BASE}/${id}`);
  return res.data;
}

export async function createGroupGuestParticipant(payload: {
  name: string;
  description?: string | null;
  phoneNumber?: string | null;
  email?: string | null;
  members?: string[];
}): Promise<GroupGuestParticipantDetail> {
  const res = await api.post<GroupGuestParticipantDetail>(BASE, payload);
  return res.data;
}

export async function updateGroupGuestParticipant(
  id: number,
  payload: {
    name?: string;
    description?: string | null;
    phoneNumber?: string | null;
    email?: string | null;
    addedMembers?: string[];
    removedMembers?: string[];
  }
): Promise<GroupGuestParticipantDetail> {
  const res = await api.patch<GroupGuestParticipantDetail>(`${BASE}/${id}`, payload);
  return res.data;
}

export async function deleteGroupGuestParticipant(id: number): Promise<void> {
  await api.delete(`${BASE}/${id}`);
}

export async function deleteGroupGuestParticipants(ids: number[]): Promise<void> {
  await api.delete(`${BASE}`, { params: { ids } });
}
