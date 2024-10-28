"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Label } from "../atoms/label";
import { Input } from "../atoms/input";
import { Button } from "../atoms/button";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export const CreateProduct: React.FC = () => {
  const [form, setForm] = useState({
    name: "",
    SKU: "",
    description: "",
    price: 0,
    stock: 0,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [email, setEmail] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const userEmail = typeof window !== "undefined" ? localStorage.getItem("user") : null;
    setEmail(userEmail);
  }, []);
console.log(email);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: name === "price" || name === "stock" ? parseInt(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const productData = {
        ...form,
        price: parseInt(form.price.toString(), 10),
        stock: parseInt(form.stock.toString(), 10),
        createdby: email,
      };

      await axios.post(
        "https://product-2-g2b7.onrender.com/api/product/product",
        productData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authtoken")}`,
          },
        }
      );

      toast.success("Product created successfully.");
      setForm({ name: "", SKU: "", description: "", price: 0, stock: 0 });

      setTimeout(() => {
        router.replace("/admin/listproduct");
      }, 2000);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(error.response?.data?.message || "Failed to create product");
        toast.error(error.response?.data?.message || "Failed to create product");
      } else {
        setError("An unknown error occurred");
        toast.error("An unknown error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="mt-5 flex justify-center flex-col sm:w-full gap-6 items-center">
          <div>
            <h1 className="mb-5 text-4xl font-bold">Create Product</h1>
            <Label error={error}>
              NAME
              <Input
                placeholder="name"
                name="name"
                value={form.name}
                onChange={handleChange}
              />
            </Label>
            <Label error={error}>
              SKU
              <Input
                placeholder="SKU name"
                name="SKU"
                value={form.SKU}
                onChange={handleChange}
              />
            </Label>
            <Label error={error}>
              DESCRIPTION
              <Input
                placeholder="description"
                name="description"
                value={form.description}
                onChange={handleChange}
              />
            </Label>
            <Label error={error}>
              PRICE
              <Input
                placeholder="PRICE"
                type="number"
                name="price"
                value={form.price}
                onChange={handleChange}
              />
            </Label>
            <Label error={error}>
              STOCK
              <Input
                placeholder="STOCK"
                type="number"
                name="stock"
                value={form.stock}
                onChange={handleChange}
              />
            </Label>
          </div>
        </div>
        <div className="flex justify-center items-center">
          <Button loading={loading} type="submit" className="text-white">
            Submit
          </Button>
        </div>
      </form>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

