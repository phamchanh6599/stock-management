export interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  description: string;
  stock_quantity: number;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  author: string;
  published_date: string;
}

export interface CheckoutItem {
  product_id: string;
  quantity: number;
}

export interface CheckoutRequest {
  items: CheckoutItem[];
}

export interface DirectusAuthResponse {
  access_token: string;
  refresh_token: string;
  expires: number;
}

export interface DirectusUser {
  id: string;
  email: string;
  first_name?: string;
  last_name?: string;
}

export interface StockCheckResult {
  product_id: string;
  requested_quantity: number;
  available_quantity: number;
  is_available: boolean;
}