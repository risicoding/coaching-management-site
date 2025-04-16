"use client";
import React from "react";
import { InfoBar } from "@/components/info-bar";
import { User } from "lucide-react";
import { DataTable } from "@/features/users/components/data-table";
import { columns } from "@/features/users/components/columns";
import { useAllUsers } from "@/features/users/hooks";

const Page = () => {
  const { data } = useAllUsers();

  return (
    <div className="space-y-4">
      <InfoBar header="Users" Icon={User} />
      {/**/}
      {data && <DataTable columns={columns} data={data} />}
    </div>
  );
};

export default Page;
