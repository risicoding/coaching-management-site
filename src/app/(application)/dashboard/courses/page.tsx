import { CourseList } from "./_components/course-list";
import React from "react";
import Navbar from "./_components/navbar";

const Page = () => {
  return (
    <div className="space-y-4 py-5">
      <Navbar />
      <CourseList />
    </div>
  );
};

export default Page;
