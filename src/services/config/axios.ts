import axios from 'axios';
import { BASE_URL } from './env';

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const csrfToken = localStorage.getItem('csrfToken');

  if (csrfToken) {
    config.headers = config.headers || {};
    config.headers['X-CSRF-Token'] = csrfToken;
  }

  return config;
});

export default api;
