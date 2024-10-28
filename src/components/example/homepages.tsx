// pages/index.tsx
"use client"
import React, { Suspense, useEffect, useState } from 'react';
import axios from 'axios';
import ProductStockChart from './productstockchart';
import { withAuth } from './useauth';
interface Product {
  id: string;
  name: string;
  stock: number;
}
const Productstock: React.FC = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({ user: [] });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://product-2-g2b7.onrender.com/api/product/product', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authtoken")}`,
          },
        });
        
        const userresponse = await axios.get(
          "https://product-2-g2b7.onrender.com/api/product/users",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("authtoken")}`,
            },
          }
        );

        console.log(userresponse.data);
        setUser(userresponse.data); // Ensure this is the correct structure
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching product data:', error);
        setLoading(false);
        alert("Error fetching product data. Please try again later.");
      }
    };

    fetchProducts();
  }, []);

  // Example statistics data for display purposes
  const totalProducts = products.length;
  const lowStock = products.filter((product: Product) => product.stock < 50).length;
  const outOfStock = products.filter((product:Product) => product.stock === 0).length;
  const totaluser = user.user ? user.user.length : 0; // Update here
  console.log(totaluser);
  
  return (
    // <Suspense>
    <Suspense fallback={<div>Loading...</div>}>
    <div className="container mx-auto p-6 space-y-6">
      <h1 className="text-4xl font-bold text-center mb-6 text-gray-800">Admin ERP Dashboard</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Dashboard Stat Cards */}
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
        <div className="bg-green-100 text-green-900 p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-medium">Total Inventory Manager</h3>
          <p className="text-2xl font-bold">{totaluser}</p>
        </div>
      </div>

      {/* Product Stock Chart */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Product Stock Levels</h2>
        {loading ? (
          <p className="text-gray-500">Loading...</p>
        ) : (
          <div className="h-64 w-600">
            {/* Set a smaller height for a more compact view */}
            <ProductStockChart products={products} />
          </div>
        )}
      </div>
    </div>
    </Suspense>
  );
};

export default withAuth(Productstock, "admin");
