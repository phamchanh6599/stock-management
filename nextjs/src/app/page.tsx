import Link from 'next/link';

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <div className="text-center">
        <h1 className="text-5xl font-bold text-gray-900 mb-6">
          Welcome to Our Store
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Discover amazing products with modern e-commerce experience
        </p>
        <div className="flex justify-center gap-4">
          <Link 
            href="/products"
            className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition"
          >
            Shop Now
          </Link>
          <Link 
            href="/blog"
            className="bg-gray-200 text-gray-800 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-gray-300 transition"
          >
            Read Blog
          </Link>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mt-20">
        <div className="text-center p-6 bg-white rounded-lg shadow">
          <div className="text-4xl mb-4">🚀</div>
          <h3 className="text-xl font-bold mb-2">Fast Delivery</h3>
          <p className="text-gray-600">Get your products delivered quickly</p>
        </div>
        <div className="text-center p-6 bg-white rounded-lg shadow">
          <div className="text-4xl mb-4">💎</div>
          <h3 className="text-xl font-bold mb-2">Premium Quality</h3>
          <p className="text-gray-600">Only the best products for you</p>
        </div>
        <div className="text-center p-6 bg-white rounded-lg shadow">
          <div className="text-4xl mb-4">🔒</div>
          <h3 className="text-xl font-bold mb-2">Secure Payment</h3>
          <p className="text-gray-600">Your transactions are safe with us</p>
        </div>
      </div>
    </div>
  );
}