import { CourseList } from "@/components/course-list";
import React from "react";
import Navbar from "./_components/navbar";

const Page = () => {
  return (
    <div className="space-y-4 py-2">
      <Navbar/>
      <CourseList/>
    </div>
  );
};

export default Page;
