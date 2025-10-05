import Cookies from 'js-cookie';

const ACCESS_TOKEN_KEY = 'access_token';
const REFRESH_TOKEN_KEY = 'refresh_token';

export const setTokens = (accessToken: string, refreshToken: string) => {
  Cookies.set(ACCESS_TOKEN_KEY, accessToken, { 
    expires: 7, // 7 days
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict'
  });
  Cookies.set(REFRESH_TOKEN_KEY, refreshToken, { 
    expires: 30, // 30 days
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict'
  });
};

export const getAccessToken = (): string | undefined => {
  return Cookies.get(ACCESS_TOKEN_KEY);
};

export const getRefreshToken = (): string | undefined => {
  return Cookies.get(REFRESH_TOKEN_KEY);
};

export const clearTokens = () => {
  Cookies.remove(ACCESS_TOKEN_KEY);
  Cookies.remove(REFRESH_TOKEN_KEY);
};

export const isAuthenticated = (): boolean => {
  return !!getAccessToken();
};