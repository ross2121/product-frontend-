"use client";
import React, { useState, useEffect } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/navbar";
import Link from "next/link";
import LogoutAdmin from "../ui/logoutbtnadmin";
import NotificationIcon from "./notificationicon"; // Import the notification icon component
import axios from "axios";

interface Product {
  id: string;
  name: string;
  stock: number;
}

const HeaderNavAdmin = () => {
  const [outOfStockProducts, setOutOfStockProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch out-of-stock products
  useEffect(() => {
    const fetchOutOfStockProducts = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "https://product-2-g2b7.onrender.com/api/product/product"
        );

        // Filter products with stock < 50
        const lowStockProducts = response.data.filter(
          (product: Product) => product.stock < 50
        );
        setOutOfStockProducts(lowStockProducts);
      } catch (err) {
        console.error("Error fetching out-of-stock products:", err);
        setError("Failed to fetch out-of-stock products.");
      } finally {
        setLoading(false);
      }
    };
    fetchOutOfStockProducts();
  }, []);

  return (
    <Navbar
      shouldHideOnScroll
      isBlurred={true}
      className="h-14 sm:px-16 px-4 z-10 text-black dark:bg-transparent dark:text-white"
    >
      <NavbarBrand>
        <Link href={"/admin"}>
          <img alt="logo" src="/ERP.png" className="w-28 h-20" />
        </Link>
      </NavbarBrand>

      <NavbarContent className="sm:flex gap-4" justify="center">
        <NavbarItem>
          <LogoutAdmin />
        </NavbarItem>

        {/* Notification Icon for Out-of-Stock Products */}
        <NavbarItem className="relative">
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <NotificationIcon outOfStockProducts={outOfStockProducts} />
          )}
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
};

export default HeaderNavAdmin;
