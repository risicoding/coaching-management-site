import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import React from "react";
import { AppSidebar } from "./_components/app-sidebar";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <SidebarProvider>
        <AppSidebar />

        <div className="">
          <SidebarTrigger />

          {children}
        </div>
      </SidebarProvider>
    </div>
  );
};

export default AdminLayout;
