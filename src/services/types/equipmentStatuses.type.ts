export interface equipmentStatusItems {
   id: number
    code: string,
    description: string,
}

export interface equipmentStatuses {
  data: equipmentStatusItems[];
  meta: {
    count: number;
  };
}
