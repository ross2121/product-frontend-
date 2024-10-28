// HeaderNavAdmin.tsx
"use client"
import React, { useState, useEffect } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/navbar";
import Link from "next/link";
import LogoutAdmin from "../ui/logotuser";
import NotificationIcon from "./notificationicon";
import axios from "axios";

interface Product {
  id: string;
  name: string;
  stock: number;
}

const HeaderNavAdmin = () => {
  const [outOfStockProducts, setOutOfStockProducts] = useState<Product[]>([]);
  const [email, setEmail] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
console.log(error);
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedEmail = window.localStorage.getItem("user");
      setEmail(storedEmail);
    }
  }, []);

 
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);   

      try {
        if (email) {
          console.log("Fetching products for email:", email);
          const response = await axios.get(
            `https://product-2-g2b7.onrender.com/api/product/pri/${email}`
          );
          console.log("Response data:", response.data);
          if (Array.isArray(response.data)) {
            const outOfStockProducts = response.data.filter((product: Product) => product.stock < 50);
            setOutOfStockProducts(outOfStockProducts);
          } else {
            console.error("Expected response data to be an array of products.");
          }
          
        }
      } catch (err) {
        let errorMessage = "An unknown error occurred";
        if (axios.isAxiosError(err) && err.response?.data) {
          errorMessage =
            typeof err.response.data === "string"
              ? err.response.data
              : err.response.data.message || errorMessage;
        } else if (err instanceof Error) {
          errorMessage = err.message;
        }
        console.error("Error fetching products:", errorMessage);
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    if (email) {
      fetchProducts();
    }
  }, [email]);

  return (
    <Navbar
      shouldHideOnScroll
      isBlurred
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
        <NavbarItem className="relative">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <NotificationIcon outOfStockProducts={outOfStockProducts} />
          )}
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
};

export default HeaderNavAdmin;
