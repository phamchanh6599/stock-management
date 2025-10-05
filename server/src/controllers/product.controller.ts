import { Request, Response, NextFunction } from 'express';
import { getProducts, getProductById } from '../services/directus.service';
import { sendSuccess } from '../utils/api-response';

export const handleGetAllProducts = async (
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const products = await getProducts();

    sendSuccess(res, products, 'Products fetched successfully');
  } catch (error) {
    next(error);
  }
};

export const handleGetProductById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;

    const product = await getProductById(id);

    sendSuccess(res, product, 'Product fetched successfully');
  } catch (error) {
    next(error);
  }
};