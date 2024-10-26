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
import { Drawer, DrawerClose, DrawerContent, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { Button } from "../ui/button";
import { Edit2, Trash } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Input } from "../ui/input";

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

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  createdAt: string;
}

const ProductList: React.FC<{ productId?: string }> = ({ productId }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
const[Error,setError]=useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [inputValue, setInputValue] = useState<string>("");

  const router = useRouter();

  useEffect(() => {
    const fetchUserAndProducts = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`https://product-2-g2b7.onrender.com/api/admin/user/${productId}`);
        
        setUser(response.data.user);  // assuming response has `user` key
        setProducts(response.data.products || []);  // assuming response has `products` key
      } catch (error) {
        setError("Failed to fetch data.");
          console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserAndProducts();
  }, [productId]);

  const deleteProduct = async () => {
    if (!selectedProduct) return;
    try {
      await axios.delete(`https://product-2-g2b7.onrender.com/api/product/product/${selectedProduct.id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authtoken")}`,
        },
      });
      setProducts(products.filter((product) => product.id !== selectedProduct.id));
      toast("Product deleted successfully");
    } catch (error) {
      toast.error("Error deleting product");
      console.log(Error);
      console.log(error);
    }
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value);
  const isDeleteEnabled = selectedProduct && inputValue === selectedProduct.name;

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {user && (
        <div className="mb-4 p-4 bg-gray-100 rounded-lg shadow-md">
          <h2 className="text-xl font-bold">User Information</h2>
          <p><strong>ID:</strong> {user.id}</p>
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Role:</strong> {user.role}</p>
          <p><strong>Created At:</strong> {new Date(user.createdAt).toLocaleDateString()}</p>
        </div>
      )}

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
            <TableHead>Created BY</TableHead>
            <TableHead>Options</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product, index) => (
              <TableRow key={product.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell className="font-medium">{product.name}</TableCell>
                <TableCell>{product.description}</TableCell>
                <TableCell>${product.price.toFixed(2)}</TableCell>
                <TableCell>{product.stock}</TableCell>
                <TableCell>{product.SKU}</TableCell>
                <TableCell>{product.createdby}</TableCell>
                <TableCell>
                  <div className="flex gap-1">
                    <button
                      className="text-blue-500 hover:underline"
                      onClick={() => router.push(`/admin/editproduct/${product.id}`)}
                    >
                      <Edit2 className="w-5 h-5" />
                    </button>
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
                          <DrawerTitle>Delete {product.name}</DrawerTitle>
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
                            className="w-36"
                          >
                            Delete Product
                            <Trash />
                          </Button>
                          <DrawerClose asChild>
                            <Button variant="outline" className="w-28">
                              Cancel
                            </Button>
                          </DrawerClose>
                        </DrawerFooter>
                      </DrawerContent>
                    </Drawer>
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={8} className="text-center">
                No products found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <ToastContainer />
    </div>
  );
};

export default ProductList;
