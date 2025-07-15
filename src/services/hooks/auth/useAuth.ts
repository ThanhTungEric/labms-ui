import { useState } from 'react';
import { login } from '../../api/auth/auth';
import { LoginRequest } from '../../api/auth/interface';

export function useAuth() {
  const [loading, setLoading] = useState(false);
  const [csrfToken, setCsrfToken] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const loginUser = async (credentials: LoginRequest) => {
    setLoading(true);
    setError(null);
    try {
      const result = await login(credentials);
      setCsrfToken(result.csrfToken);
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

  return { loginUser, csrfToken, loading, error };
}
