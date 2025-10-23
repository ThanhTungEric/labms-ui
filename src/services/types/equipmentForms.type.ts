import { SortItem } from "./common.type";

export interface equipmentFormItems {
  id: number
  name: string,
  description: string,
}

export interface EquipmentForm extends equipmentFormItems{}

export interface equipmentForms {
  data: equipmentFormItems[];
  meta: {
    count: number;
  };
}

export interface GetEquipmentFormsParams {
  skip?: number;
  take?: number;
  search?: string;
  sorts?: SortItem[];
  _refresh?: any;
}