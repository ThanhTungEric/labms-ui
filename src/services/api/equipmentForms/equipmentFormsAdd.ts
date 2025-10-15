import api from '../../config/axios';

export async function addEquipmentFormsItem(data: { name: string; description?: string }): Promise<void> {
  if (!data?.name) {
    throw new Error("Academic title label is required");
  }

  try {
    await api.post("/forms", data); 
  } catch (error: any) {
    throw new Error(error?.message || "Add failed, please check and try again");
  }
}

