import { useState } from 'react';
import { login, refreshAccessToken, logout } from '../../api/auth/auth';
import { LoginRequest } from '../../api/auth/interface';

function getStoredCsrfToken(): string | null {
  return localStorage.getItem('csrfToken');
}

export function useAuth() {
  const [loading, setLoading] = useState(false);
  const [csrfToken, setCsrfToken] = useState<string | null>(getStoredCsrfToken);
  const [error, setError] = useState<string | null>(null);

  const loginUser = async (credentials: LoginRequest) => {
    setLoading(true);
    setError(null);
    try {
      const result = await login(credentials);
      setCsrfToken(result.csrfToken);
      localStorage.setItem('csrfToken', result.csrfToken);
    } catch (err: any) {
      if (err.response?.status === 401) {
        setError('Invalid username or password');
      } else {
        setError('Login failed. Please try again later.');
      }
    } finally {
      setLoading(false);
    }
  };

  const refreshSession = async () => {
    const storedToken = getStoredCsrfToken();
    if (!storedToken) throw new Error('Missing CSRF token');

    try {
      await refreshAccessToken();
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
      setCsrfToken(null);
    }
  };

  const isLoggedIn = !!csrfToken;

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
