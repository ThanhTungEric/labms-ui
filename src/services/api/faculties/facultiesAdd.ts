import api from '../../config/axios';
import qs from 'qs';

export async function addFacultyItem(data: { name: string; description?: string }): Promise<void> {
  if (!data?.name) {
    throw new Error("Faculty name is required");
  }

  try {
    await api.post("/faculties", data); 
  } catch (error: any) {
    throw new Error(error?.message || "Add failed, please check and try again");
  }
}

