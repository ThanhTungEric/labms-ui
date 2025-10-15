import { Order } from "./common.type";
export interface GroupGuestParticipant {
  id: number;
  name: string;
  description?: string | null;
  phoneNumber?: string | null;
  email?: string | null;
  members: string[];
}

export interface GroupGuestParticipantDetail extends GroupGuestParticipant {}

export type GgpOrderField = "id" | "name" | "email" | "phoneNumber";

export type GgpSort = { field: GgpOrderField; dir: Order };

export type GgpQuery = {
  page?: number;
  pageSize?: number;
  searchName?: string;
  searchPhoneNumber?: string;
  searchEmail?: string;
  searchMember?: string;

  ids?: number[];
  sorts?: GgpSort[];
};
