import api from '../../config/axios';
import { LoginRequest, LoginResponse } from './interface';

export async function login(data: LoginRequest): Promise<LoginResponse> {
  const response = await api.post<LoginResponse>('/auth/login', data);
  return response.data;
}

export async function refreshAccessToken(): Promise<void> {
  await api.post('/auth/refresh');
}

export async function logout(): Promise<void> {
  await api.post('/auth/logout');
}
