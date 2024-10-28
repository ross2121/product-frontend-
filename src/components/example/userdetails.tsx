"use client";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState, Suspense } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../ui/drawer";
import { Trash } from "lucide-react";
import { Button } from "../ui/button";
import { withAuth } from "./useauth";

interface User {
  email: string;
  id: string;
  name: string;
  role: string;
}

export function UserTable() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [deleteConfirmInput, setDeleteConfirmInput] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const usersPerPage = 20;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          "https://product-2-g2b7.onrender.com/api/product/users",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("authtoken")}`,
            },
          }
        );
        setUsers(response.data.user);
      } catch (error) {
        console.error("Error fetching users:", error);
        toast.error(`Error ${error}`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
        });
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const filteredUsers = users.filter((user) =>
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  const handleDeleteUser = async () => {
    if (!selectedUser) return;
    setIsDeleting(true);
    try {
      await axios.delete(
        `https://product-2-g2b7.onrender.com/api/admin/user/${selectedUser.id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authtoken")}`,
          },
        }
      );
      setUsers((prev) => prev.filter((user) => user.id !== selectedUser.id));
      toast.success("User deleted successfully!");
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error(`Error ${error}`);
    } finally {
      setIsDeleting(false);
      setSelectedUser(null);
      setDeleteConfirmInput("");
    }
  };

  return (
    <>
      <ToastContainer />
      <Suspense fallback={<div>Loading...</div>}>
        <div>
          <h1 className="flex justify-center text-3xl font-medium">Details of all Users</h1>
          <div className="mt-20 mb-14">
            <Input
              placeholder="Filter emails..."
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              className="max-w-sm"
            />
          </div>
          <Table>
            <TableCaption className="mt-16">List of users</TableCaption>
            <TableHeader>
              <TableRow>
                <TableCell>Sl.no</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading
                ? Array.from({ length: 5 }).map((_, index) => (
                    <TableRow key={index}>
                      {Array(4)
                        .fill(null)
                        .map((_, idx) => (
                          <TableCell key={idx}>
                            <Skeleton className="h-6 w-20 rounded" />
                          </TableCell>
                        ))}
                    </TableRow>
                  ))
                : currentUsers.map((user, index) => (
                    <TableRow key={user.id}>
                      <TableCell>{index + 1 + indexOfFirstUser}</TableCell>
                      <TableCell className="font-semibold">
                        <Link href={`/admin/userdetails/${user.id}`}>
                          <span className="text-blue-600 hover:underline">
                            {user.name}
                          </span>
                        </Link>
                      </TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.role}</TableCell>
                      <TableCell>
                        <Drawer>
                          <DrawerTrigger asChild>
                            <div
                              onClick={() => setSelectedUser(user)}
                              className="cursor-pointer text-red-500 hover:underline"
                            >
                              <Trash className="w-5 h-5" />
                            </div>
                          </DrawerTrigger>
                          <DrawerContent>
                            <DrawerHeader>
                              <DrawerTitle>
                                Are you sure you want to delete {selectedUser?.name}?
                              </DrawerTitle>
                              <DrawerDescription>
                                This action cannot be undone.
                              </DrawerDescription>
                            </DrawerHeader>
                            <div className="my-4">
                              <input
                                type="text"
                                placeholder="Type user name to confirm"
                                value={deleteConfirmInput}
                                onChange={(e) => setDeleteConfirmInput(e.target.value)}
                                className="border p-2 w-full"
                              />
                            </div>
                            <DrawerFooter>
                              <Button
                                variant="destructive"
                                disabled={
                                  deleteConfirmInput !== selectedUser?.name || isDeleting
                                }
                                onClick={handleDeleteUser}
                                className="w-36 flex justify-center items-center gap-2"
                              >
                                {isDeleting ? "Deleting..." : "Delete User"}
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
                      </TableCell>
                    </TableRow>
                  ))}
            </TableBody>
          </Table>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                />
              </PaginationItem>
              {Array.from({ length: totalPages }, (_, index) => (
                <PaginationItem key={index}>
                  <PaginationLink
                    onClick={() => setCurrentPage(index + 1)}
                    className={currentPage === index + 1 ? "font-bold" : ""}
                  >
                    {index + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationNext
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </Suspense>
    </>
  );
}
export default withAuth(UserTable,"admin")