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
import Link from "next/link";
import * as XLSX from "xlsx"
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import autoTable from 'jspdf-autotable'
import { withAuth } from "./useauth";

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
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState<string>("");

  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const userEmail = window.localStorage.getItem("user");
      setEmail(userEmail);
    }
  }, []);
  const generatePDF = () => {
      const doc = new jsPDF();
      
      doc.text("Product Report", 20, 10);
      const tableData = products.map((product, index) => [
        index + 1,
        product.name,
        product.description,
        `$${product.price.toFixed(2)}`,
        product.stock,
        product.SKU,
        product.createdby,
      ]);
     autoTable(doc,{
        head: [["Sl.no", "Name", "Description", "Price", "Stock", "SKU", "Created By"]],
        body: tableData,
      });
      doc.save("product_report.pdf");
    };
    const generateExcel = () => {
      const worksheetData = products.map((product, index) => ({
        "Sl.no": index + 1,
        Name: product.name,
        Description: product.description,
        Price: `$${product.price.toFixed(2)}`,
        Stock: product.stock,
       SKU: product.SKU,
        "Created By": product.createdby,
      }));
      const worksheet = XLSX.utils.json_to_sheet(worksheetData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Product Report");
      XLSX.writeFile(workbook, "product_report.xlsx");
    };

  const fetchProducts = async () => {
    setLoading(true);
    try {
      console.log("Fetching products for email:", email);
      const response = await axios.get<Product[]>(
        `https://product-2-g2b7.onrender.com/api/product/pri/${email}`
      );
      if (response.data.length === 0) {
        setError("No products available.");
      } else {
        setProducts(response.data);
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error("Error fetching products:", error.message);
        setError(error.response?.data.message || error.message || "Failed to fetch product data.");
      } else {
        console.error("Unknown error fetching products:", error);
        setError("An unknown error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (email) {
      fetchProducts();
    }
  }, [email]);

  const deleteProduct = async () => {
    if (!selectedProduct) return;
    setLoading(true);
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
      <div className="flex gap-4">
        <Button onClick={generatePDF}>Download PDF</Button>
        <Button onClick={generateExcel}>Download Excel</Button>
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
            <TableHead>Options</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredProducts.map((product, index) => (
            <TableRow key={product.id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell className="font-semibold">
                <Link href={`/manager/chart/${product.id}`}>
                  <span className="text-blue-600 hover:underline">{product.name}</span>
                </Link>
              </TableCell>
              <TableCell>{product.description}</TableCell>
              <TableCell>${product.price.toFixed(2)}</TableCell>
              <TableCell>{product.stock}</TableCell>
              <TableCell>{product.SKU}</TableCell>
              <TableCell>
                <div className="flex gap-1">
                  <button
                    className="text-blue-500 hover:underline"
                    onClick={() => router.push(`/manager/editproduct/${product.id}`)}
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

export default withAuth(ProductList, "manager");

//  // 