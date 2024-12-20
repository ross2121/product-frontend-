import React, { Suspense, useEffect, useState } from 'react';
import axios from 'axios';
import ProductStockChart from './productstockchart';
// import ProductStockPieChart from './piecchart';
import { withAuth } from './useauth';

interface Product {
  id: number;  
  name: string;
  stock: number;
}

const Productstock: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedEmail = window.localStorage.getItem('user');
      setEmail(storedEmail);
    }
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      if (!email) return;
      setLoading(true);
      try {
        const response = await axios.get(`https://product-2-g2b7.onrender.com/api/product/pri/${email}`);
        setProducts(response.data);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [email]);

  const totalProducts = products.length;
  const lowStock = products.filter((product) => product.stock < 50).length;
  const outOfStock = products.filter((product) => product.stock === 0).length;

  return (
    <Suspense>
      <div className="container mx-auto p-6 space-y-6">
        <h1 className="text-4xl font-bold text-center mb-6 text-gray-800">Inventory Manager ERP Dashboard</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-blue-100 text-blue-900 p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-medium">Total Products</h3>
            <p className="text-2xl font-bold">{totalProducts}</p>
          </div>
          <div className="bg-yellow-100 text-yellow-900 p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-medium">Low Stock Products</h3>
            <p className="text-2xl font-bold">{lowStock}</p>
          </div>
          <div className="bg-red-100 text-red-900 p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-medium">Out of Stock</h3>
            <p className="text-2xl font-bold">{outOfStock}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Product Stock Levels</h2>
          {loading ? (
            <p className="text-gray-500">Loading...</p>
          ) : (
            products.length > 0 ? (
              <div className="h-64 w-full">
                <ProductStockChart products={products} />
              </div>
            ) : (
              <p className="text-gray-500">No products available.</p>
            )
          )}
        </div>
      </div>
    </Suspense>
  );
};

export default withAuth(Productstock, 'manager');
