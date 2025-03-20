"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import Link from "next/link";
import Image from "next/image";
import { ChevronsUpDown, GraduationCap, House, School } from "lucide-react";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserProfile, useSession } from "@clerk/nextjs";
import { DialogContent } from "@radix-ui/react-dialog";

// Menu items
const items = [
  {
    title: "Home",
    url: "/",
    icon: <House className="size-5" />,
  },
  {
    title: "Courses",
    url: "/admin/courses",
    icon: <GraduationCap className="size-5" />,
  },
  {
    title: "Classes",
    url: "/admin/classes",
    icon: <School className="size-5" />,
  },
];

export function AppSidebar() {
  const { isLoaded, isSignedIn, session } = useSession();
  const sidebar = useSidebar();
  const user = session?.user;

  return (
    <Sidebar variant="floating" collapsible="icon">
      <SidebarHeader className="flex gap-4 px-4 py-4">
        <div className="flex items-center gap-2">
          <Image src="/logo.svg" width={30} height={30} alt="logo" />
          <p className="truncate text-xl font-bold">Urban Classes</p>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton size='md' asChild>
                    <Link href={item.url}>
                      {item.icon}
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <Dialog>
              <DialogTrigger className="w-full px-2">
                <div className="flex w-full items-center justify-center gap-4">
                  <Avatar className="size-6 rounded-lg">
                    <AvatarImage
                      src={user?.imageUrl ?? ""}
                      alt={`${user?.firstName ?? "User"} ${user?.lastName ?? ""}`}
                    />
                    <AvatarFallback className="rounded-lg">
                      {user?.firstName?.slice(0, 2) ?? "CN"}
                    </AvatarFallback>
                  </Avatar>

                  {sidebar.state === "expanded" && (
                    <div className="flex w-full items-center justify-around">
                      <div className="flex flex-col items-start">
                        <span className="text-xs">{user?.firstName}</span>
                        <span className="truncate text-xs">
                          {user?.lastName}
                        </span>
                      </div>
                      <span className="flex w-full items-center justify-end">
                        <ChevronsUpDown className="size-4" />
                      </span>
                    </div>
                  )}
                </div>
              </DialogTrigger>
              <DialogContent className="h-screen w-screen">
                {isLoaded && isSignedIn ? <UserProfile /> : <p>Loading...</p>}
              </DialogContent>
            </Dialog>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
