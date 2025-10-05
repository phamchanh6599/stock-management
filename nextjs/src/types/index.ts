export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock_quantity: number;
  created_at?: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  content: string;
  author?: string;
  published_date?: string;
}

export interface User {
  id: string;
  email: string;
  name?: string;
  role?: string;
}

export interface AuthResponse {
  success: boolean;
  data: {
    user: User;
    accessToken: string;
    refreshToken: string;
  };
}

export interface CheckoutItem {
  product_id: string;
  quantity: number;
}

export interface CheckoutRequest {
  items: CheckoutItem[];
}