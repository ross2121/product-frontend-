// src/pages/index.tsx
"use client";
import React from "react";
import { useRouter } from "next/navigation";

const Home = () => {
  const router = useRouter();

  const handleAdminClick = () => {
    router.push("/admin");
  };

  const handleManagerClick = () => {
    router.push("/manager");
  };

  return (
    <div>
      {/* Header Section */}
      {/* <HeaderNavAdmin /> */}

      {/* Hero Section */}
      <div className="px-16 py-20 text-center bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 text-white">
        <h1 className="text-5xl font-bold mb-6 animate-fade-in-down">
          Welcome to Your ERP Dashboard
        </h1>
        <p className="mt-4 text-lg max-w-xl mx-auto">
          Effortlessly manage business data, track inventory, monitor sales, and 
          engage with customers—all on one powerful platform.
        </p>
      </div>

      {/* Role Selection Section */}
      <div className="my-12 flex flex-col items-center gap-8">
        <h2 className="text-3xl font-semibold text-gray-800">Choose Your Role</h2>
        <div className="flex gap-8">
          {/* Admin Role Card */}
          <div className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow w-60 text-center">
            <h3 className="text-2xl font-bold mb-4">Admin</h3>
            <p className="text-gray-600 mb-6">
              Manage overall business operations, control inventory, and 
              gain insights into company performance.
            </p>
            <button
              onClick={handleAdminClick}
              className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition"
            >
              Go to Admin Dashboard
            </button>
          </div>

          {/* Manager Role Card */}
          <div className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow w-60 text-center">
            <h3 className="text-2xl font-bold mb-4">Manager</h3>
            <p className="text-gray-600 mb-6">
              Oversee team activities, track performance metrics, and manage 
              stock to keep business operations smooth.
            </p>
            <button
              onClick={handleManagerClick}
              className="px-4 py-2 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 transition"
            >
              Go to Manager Dashboard
            </button>
          </div>
        </div>
      </div>

      {/* Feature Highlights */}
      <div className="bg-gray-100 py-16 px-10 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
        <div className="text-center">
          <div className="text-5xl mb-4">📦</div>
          <h3 className="text-xl font-semibold mb-2">Inventory Management</h3>
          <p className="text-gray-700">
            Keep track of stock levels, manage orders, and optimize your 
            inventory seamlessly.
          </p>
        </div>
        <div className="text-center">
          <div className="text-5xl mb-4">📊</div>
          <h3 className="text-xl font-semibold mb-2">Sales Analytics</h3>
          <p className="text-gray-700">
            Analyze sales data to gain insights and make data-driven decisions.
          </p>
        </div>
        <div className="text-center">
          <div className="text-5xl mb-4">💬</div>
          <h3 className="text-xl font-semibold mb-2">Customer Support</h3>
          <p className="text-gray-700">
            Enhance customer satisfaction with efficient support and CRM tools.
          </p>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-8 bg-gray-800 text-center text-white mt-12">
        <p>© 2024 Your ERP Solution. All rights reserved.</p>
        <div className="mt-2">
          <a href="/about" className="text-sm hover:underline">About Us</a> | 
          <a href="/privacy" className="ml-2 text-sm hover:underline">Privacy Policy</a>
        </div>
      </footer>
    </div>
  );
};

export default Home;
