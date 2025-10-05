import { useState, useEffect } from 'react';
import { User, AuthResponse } from '@/types';
import { setTokens, clearTokens, isAuthenticated } from '@/lib/auth';
import { apiFetch } from '@/lib/api';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is authenticated on mount
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    const response = await apiFetch<AuthResponse>('/auth/signin', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });

    if (response.success) {
      setTokens(response.data.accessToken, response.data.refreshToken);
      setUser(response.data.user);
    }

    return response;
  };

  const signup = async (email: string, password: string, name: string) => {
    const response = await apiFetch<AuthResponse>('/auth/signup', {
      method: 'POST',
      body: JSON.stringify({ email, password, name }),
    });

    if (response.success) {
      setTokens(response.data.accessToken, response.data.refreshToken);
      setUser(response.data.user);
    }

    return response;
  };

  const logout = () => {
    clearTokens();
    setUser(null);
    window.location.href = '/';
  };

  return {
    user,
    loading,
    isAuthenticated: isAuthenticated(),
    login,
    signup,
    logout,
  };
}