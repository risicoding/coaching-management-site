"use client";
import { Card,  CardHeader, CardTitle } from "@/components/ui/card";
import { api } from "@/trpc/react";

import {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
} from "@/components/ui/context-menu";
import { FaTrash, FaPen, FaLocationArrow } from "react-icons/fa";
import { EditCourseForm } from "@/app/admin/courses/_components/edit-course";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";

export const CourseList = () => {
  const courses = api.course.fetchAll.useQuery();
  return (
    <div className="flex flex-wrap gap-2">
      {courses?.data?.map((course) => (
        <CourseCard
          id={course.id}
          key={course.id}
          name={course.name}
          pricing={course.pricing}
          offerings={[""]}
        />
      ))}
    </div>
  );
};

interface CourseCardProps {
  id: number;
  name: string;
  pricing: number;
  offerings: string[];
}

const CourseCard: React.FC<CourseCardProps> = ({ id, name, pricing }) => {
  const utils = api.useUtils();
  const { mutate: deleteCourse } = api.course.delete.useMutation({
    onSuccess: async () => {
      utils.course.fetchAll.invalidate();
    },
  });
  return (
    <Sheet>
      <ContextMenu>
        <ContextMenuTrigger className="w-full">
          <Card className="w-full max-w-md rounded-lg border border-gray-200 bg-white p-6 shadow-md transition-shadow hover:shadow-lg">
            <CardHeader className="px-2 py-2">
              <CardTitle className="text-lg font-semibold text-gray-900">
                {name}
              </CardTitle>
              <p className="text-lg font-medium">&#8377;{pricing}</p>
            </CardHeader>
          </Card>
        </ContextMenuTrigger>
        <ContextMenuContent className="w-48">
          <SheetTrigger>
            <ContextMenuItem>
              <FaPen className="mr-2" /> Edit
            </ContextMenuItem>
          </SheetTrigger>
          <ContextMenuItem onClick={() => deleteCourse({ id })}>
            <FaTrash className="mr-2" /> Delete
          </ContextMenuItem>
          <ContextMenuItem>
            <FaLocationArrow className="mr-2" /> Open
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Add a New Course</SheetTitle>
          <SheetDescription>Fill in the course details below.</SheetDescription>
        </SheetHeader>
        <EditCourseForm id={id} />
      </SheetContent>
    </Sheet>
  );
};
