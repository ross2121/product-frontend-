"use client";
import React, { useState } from "react";
import axios from "axios";
import { Label } from "../atoms/label";
import { Input } from "../atoms/input";
import { Button } from "../atoms/button";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Createproduct = () => {
  const [form, setForm] = useState<{
    name: string;
    SKU: string;
    description: string;
    price: number;
    stock: number;
    // posterUrl: string | File; // Allow both string and File
  }>({
    name: "",
    SKU: "",
    description: "",
    price: 0,
    stock: 0,
    // posterUrl: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false);
//   const [imageURL, setImageURL] = useState("");
  const router = useRouter();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, files } = e.target as HTMLInputElement;

    setForm((prevForm) => ({
      ...prevForm,
      [name]: files && files[0] ? files[0] : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    setError("");
    const email=localStorage.getItem('user')
console.log(email);
    try {
      const product = {
        ...form,
        price: parseInt(form.price.toString(),10),
        stock: parseInt(form.stock.toString(), 10),
        createdby:email
      };
      await axios.post(
        "https://product-2-g2b7.onrender.com/api/product/product",
        product,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authtoken")}`,
          },
        }
      );

      toast.success("Product created successfully.");

      // Reset the form
      setForm({
        name: "",
        SKU: "",
        description: "",
        price: 0,
        stock: 0,
       
      });

      setTimeout(() => {
        router.replace("/manager/productlist");
      }, 2000);
    } catch (error: unknown) {
        let errorMessage = "Failed to create movie";
      
        // Check if error is an instance of AxiosError (or something similar)
        if (axios.isAxiosError(error)) {
          // Access error message from response if available, or fall back to generic message
          errorMessage = error.response?.data?.message || errorMessage;
        } else if (error instanceof Error) {
          // For non-Axios errors, get message from Error object
          errorMessage = error.message;
        }
      
        setError(errorMessage);
        console.log(error);
        toast.error(errorMessage);
      
      
    } finally {
      setLoading(false);
      setUploading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="mt-5 flex justify-center flex-col sm:w-full gap-6 items-center">
          <div>
            <h1 className="mb-5 text-4xl font-bold">Create Product</h1>
            <Label  error={error}>
                NAME
              <Input
                placeholder="name"
                name="name"
                value={form.name}
                onChange={handleChange}
              />
            </Label>
            <Label  error={error}>
                SKU
              <Input
                placeholder="SKU name"
                name="SKU"
                value={form.SKU}
                onChange={handleChange}
              />
            </Label>
            <Label  error={error}>
                DESCRIPTION
              <Input
                // type=""
                placeholder="description"
                name="description"
                value={form.description}
                onChange={handleChange}
              />
            </Label>
            <Label  error={error}>
                PRICE
              <Input
                placeholder="PRICE"
                type="Number"
                name="price"
                value={form.price}
                onChange={handleChange}
              />
            </Label>
            <Label  error={error}>
                Stock
              <Input
                placeholder="STOCK"
                type="Number"
                name="stock"
                value={form.stock}
                onChange={handleChange}
              />
            </Label>
          </div>
          
        </div>
        <div className="flex justify-center items-center ">
          <Button loading={loading || uploading} type="submit" className="text-white">
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
