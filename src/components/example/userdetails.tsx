"use client";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { Skeleton } from "@/components/ui/skeleton"; // Import the Skeleton component
import Link from "next/link";
import { Input } from "@/components/ui/input";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"; // Import Shadcn Pagination components
interface User {
    email: string;
    id:string,
    name:string,
    role:string
    // add other properties of User if needed
  }
export function UserTable() {
  const [users, setUsers] = useState<User[]>([]);  // Hold users array
  const [loading, setLoading] = useState(true);   // Loading state for skeleton
  const [searchTerm, setSearchTerm] = useState("");  // Search input state
  const [currentPage, setCurrentPage] = useState(1); // Pagination state
  const usersPerPage = 20; // Number of users to display per page

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
        console.log(response.data);  // Check what data is returned
        setUsers(response.data.user); // Accessing the `user` array correctly
      } catch (error) {
        console.error("Error fetching users:", error);
        toast.error(`Error ${error}`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchUsers(); // Call the function to fetch users
  }, []); // Empty dependency array to run once on mount

//   const formatDate = (dateString: string) => {
//     const date = new Date(dateString);
//     return date.toLocaleDateString(undefined, {
//       year: "numeric",
//       month: "long",
//       day: "numeric",
//     });
//   };

  // Filter users based on the search term
  const filteredUsers = Array.isArray(users)
    ? users.filter((user:User) =>
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  // Calculate the current users to display
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  // Calculate total pages
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  return (
    <>
      <ToastContainer />
      <div>
        <h1 className="flex justify-center text-3xl font-medium">
          Details of all Users
        </h1>
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
              {/* <TableCell>Created At</TableCell>
              <TableCell>Updated At</TableCell> */}
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading
              ? // Display skeleton rows while loading
                Array.from({ length: 5 }).map((_, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <Skeleton className="h-6 w-20 rounded" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-6 w-20 rounded" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-6 w-20 rounded" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-6 w-20 rounded" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-6 w-20 rounded" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-6 w-20 rounded" />
                    </TableCell>
                  </TableRow>
                ))
              : // Render filtered user data when loading is complete
                currentUsers.map((user, index) => (
                    <TableRow key={user.id}>
                    <TableCell>{index + 1 + indexOfFirstUser}</TableCell>
                    <TableCell className="font-semibold">
                      <Link href={`/admin/user-details/${user.id}`}>
                        <span className="text-blue-600 hover:underline">{user.name}</span>
                      </Link>
                    </TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.role}</TableCell>
                    {/* Uncomment when ready to use dates */}
                    {/* <TableCell>{formatDate(user.createdAt)}</TableCell> */}
                    {/* <TableCell>{formatDate(user.updatedAt)}</TableCell> */}
                  </TableRow>
                  
                ))}
          </TableBody>
        </Table>

        {/* Shadcn Pagination Controls */}
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
                  href="#"
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
    </>
  );
}
