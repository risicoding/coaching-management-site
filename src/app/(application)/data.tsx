import {
  House,
  GraduationCap,
  School,
  FolderOpen,
  Users,
  HandCoins,
} from "lucide-react";

export const adminSidebarContent = [
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
] as { title: string; href: string; icon: React.JSX.Element }[];

export const studentSidebarContent = [
  { title: "Home", href: "/student", icon: <House className="size-5" /> },
  {
    title: "Subjects",
    href: "/student/subjects",
    icon: <GraduationCap className="size-5" />,
  },
] as { title: string; href: string; icon: React.ReactNode }[];
