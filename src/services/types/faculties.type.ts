export interface fucultyItems {
  id: number;
  name: string;
  descripton: string;
}

export interface faculties {
  data: fucultyItems[];
  meta: {
    count: number;
  };
}
