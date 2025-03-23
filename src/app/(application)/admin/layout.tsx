import { SidebarProvider } from "@/components/ui/sidebar";
import React from "react";
import { AppSidebar } from "@/app/(application)/_components/sidebar";
import { adminSidebarContent } from "../data";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="p-4">
      <SidebarProvider>
        <AppSidebar items={adminSidebarContent} />
        <div className="size-full">
          {children}
        </div>
      </SidebarProvider>
    </div>
  );
};
export default Layout;
