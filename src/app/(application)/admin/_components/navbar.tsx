import { SidebarTrigger } from "@/components/ui/sidebar";
import React from "react";
import { UserButton } from "../../_components/user-button";

const Navbar = () => {
  return (
    <div className="flex w-full items-center justify-between">
      <SidebarTrigger />
      <UserButton />
    </div>
  );
};

export default Navbar;
