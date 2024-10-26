"use client";
import React, { useState, useEffect, Suspense } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import axios from "axios"
import {
  Clapperboard,
  Plus,
  User,
  UsersRound,
} from "lucide-react";
import { Button } from "./button";
import Link from "next/link";

import {
  Sheet,

  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/ui/sheet";
import { ModeToggle } from "@/ui/themeToggle";

export default function LogoutAdmin() {
  const [user, setUser] = useState({ value: "" });
  const [dropdown, setDropdown] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();
console.log(dropdown);
  useEffect(() => {
    const token = localStorage.getItem("authtoken");
    if (token) {
      setUser({ value: token });
    }
  }, [pathname, searchParams]);

  const logout = async() => {
    localStorage.removeItem("authtoken");
    localStorage.removeItem("user");
    await axios.post("https://product-2-g2b7.onrender.com/api/admin/logut");
    setUser({ value: "" });
    setDropdown(false);
  };



  return (
    <div className="relative">
      <Suspense>
        {user.value === "" ? (
          <Link href={"/admin/auth/login"}>
            <Button>Login</Button>
          </Link>
        ) : (
          <Sheet>
            <SheetTrigger asChild>
              <Button variant={"ghost"}>
                <User />
              </Button>
            </SheetTrigger>
            <SheetContent className="flex flex-col h-full px-0 w-[300px] sm:w-[540px]  dark:bg-gray-700  dark:backdrop-filter drak:backdrop-blur-xl dark:bg-opacity-20">
              <SheetHeader className="flex mt-5">
                <div className="flex items-center justify-between px-5">
                  <div>
                    <SheetTitle>Hey! Admin </SheetTitle>
                  </div>
                  <div className="sm:hidden block">
                    <ModeToggle />
                  </div>
                </div>
              </SheetHeader>
              <div
                className="mt-5 gap-5 flex items-center cursor-pointer px-7 hover:bg-gray-200 dark:hover:bg-gray-900 transition-colors duration-200 w-full p-2" // Added w-full and p-2
                onClick={() => (window.location.href = "/admin/product")} // Redirect on click
              >
                <div>
                  <Plus className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-gray-900 dark:text-white">Create Cinema</p>
                  <span className="text-xs text-gray-500 dark:text-gray-300">
                    Create Product
                  </span>
                </div>
              </div>
              
             
              <div
                className="mt-5 gap-5 flex items-center cursor-pointer px-7 hover:bg-gray-200 dark:hover:bg-gray-900 transition-colors duration-200 w-full p-2" // Added w-full and p-2
                onClick={() => (window.location.href = "/admin/users")} // Redirect on click
              >
                <div>
                  <UsersRound className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-gray-900 dark:text-white">
                    Details of Users
                  </p>
                  <span className="text-xs text-gray-500 dark:text-gray-300">
                    Get all the details of the user
                  </span>
                </div>
              </div>
              <div
                className="mt-5 gap-5 flex items-center cursor-pointer px-7 hover:bg-gray-200 dark:hover:bg-gray-900 transition-colors duration-200 w-full p-2" // Added w-full and p-2
                onClick={() => (window.location.href = "/admin/listproduct")} // Redirect on click
              >
                <div>
                  <Clapperboard className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-gray-900 dark:text-white">All Movies</p>
                  <span className="text-xs text-gray-500 dark:text-gray-300">
                    Get all the Products
                  </span>
                </div>
              </div>
             
              {/* Spacer to push the button to the bottom */}
              <div className="mt-auto" />{" "}
              {/* This empty div will take up the remaining space */}
              <div className="flex justify-center mb-5">
                <Link href={"/admin/login"}>
                  <Button variant="destructive" onClick={logout}>
                    Sign Out
                  </Button>{" "}
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        )}
      </Suspense>
    </div>
  );
}
