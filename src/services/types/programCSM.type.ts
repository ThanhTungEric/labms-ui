import { fucultyItems } from "./faculties.type";




export interface programItems {
  id: number;
  code: string;
  name: string;
  faculty: fucultyItems[];
}

export interface programsCSM {
  data: programItems[];
  meta: {
    count: number;
  };
}
