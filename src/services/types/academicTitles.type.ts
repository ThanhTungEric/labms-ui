import { SortItem } from "./common.type";

interface Items {
  id: number;
  label: string;
  description: string;
}

export interface AcademicTitle extends Items {}

export interface AcademicTitles {
  data: AcademicTitle[]; 
  meta: {
    count: number;
  };
}

export interface GetAcademicTitlesParams {
  skip?: number;
  take?: number;
  search?: string;
  sorts?: SortItem[];
  _refresh?: any; 
}
