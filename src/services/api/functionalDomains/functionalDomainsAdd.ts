import api from '../../config/axios';

export async function addFunctionalDomainsItem(data: { label: string; description?: string }): Promise<void> {
  if (!data?.label) {
    throw new Error("Functional Domains label is required");
  }

  try {
    await api.post("/functional-domains", data); 
  } catch (error: any) {
    throw new Error(error?.message || "Add failed, please check and try again");
  }
}

