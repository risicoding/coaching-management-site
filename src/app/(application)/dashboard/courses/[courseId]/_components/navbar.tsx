import React from "react";
import { api } from "@/trpc/react";
import { Button } from "@/components/ui/button";

const Navbar = ({name,id}:{name:string,id:number}) => {

  // const { mutateAsync } = api.course.enroll.useMutation();

  const handleEnroll = async () => {
    console.log('enroll,')
  };

  return <div>
      <div className="flex items-center justify-between border-b pb-2">
        <h2 className="text-lg font-bold">{name}</h2>

        <Button onClick={handleEnroll}>Enroll</Button>
      </div>
  </div>;
};

export default Navbar;
