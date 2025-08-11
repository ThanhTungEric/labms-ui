 export interface Faculty {
  id: number;
  label: string;
}



export interface programItems {
  id: number;
  code: string;
  name: string;
  faculty: Faculty[];
}

export interface programsCSM {
  data: programItems[];
  meta: {
    count: number;
  };
}
