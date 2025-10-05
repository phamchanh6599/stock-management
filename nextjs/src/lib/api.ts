import { getAccessToken, setTokens, clearTokens, getRefreshToken } from './auth';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api/v1';

interface FetchOptions extends RequestInit {
  requireAuth?: boolean;
}

export async function apiFetch<T>(endpoint: string, options: FetchOptions = {}): Promise<T> {
  const { requireAuth = false, headers = {}, ...rest } = options;

  const config: RequestInit = {
    ...rest,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
  };

  if (requireAuth) {
    const token = getAccessToken();
    if (token) {
      config.headers = {
        ...config.headers,
        'Authorization': `Bearer ${token}`,
      };
    }
  }

  let response = await fetch(`${API_URL}${endpoint}`, config);

  // Handle token refresh on 401
  if (response.status === 401 && requireAuth) {
    const refreshToken = getRefreshToken();
    if (refreshToken) {
      try {
        const refreshResponse = await fetch(`${API_URL}/auth/refresh`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ refreshToken }),
        });

        if (refreshResponse.ok) {
          const data = await refreshResponse.json();
          setTokens(data.data.accessToken, data.data.refreshToken);
          
          // Retry original request
          config.headers = {
            ...config.headers,
            'Authorization': `Bearer ${data.data.accessToken}`,
          };
          response = await fetch(`${API_URL}${endpoint}`, config);
        } else {
          clearTokens();
          window.location.href = '/login';
        }
      } catch (error) {
        clearTokens();
        window.location.href = '/login';
      }
    }
  }

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Request failed' }));
    throw new Error(error.message || 'Request failed');
  }

  return response.json();
}