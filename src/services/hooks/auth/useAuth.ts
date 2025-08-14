import { useState, useEffect, useRef } from 'react';
import { login, refreshAccessToken, logout } from '../../api/auth/auth';
import { LoginRequest } from '../../types/auth.type';
import api from '../../config/axios';

function getStoredCsrfToken(): string | null {
  return localStorage.getItem('csrfToken');
}

export function useAuth() {
  const [loading, setLoading] = useState(false);
  const [csrfToken, setCsrfToken] = useState<string | null>(getStoredCsrfToken);
  const [error, setError] = useState<string | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const loginUser = async (credentials: LoginRequest) => {
    setLoading(true);
    setError(null);
    try {
      const result = await login(credentials);
      setCsrfToken(result.csrfToken);

      localStorage.setItem('csrfToken', result.csrfToken);
      localStorage.setItem('accessToken', result.accessToken);
      localStorage.setItem('refreshToken', result.refreshToken);

      api.defaults.headers.common.Authorization = `Bearer ${result.accessToken}`;
    } catch (err: any) {
      if (err.response?.status === 401) setError('Invalid username or password');
      else setError('Login failed. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const refreshSession = async () => {
    const storedToken = getStoredCsrfToken();
    if (!storedToken) throw new Error('Missing CSRF token');

    try {
      const { accessToken } = await refreshAccessToken();
      localStorage.setItem('accessToken', accessToken);
      api.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
    } catch (err: any) {
      setError('Session refresh failed. Please log in again.');
      throw err;
    }
  };

  const logoutUser = async () => {
    try {
      await logout();
    } catch (err: any) {
      console.warn('Logout failed (maybe already logged out)', err);
    } finally {
      localStorage.removeItem('csrfToken');
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      setCsrfToken(null);

      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      delete api.defaults.headers.common.Authorization;
    }
  };

  const isLoggedIn = !!csrfToken;

  useEffect(() => {
    if (!isLoggedIn) return;
    refreshSession().catch(() => {
      logoutUser();
    });

    intervalRef.current = setInterval(() => {
      refreshSession().catch(() => {
        logoutUser();
        setError('Session refresh failed. Please log in again.');
      });
    }, 10 * 60 * 1000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isLoggedIn]);

  return {
    loginUser,
    logoutUser,
    refreshSession,
    csrfToken,
    isLoggedIn,
    loading,
    error,
  };
}
