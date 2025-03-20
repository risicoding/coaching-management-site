import { SidebarTrigger } from "@/components/ui/sidebar";
import { UserButton } from "@clerk/nextjs";
import React from "react";

const Navbar = () => {
  return (
    <div className="flex w-full items-center justify-between">
      <SidebarTrigger />
      <UserButton />
    </div>
  );
};

export default Navbar;
