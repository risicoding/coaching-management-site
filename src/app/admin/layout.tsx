import { SidebarProvider } from "@/components/ui/sidebar";
import React from "react";
import { AppSidebar } from "./_components/sidebar";
import Navbar from "./_components/navbar";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="p-4">
      <SidebarProvider>
        <AppSidebar />
        <div className="size-full">
          <Navbar />
          {children}
        </div>
      </SidebarProvider>
    </div>
  );
};

export default AdminLayout;
