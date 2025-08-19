import api from '../../config/axios';

export async function addPriceCategoriesItem(data: { label: string; description?: string ; rank: number; from: number; to:number }): Promise<void> {
  if (!data?.label) {
    throw new Error("Price Categories label is required");
  }

  try {
    await api.post("/price-categories", data); 
  } catch (error: any) {
    throw new Error(error?.message || "Add failed, please check and try again");
  }
}

