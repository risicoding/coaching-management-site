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
} from "@/components/ui/sidebar";
import Link from "next/link";
import Image from "next/image";

export type AppSidebarProps={
  items:{title:string,href:string,icon:React.JSX.Element}[]
}

export const AppSidebar=({
  items,
}: AppSidebarProps)=> {
  return (
    <Sidebar variant="floating" collapsible="icon">
      <SidebarHeader className="flex gap-4 px-4 py-4">
        <div className="flex items-center gap-2">
          <Image src="/logo.svg" width={30} height={30} alt="logo" />
          <p className="truncate text-lg">Urban Classes</p>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton size="md" asChild>
                    <Link href={item.href}>
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
            {/* <Dialog> */}
            {/*   <DialogTrigger className="w-full px-2"> */}
            {/*     <div className="flex w-full items-center justify-center gap-4"> */}
            {/*       <Avatar className="size-6 rounded-lg"> */}
            {/*         <AvatarImage */}
            {/*           src={user?.imageUrl ?? ""} */}
            {/*           alt={`${user?.firstName ?? "User"} ${user?.lastName ?? ""}`} */}
            {/*         /> */}
            {/*         <AvatarFallback className="rounded-lg"> */}
            {/*           {user?.firstName?.slice(0, 2) ?? "CN"} */}
            {/*         </AvatarFallback> */}
            {/*       </Avatar> */}
            {/**/}
            {/*       {sidebar.state === "expanded" && ( */}
            {/*         <div className="flex w-full items-center justify-around"> */}
            {/*           <div className="flex flex-col items-start"> */}
            {/*             <span className="text-xs">{user?.firstName}</span> */}
            {/*             <span className="truncate text-xs"> */}
            {/*               {user?.lastName} */}
            {/*             </span> */}
            {/*           </div> */}
            {/*           <span className="flex w-full items-center justify-end"> */}
            {/*             <ChevronsUpDown className="size-4" /> */}
            {/*           </span> */}
            {/*         </div> */}
            {/*       )} */}
            {/*     </div> */}
            {/*   </DialogTrigger> */}
            {/*   <DialogContent className="h-screen w-screen"> */}
            {/*     {isLoaded && isSignedIn ? <UserProfile /> : <p>Loading...</p>} */}
            {/*   </DialogContent> */}
            {/* </Dialog> */}
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
