import api from '../../config/axios';
import {
  BuildingListItem,
  BuildingDetail,
  CreateBuildingDto,
  UpdateBuildingDto,
  Building,
} from '../../types/building.type';

export async function getAllBuildings(): Promise<Building[]> {
  const response = await api.get<Building[]>('/buildings');
  return response.data ?? [];
}

export async function getBuildingById(id: number): Promise<BuildingDetail> {
  const response = await api.get<BuildingDetail>(`/buildings/${id}`);
  return response.data;
}

export async function createBuilding(payload: CreateBuildingDto): Promise<BuildingListItem> {
  const response = await api.post<BuildingListItem>('/buildings', payload);
  return response.data;
}

export async function updateBuilding(id: number, payload: UpdateBuildingDto): Promise<BuildingListItem> {
  const response = await api.patch<BuildingListItem>(`/buildings/${id}`, payload);
  return response.data;
}

export async function deleteBuilding(id: number): Promise<void> {
  await api.delete(`/buildings/${id}`);
}
