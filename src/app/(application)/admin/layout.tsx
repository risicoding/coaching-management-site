"use client";

import { SidebarProvider } from "@/components/ui/sidebar";
import React from "react";
import { AppSidebar, type AppSidebarProps } from "@/components/app-sidebar";
import { School, FolderOpen, House, HandCoins, Users } from "lucide-react";
import Navbar from "@/components/navbar";
import { useQueryClient } from "@tanstack/react-query";

const adminSidebarContent = [
  { title: "Home", href: "/admin", icon: <House className="size-5" /> },
  {
    title: "Classes",
    href: "/admin/classes",
    icon: <School className="size-5" />,
  },
  {
    title: "Subjects",
    href: "/admin/subjects",
    icon: <FolderOpen className="size-5" />,
  },
  { title: "Payments", href: "/admin/payments", icon: <HandCoins /> },
  { title: "Users", href: "/admin/users", icon: <Users /> },
] as AppSidebarProps["items"];

const Layout = ({ children }: { children: React.ReactNode }) => {
  const queryClient = useQueryClient();
  void queryClient.prefetchQuery({ queryKey: ["classes", "all"] });
  void queryClient.prefetchQuery({ queryKey: ["subjects", "all"] });
  void queryClient.prefetchQuery({ queryKey: ["payments", "all"] });
  void queryClient.prefetchQuery({ queryKey: ["users", "all"] });

  return (
    <div className="p-4">
      <SidebarProvider>
        <AppSidebar items={adminSidebarContent} />

        <div className="size-full space-y-6">
          <Navbar />
          {children}
        </div>
      </SidebarProvider>
    </div>
  );
};

export default Layout;
