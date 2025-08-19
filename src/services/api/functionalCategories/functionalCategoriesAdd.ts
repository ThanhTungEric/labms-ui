import api from '../../config/axios';
import qs from 'qs';

export async function addFunctionalCategoriesItem(data: { name: string; description?: string }): Promise<void> {
  if (!data?.name) {
    throw new Error("Functional Categories name is required");
  }

  try {
    await api.post("/functional-categories", data); 
  } catch (error: any) {
    throw new Error(error?.message || "Add failed, please check and try again");
  }
}

