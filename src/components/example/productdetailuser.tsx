"use client"
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";

import { Input } from "../ui/input";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "../ui/button";
import { Edit2, Trash } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  SKU: string;
  createdby: string;
  createdAt: string;
  updatedAt: string;
}

const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState<string>("");
  const router = useRouter();
 
    // const email=window.localStorage.getItem("user");
    useEffect(()=>{
      if(window!==undefined){
        const email=window.localStorage.getItem("user");
        setEmail(email)
      }
    })
  
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await axios.get<Product[]>(
          `https://product-2-g2b7.onrender.com/api/product/pri/${email}`
        );
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
        setError("Failed to fetch product data.");
      } finally {
        setLoading(false);
      }//https://product-2-g2b7.onrender.com/api/product/pri/${email}
    };
    fetchProducts();
  }, [email]);

  const deleteProduct = async () => {
    if (!selectedProduct) return;
    try {
      await axios.delete(
        `https://product-2-g2b7.onrender.com/api/product/product/${selectedProduct.id}`,
        {
          headers: {
            Authorization: `Bearer ${window.localStorage.getItem("authtoken")}`,
          },
        }
      );
      setProducts(products.filter((product) => product.id !== selectedProduct.id));
      toast("Product deleted successfully");
    } catch (error) {
      console.error("Error deleting product", error);
      toast.error("Error deleting product");
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value);


  const isDeleteEnabled = selectedProduct && inputValue === selectedProduct.name;

  if (loading) {
    return (
      <Table>
        <TableCaption className="mt-16">List of Products</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Sl.no</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Stock</TableHead>
            <TableHead>SKU</TableHead>
            {/* <TableHead>Created BY</TableHead> */}
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: 5 }).map((_, index) => (
            <TableRow key={index}>
              {Array.from({ length: 6 }).map((__, cellIndex) => (
                <TableCell key={cellIndex}>
                  <Skeleton className="h-6 w-full rounded" />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold flex justify-center my-9">List of Products</h2>
      <div className="mb-4 w-1/2">
        <Input
          type="text"
          placeholder="Search by Product Name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full"
        />
      </div>
      <Table>
        <TableCaption className="mt-16">List of Products</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Sl.no</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Stock</TableHead>
            <TableHead>SKU</TableHead>
            {/* <TableHead>Created BY</TableHead> */}
            <TableHead>Options</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredProducts.map((product, index) => (
            <TableRow key={product.id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell className="font-medium">{product.name}</TableCell>
              <TableCell>{product.description}</TableCell>
              <TableCell>${product.price.toFixed(2)}</TableCell>
              <TableCell>{product.stock}</TableCell>
              <TableCell>{product.SKU}</TableCell>
              {/* <TableCell>{product.createdby}</TableCell> */}
              <TableCell>
                <div className="flex gap-1">
                  <button
                    className="text-blue-500 hover:underline"
                    onClick={() => router.push(`/admin/editproduct/${product.id}`)}
                  >
                    <Edit2 className="w-5 h-5" />
                  </button>
                  <div>
                    <Drawer>
                      <DrawerTrigger asChild>
                        <div
                          onClick={() => setSelectedProduct(product)}
                          className="cursor-pointer text-red-500 hover:underline"
                        >
                          <Trash className="w-5 h-5" />
                        </div>
                      </DrawerTrigger>
                      <DrawerContent>
                        <DrawerHeader>
                          <DrawerTitle>
                            Are you sure you want to delete the product {product.name}?
                          </DrawerTitle>
                          <DrawerDescription>
                            This action cannot be undone.
                          </DrawerDescription>
                        </DrawerHeader>
                        <div className="my-4">
                          <input
                            type="text"
                            placeholder="Type product name to confirm"
                            value={inputValue}
                            onChange={handleInputChange}
                            className="border p-2 w-full"
                          />
                        </div>
                        <DrawerFooter>
                          <Button
                            variant="destructive"
                            disabled={!isDeleteEnabled}
                            onClick={deleteProduct}
                            className="w-36 flex justify-center items-center gap-2"
                          >
                            {loading ? "Deleting..." : "Delete Product"}
                            <Trash />
                          </Button>
                          <DrawerClose asChild>
                            <div>
                              <Button variant="outline" className="w-28">
                                Cancel
                              </Button>
                            </div>
                          </DrawerClose>
                        </DrawerFooter>
                      </DrawerContent>
                    </Drawer>
                  </div>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <ToastContainer />
    </div>
  );
};

export default ProductList;
