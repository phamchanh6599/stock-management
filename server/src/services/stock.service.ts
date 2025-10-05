import { getProductsByIds, updateProductStock } from './directus.service';
import { CheckoutItem, StockCheckResult, Product } from '../types';
import { ApiError } from '../utils/api-error';


export const checkStockAvailability = async (items: CheckoutItem[]): Promise<StockCheckResult[]> => {
  const productIds = items.map((item) => item.product_id);
  const products = await getProductsByIds(productIds);

  const productMap = new Map<string, Product>();
  products.forEach((product) => productMap.set(product.id, product));

  const stockResults: StockCheckResult[] = [];

  for (const item of items) {
    const product = productMap.get(item.product_id);

    if (!product) {
      throw ApiError.notFound(`Product with ID ${item.product_id} not found`);
    }

    const isAvailable = product.stock_quantity >= item.quantity;

    stockResults.push({
      product_id: item.product_id,
      requested_quantity: item.quantity,
      available_quantity: product.stock_quantity,
      is_available: isAvailable,
    });
  }

  return stockResults;
};

export const validateStock = async (items: CheckoutItem[]): Promise<void> => {
  const stockResults = await checkStockAvailability(items);

  const outOfStockItems = stockResults.filter((result) => !result.is_available);

  if (outOfStockItems.length > 0) {
    const errorMessages = outOfStockItems.map(
      (item) =>
        `Product ${item.product_id}: Requested ${item.requested_quantity}, Available ${item.available_quantity}`
    );

    throw ApiError.badRequest(
      `Stock unavailable for the following items: ${errorMessages.join('; ')}`
    );
  }
};

export const deductStock = async (items: CheckoutItem[]): Promise<void> => {
  const productIds = items.map((item) => item.product_id);
  const products = await getProductsByIds(productIds);

  const productMap = new Map<string, Product>();
  products.forEach((product) => productMap.set(product.id, product));

  for (const item of items) {
    const product = productMap.get(item.product_id);

    if (!product) {
      throw ApiError.notFound(`Product with ID ${item.product_id} not found`);
    }

    const newQuantity = product.stock_quantity - item.quantity;

    if (newQuantity < 0) {
      throw ApiError.badRequest(
        `Insufficient stock for product ${item.product_id}`
      );
    }

    await updateProductStock(item.product_id, newQuantity);
  }
};