import api from '../../config/axios';

export async function addProgramsItem(data: { code: string; description?: string ; facultyId: number}): Promise<void> {
  if (!data?.code) {
    throw new Error("Program codde is required");
  }

  try {
    await api.post("/pograms", data); 
  } catch (error: any) {
    throw new Error(error?.message || "Add failed, please check and try again");
  }
}

