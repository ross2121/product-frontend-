// src/pages/index.tsx
"use client"
// import { motion } from "framer-motion";
import Productstock from "@/components/example/userproduct";


const Home = () => {
  return (
    // <Suspense fallback={<div>Loading...</div>}>
    <div>
      {/* Navbar */}
      {/* <HeaderNavAdmin /> */}
     
      {/* Main Product Section */}
      <Productstock />

      {/* Hero Section */}
      {/* <div className="px-16 py-20 text-center bg-blue-500 text-white">
        <h1 className="text-4xl font-bold">Welcome to ERP Dashboard</h1>
        <p className="mt-4 text-lg">
          Manage your business data efficiently with real-time insights and analytics.
        </p>
        <motion.button
          className="mt-8 px-6 py-3 bg-white text-blue-500 font-semibold rounded shadow hover:bg-gray-200"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Get Started
        </motion.button>
      </div> */}

      {/* Information Cards Section */}
      {/* <div className="py-12 bg-white px-16 grid gap-8 md:grid-cols-3">
        <InfoCard
          title="Inventory Management"
          description="Track stock levels, manage orders, and optimize inventory across locations."
          icon="📦"
        />
        <InfoCard
          title="Sales Analytics"
          description="Get insights into sales performance and forecast future trends effectively."
          icon="📊"
        />
        <InfoCard
          title="Customer Support"
          description="Streamline support and improve customer satisfaction with CRM tools."
          icon="💬"
        />
      </div> */}

      {/* Additional Component */}
      {/* <div className="my-12 px-16">
        <LampDemo />
      </div> */}

      {/* Footer */}
      <footer className="py-8 bg-gray-800 text-center text-white">
        <p>© 2024 Your ERP Solution. All rights reserved.</p>
      </footer>
      
    </div>
    // </Suspense>
  );
};

export default Home;
