import { Response, NextFunction } from 'express';
import { validateStock, checkStockAvailability } from '../services/stock.service';
import { sendSuccess } from '../utils/api-response';
import { AuthRequest } from '../middleware/auth.middleware';
import { CheckoutRequest } from '../types';

export const handleProcessCheckout = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { items }: CheckoutRequest = req.body;

    await validateStock(items);

    const response = {
      message: 'Stock validated successfully. Proceed with payment.',
      user_id: req.user?.id,
      items,
      total_items: items.reduce((sum, item) => sum + item.quantity, 0),
    };

    sendSuccess(res, response, 'Checkout validation successful');
  } catch (error) {
    next(error);
  }
};

export const handleCheckStock = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { items }: CheckoutRequest = req.body;

    const stockResults = await checkStockAvailability(items);

    sendSuccess(res, stockResults, 'Stock information retrieved');
  } catch (error) {
    next(error);
  }
};