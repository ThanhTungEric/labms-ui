import api from '../../config/axios';
import qs from 'qs';

export async function addAcademicTitleItem(data: { label: string; description?: string }): Promise<void> {
  if (!data?.label) {
    throw new Error("Academic title label is required");
  }

  try {
    await api.post("/academic-titles", data); 
  } catch (error: any) {
    throw new Error(error?.message || "Add failed, please check and try again");
  }
}

