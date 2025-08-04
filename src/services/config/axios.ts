import axios from 'axios';
import { BASE_URL } from './env';

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const csrfToken = localStorage.getItem('csrfToken');
  const accessToken = localStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');

  config.headers = config.headers || {};

  if (csrfToken) {
    config.headers['X-CSRF-Token'] = csrfToken;
  }

  if (accessToken) {
    config.headers['Authorization'] = `Bearer ${accessToken}`;
  }

  if (refreshToken) {
    config.headers['X-Refresh-Token'] = refreshToken;
  }

  return config;
});

export default api;
