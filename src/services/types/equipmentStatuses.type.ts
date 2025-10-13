export interface EquipmentStatus {
  id: number
  code: string,
  description: string,
}

export interface equipmentStatuses {
  data: EquipmentStatus[];
  meta: {
    count: number;
  };
}
