import UserCard from "@/components/subjects/attendance/user-card";
import React from "react";

const Page = () => {
  return (
    <div className="flex min-h-screen w-full items-center justify-center">
      <UserCard
        id="id"
        name="risi"
        email="risi@example.com"
        image="https://randomuser.me/api/portraits/men/44.jpg"
        isPresent={false}
      />
      <UserCard
        id="id"
        name="risi"
        email="risi@example.com"
        isPresent={false}
      />
    </div>
  );
};

export default Page;
