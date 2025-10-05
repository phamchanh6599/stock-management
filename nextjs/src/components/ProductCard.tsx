'use client';

import { Product } from '@/types';
import { useAuthContext } from './AuthProvider';
import { apiFetch } from '@/lib/api';
import { useState } from 'react';

export default function ProductCard({ product }: { product: Product }) {
  const { isAuthenticated } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      setMessage('Please login to purchase');
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      await apiFetch('/checkout', {
        method: 'POST',
        requireAuth: true,
        body: JSON.stringify({
          items: [{ product_id: product.id, quantity: 1 }]
        })
      });
      setMessage('Order placed successfully!');
    } catch (error: any) {
      setMessage(error.message || 'Failed to place order');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition">
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{product.name}</h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
        <div className="flex justify-between items-center mb-3">
          <span className="text-2xl font-bold text-blue-600">${product.price}</span>
          <span className={`text-sm ${product.stock_quantity > 0 ? 'text-green-600' : 'text-red-600'}`}>
            {product.stock_quantity > 0 ? `In Stock (${product.stock_quantity})` : 'Out of Stock'}
          </span>
        </div>
        <button
          onClick={handleAddToCart}
          disabled={loading || product.stock_quantity === 0}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {loading ? 'Processing...' : 'Buy Now'}
        </button>
        {message && (
          <p className={`text-sm mt-2 text-center ${message.includes('success') ? 'text-green-600' : 'text-red-600'}`}>
            {message}
          </p>
        )}
      </div>
    </div>
  );
}