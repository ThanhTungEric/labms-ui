export interface Faculty {
  id: number;
  name: string;
  description: string;
}

export interface fucultyItems extends Faculty {}

export interface faculties {
  data: fucultyItems[];
  meta: {
    count: number;
  };
}
