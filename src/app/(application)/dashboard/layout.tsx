import { SidebarProvider } from "@/components/ui/sidebar";
import React from "react";
import { AppSidebar } from "@/components/app-sidebar";
import Navbar from "@/components/navbar";
import { GraduationCap, House } from "lucide-react";

const studentSidebarContent = [
  { title: "Home", href: "/student", icon: <House className="size-5" /> },
  {
    title: "Subjects",
    href: "/student/subjects",
    icon: <GraduationCap className="size-5" />,
  },
];

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="p-4">
      <SidebarProvider>
        <AppSidebar items={studentSidebarContent} />
        <div className="size-full space-y-4">
          <Navbar />
          {children}
        </div>
      </SidebarProvider>
    </div>
  );
};
export default Layout;
