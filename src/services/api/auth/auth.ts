import api from '../../config/axios';
import { LoginRequest, LoginResponse, RefreshResponse } from '../../types/auth.type';

export async function login(data: LoginRequest): Promise<LoginResponse> {
  const { data: res } = await api.post<LoginResponse>('/auth/login', data);
  return res;
}

export async function refreshAccessToken(): Promise<RefreshResponse> {
  const { data } = await api.post<RefreshResponse>('/auth/refresh');
  return data;
}

export async function logout(): Promise<void> {
  await api.post('/auth/logout');
}
