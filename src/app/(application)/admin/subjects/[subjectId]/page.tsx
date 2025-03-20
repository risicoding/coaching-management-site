"use client";
import { useState } from "react";
import Menu from "./_components/menu";
import { Button } from "@/components/ui/button";
import { api } from "@/trpc/react";
import { useParams } from "next/navigation";

const Page = () => {
  const params = useParams<{courseId:string}>();
  const { courseId } = params;
  const [selected, setSelected] = useState("Home");

  const course = api.course.fetchById.useQuery({ id: Number(courseId) });

  return (
    <div className="py-6 space-y-2 ">
      {/* Top Bar */}
      <div className="flex items-center justify-between border-b pb-2">
        <h2 className="text-lg font-bold">{course.data?.name}</h2>
        <Button>Edit</Button>
      </div>
      <Menu />

      {/* Content Area */}
      <div className="p-4">{/* Placeholder content */}</div>
    </div>
  );
};

export default Page;
