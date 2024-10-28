"use client";
import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast"; 
import { Label } from "../atoms/label";
import { Input } from "../atoms/input";
import { Button } from "../atoms/button";
import { TextArea } from "../atoms/textArea";
interface ProductFormData {
  name: string;
  SKU: string;
  description: string;
  price: number;
  stock: number;

}
const initialProductData: ProductFormData = {
  name: "",
  SKU: "",
  description: "",
  price: 0,
  stock: 0,
};

const EditProduct: React.FC<{ productId?: string }> = ({ productId }) => {
  const [formData, setFormData] = useState<ProductFormData>(initialProductData);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
 

  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    if (productId) {
      const fetchProduct = async () => {
        try {
          const response = await axios.get(
            `https://product-2-g2b7.onrender.com/api/product/product/${productId}`
          );
          setFormData(response.data);
        } catch (error) {
          console.error("Error fetching product details:", error);
          toast({
            title: "Error fetching product details",
            variant: "destructive",
          });
        }
      };

      fetchProduct();
    }
  }, [productId, toast]);
  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, files } = e.target as HTMLInputElement;
    setFormData((prevData) => ({
      ...prevData,
      [name]: files && files[0] ? files[0] : value,
    }));
  };
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      

      const product = {
        ...formData,
        price: Number(formData.price), 
        stock: Number(formData.stock),
      };

      if (productId) {
        await axios.patch(
          `https://product-2-g2b7.onrender.com/api/product/product/${productId}`,
          product,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("authtoken")}`,
            },
          }
        );
        toast({ title: "Product updated successfully." });
      } else {
        await axios.post(
          "https://product-2-g2b7.onrender.com/api/product",
          product,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("authtoken")}`,
            },
          }
        );
        toast({ title: "Product created successfully." });
      }

      router.push("/manager/productlist"); 
    } catch (error) {
      console.error("Error saving product data:", error);
      setError(
        "An error occurred while saving product details. Please try again."
      );
      toast({ title: "An error occurred", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">
        {productId ? "Edit Product" : "Create Product"}
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <Label title="Product Name">
            <Input
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </Label>
        </div>

        <div className="mb-4">
          <Label title="SKU">
            <Input
              name="SKU"
              value={formData.SKU}
              onChange={handleInputChange}
              required
            />
          </Label>
        </div>

        <div className="mb-4">
          <Label title="Description">
            <TextArea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              required
            />
          </Label>
        </div>

        <div className="mb-4">
          <Label title="Price">
            <Input
              name="price"
              type="number"
              value={formData.price}
              onChange={handleInputChange}
              required
            />
          </Label>
        </div>

        <div className="mb-4">
          <Label title="Stock">
            <Input
              name="stock"
              type="number"
              value={formData.stock}
              onChange={handleInputChange}
              required
            />
          </Label>
        </div>


        <Button type="submit" disabled={loading}>
          {productId ? "Update Product" : "Create Product"}
        </Button>

        {error && <p className="text-red-500">{error}</p>}
      </form>
    </div>
  );
};

export default EditProduct;
