import { AuthenticationMode , createDirectus, rest, authentication, readItems, readItem, login , refresh, AuthenticationData  } from '@directus/sdk';
import { config } from '../config/env';
import { ApiError } from '../utils/api-error';
import { Product } from '../types';

const client = createDirectus(config.DIRECTUS_URL).with(authentication('json')).with(rest());
let accessToken: string | null = null;

const authenticate = async (): Promise<void> => {
  try {
    const response = await client.login(config.DIRECTUS_ADMIN_EMAIL, config.DIRECTUS_ADMIN_PASSWORD);
    
    accessToken = response.access_token;
  } catch (error) {
    throw ApiError.internal('Failed to authenticate with Directus');
  }
};

const ensureAuthenticated = async (): Promise<void> => {
  if (!accessToken) {
    await authenticate();
  }
};

export const signUp = async (
  email: string,
  password: string,
  firstName?: string,
  lastName?: string
): Promise<any> => {
  try {
    const response = await fetch(`${config.DIRECTUS_URL}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
        first_name: firstName,
        last_name: lastName,
        role: 'customer',
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      if (typeof error === 'object' && error !== null && 'errors' in error) {
        // @ts-ignore
        throw new Error(error.errors?.[0]?.message || 'Sign up failed');
      }
      throw new Error('Sign up failed');
    }

    return await response.json();
  } catch (error: any) {
    throw ApiError.badRequest(error.message || 'Sign up failed');
  }
};


export const signIn = async (email: string, password: string) => {
  try {
    const result = await client.request(login( email, password ));

    return result;
  } catch (error: any) {
    throw ApiError.unauthorized('Invalid email or password');
  }
};

export const refreshToken = async (refreshToken: AuthenticationMode ): Promise<AuthenticationData> => {
  try {
    const result = await client.request(refresh(refreshToken));
    
    return result;
  } catch (error) {
    throw ApiError.unauthorized('Invalid refresh token');
  }
};

export const getProducts = async (): Promise<Product[]> => {
  try {
    const products = await client.request<Product[]>(
      readItems('Products' as any, {
        filter: {
          stock_quantity: {
            _gt: 0,
          },
        },
      })
    );

    return products;
  } catch (error: any) {
    throw ApiError.internal('Failed to fetch products from Directus');
  }
};

export const getProductById = async (id: string): Promise<Product> => {
  try {
    const product = await client.request<Product>(
      readItem('Products' as any, id)
    );

    if (!product || product.stock_quantity <= 0) {
      throw ApiError.notFound('Product not found or out of stock');
    }

    return product;
  } catch (error: any) {
    if (error instanceof ApiError) throw error;
    throw ApiError.internal('Failed to fetch product from Directus');
  }
};

export const getProductsByIds = async (ids: string[]): Promise<Product[]> => {
  try {
    const products = await client.request<Product[]>(
      readItems('Products' as any, {
        filter: {
          id: {
            _in: ids,
          },
        },
      })
    );

    return products;
  } catch (error) {
    throw ApiError.internal('Failed to fetch products from Directus');
  }
};

export const updateProductStock = async (productId: string, newQuantity: number): Promise<void> => {
  await ensureAuthenticated();

  try {
    const response = await fetch(`${config.DIRECTUS_URL}/items/products/${productId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        stock_quantity: newQuantity,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to update stock');
    }
  } catch (error) {
    throw ApiError.internal(`Failed to update stock for product ${productId}`);
  }
};