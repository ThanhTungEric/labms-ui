import { Faculty } from "./faculties.type";

export interface Program {
  id: number;
  code: string;
  name: string;
  faculty: Faculty[];
}

export interface ProgramItem extends Program {}

export interface ProgramsResponse {
  data: ProgramItem[];
  meta: {
    count: number;
  };
}