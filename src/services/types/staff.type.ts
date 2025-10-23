import { Program } from "./program.type";
import { AcademicTitle } from "./academicTitles.type";

export type Staff = {
  id: number;
  code: string;
  function: string;
  firstName: string;
  lastName: string;
  middleName?: string;
  phoneNumber: string;
  email: string;
  title: string;
  expertises: string[];
  academicTitles: AcademicTitle[];
  programs: Program[];
};

export type StaffDetail = Staff;

export type StaffFormState = Omit<Staff, 'id' | 'expertises' | 'academicTitles' | 'programs' | 'phoneNumber' | 'email'> & {
  phoneNumber: string | undefined;
  email: string | undefined;
  academicTitleIds: number[];
  programIds: number[];
  expertises: string[]; 
};

export interface StaffUpdatePayload {
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

export type StaffOrderField = "id" | "firstName" | "lastName" | "middleName" | "code" | "function" | "phoneNumber" | "email" | "title";

export type StaffSort = {
  field: StaffOrderField;
  dir: "asc" | "desc";
};

export type StaffQuery = {
  page?: number;
  pageSize?: number;
  searchCode?: string;
  searchName?: string;
  searchPhoneNumber?: string;
  searchEmail?: string;
  sorts?: StaffSort[];
};