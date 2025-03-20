import { House, GraduationCap, School } from "lucide-react";

export const adminSidebarContent = [
  { title: "Home", href: "/admin", icon: <House className="size-5" /> },
  {
    title: "Courses",
    href: "/admin/courses",
    icon: <GraduationCap className="size-5" />,
  },
  {
    title: "Classes",
    href: "/admin/classes",
    icon: <School className="size-5" />,
  },
]

export const studentSidebarContent = [
  { title: "Home", href: "/student", icon: <House className="size-5" /> },
  {
    title: "Subjects",
    href: "/student/subjects",
    icon: <GraduationCap className="size-5" />,
  },
];
