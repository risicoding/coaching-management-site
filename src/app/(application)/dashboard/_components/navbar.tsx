import { SidebarTrigger } from "@/components/ui/sidebar";
import React from "react";

const Navbar = () => {
  return (
    <div className="flex w-full items-center justify-between">
      <SidebarTrigger />
    </div>
  );
};

export default Navbar;
