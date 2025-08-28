export interface equipmentFormItems {
  id: number
  name: string,
  description: string,
}

export interface equipmentForms {
  data: equipmentFormItems[];
  meta: {
    count: number;
  };
}
