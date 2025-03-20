"use client";
import { useState } from "react";
import Menu from "./_components/menu";
import { api } from "@/trpc/react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";

const Page = () => {
  const params = useParams<{ courseId: string }>();
  const { courseId } = params;

  const [selected, setSelected] = useState("Home");

  const course = api.course.fetchById.useQuery({ id: Number(courseId) });

  return (
    <div className="space-y-2 py-6">
      {/* Top Bar */}
      <Menu />

      {/* Content Area */}
      <div className="p-4">{/* Placeholder content */}</div>
    </div>
  );
};

export default Page;
