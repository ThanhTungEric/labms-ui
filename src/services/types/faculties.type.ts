export interface fucultyItems {
  id: number;
  name: string;
  description: string;
}

export interface faculties {

  data: fucultyItems[];
  meta: {
    count: number;
  };
}
