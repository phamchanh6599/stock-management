import type { Metadata } from "next";
import Link from "next/link";
import { AuthProvider } from "@/components/AuthProvider";

import "./global.css";


export const metadata: Metadata = {
  title: "E-Commerce Store",
  description: "Modern e-commerce with Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <nav className="bg-white shadow-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between h-16">
                <div className="flex space-x-8">
                  <Link href="/" className="flex items-center text-lg font-bold text-gray-800 hover:text-gray-600">
                    Home
                  </Link>
                  <Link href="/products" className="flex items-center text-gray-600 hover:text-gray-800">
                    Products
                  </Link>
                  <Link href="/blog" className="flex items-center text-gray-600 hover:text-gray-800">
                    Blog
                  </Link>
                </div>
                <div className="flex items-center space-x-4">
                  <Link href="/login" className="text-gray-600 hover:text-gray-800">
                    Login
                  </Link>
                  <Link href="/signup" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                    Sign Up
                  </Link>
                </div>
              </div>
            </div>
          </nav>
          <main className="min-h-screen">
            {children}
          </main>
          <footer className="bg-gray-800 text-white py-8 mt-16">
            <div className="max-w-7xl mx-auto px-4 text-center">
              <p>&copy; 2025 E-Commerce Store. All rights reserved.</p>
            </div>
          </footer>
        </AuthProvider>
      </body>
    </html>
  );
}