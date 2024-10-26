"use client";
import React, { Suspense } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/navbar";
import Link from "next/link";
import LogoutAdmin from "../ui/logoutbtnadmin";
// import StaggeredDropDown from "../Profile";

const HeaderNavAdmin = () => {
  // const [droppdown, setdropdown] = useState(false);
  // const togglerdropdown = () => {
  //   setdropdown(!droppdown);
  // };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Navbar
        shouldHideOnScroll
        isBlurred={true}
        className="fixed top-0 left-0 w-full h-14 sm:px-16 px-4 z-10 text-black dark:bg-transparent dark:text-white"
      >
        <NavbarBrand>
          <Link href={"/admin"}>
            <img
              alt="logo"
              src="../../../assets/logo4.gif"
              className="w-28 h-20"
            />
          </Link>
        </NavbarBrand>
        <NavbarContent className="sm:flex gap-4" justify="center">
          <NavbarItem>
            <LogoutAdmin />
          </NavbarItem>
          <NavbarItem className="hidden sm:block">
            {/* <ModeToggle /> */}
          </NavbarItem>
        </NavbarContent>
      </Navbar>
    </Suspense>
  );
};

export default HeaderNavAdmin;
