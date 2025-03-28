import { SidebarProvider } from "@/components/ui/sidebar";
import React from "react";
import { AppSidebar } from "./_components/sidebar";
import Navbar from "./_components/navbar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="p-4">
      <SidebarProvider>
        <AppSidebar />
        <div className="size-full space-y-4">
          <Navbar />
          {children}
        </div>
      </SidebarProvider>
    </div>
  );
};
export default Layout;
