import { Product } from '@/types';
import ProductList from '@/components/ProductList';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';

async function getProducts(searchParams: any): Promise<Product[]> {
  const params = new URLSearchParams();
  
  if (searchParams.category) params.set('category', searchParams.category);
  if (searchParams.search) params.set('search', searchParams.search);
  if (searchParams.page) params.set('page', searchParams.page);
  if (searchParams.limit) params.set('limit', searchParams.limit);

  const url = `${API_URL}/products?${params.toString()}`;
  
  const res = await fetch(url, {
    cache: 'no-store', // SSR - always fetch fresh data
  });

  if (!res.ok) {
    throw new Error('Failed to fetch products');
  }

  const data = await res.json();
  
  return data.data || [];
}

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const products = await getProducts(searchParams);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">Products</h1>
      <ProductList initialProducts={products} />
    </div>
  );
}