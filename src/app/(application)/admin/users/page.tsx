"use client";
import React from "react";
import { InfoBar } from "@/components/info-bar";
import { User } from "lucide-react";
import { columns } from "@/components/users/columns";
import { DataTable } from "@/components/users/data-table";
import { useAllUsers } from "@/hooks/user";

const Page = () => {
  const { data } = useAllUsers();

  return (
    <div className="space-y-4">
      <InfoBar header="Users" Icon={User} />

      {data && <DataTable columns={columns} data={data} />}
    </div>
  );
};

export default Page;
