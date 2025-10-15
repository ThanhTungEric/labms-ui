import api from '../../config/axios';

export async function addFunctionalCategoriesItem(data: { label: string; description?: string }): Promise<void> {
  if (!data?.label) {
    throw new Error("Functional Categories name is required");
  }

  try {
    await api.post("/functional-categories", data); 
  } catch (error: any) {
    throw new Error(error?.message || "Add failed, please check and try again");
  }
}

