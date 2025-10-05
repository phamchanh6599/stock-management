import { Request, Response, NextFunction } from 'express';
import { signUp, signIn, refreshToken } from '../services/directus.service';
import { sendSuccess, sendCreated } from '../utils/api-response';

export const handleSignUp = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { email, password, first_name, last_name } = req.body;

    const user = await signUp(email, password, first_name, last_name);

    sendCreated(res, user, 'User registered successfully');
  } catch (error) {
    next(error);
  }
};

export const handleSignIn = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { email, password } = req.body;

    const authData = await signIn(email, password);

    sendSuccess(res, authData, 'Login successful');
  } catch (error) {
    next(error);
  }
};

export const handleRefreshToken = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { refresh_token } = req.body;

    if (!refresh_token) {
      throw new Error('Refresh token is required');
    }

    const authData = await refreshToken(refresh_token);

    sendSuccess(res, authData, 'Token refreshed successfully');
  } catch (error) {
    next(error);
  }
};