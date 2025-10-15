export interface IndividualGuestParticipant {
  id: number;
  firstName: string;
  middleName?: string | null;
  lastName: string;
  title?: string | null;
  email?: string | null;
  phoneNumber?: string | null;
  description?: string | null;
}

export interface IndividualGuestParticipantDetail extends IndividualGuestParticipant {}

export type IgpOrderField = keyof Pick<
  IndividualGuestParticipant,
  "id" | "firstName" | "lastName" | "email" | "phoneNumber" | "title"
>;

export type IgpSort = { field: IgpOrderField; dir: "asc" | "desc" };

export interface IgpQuery {
  page?: number;
  pageSize?: number;
  searchName?: string;
  searchPhoneNumber?: string;
  searchEmail?: string;
  ids?: number[];
  sorts?: IgpSort[];
}
