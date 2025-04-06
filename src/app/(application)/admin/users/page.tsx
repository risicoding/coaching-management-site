import React from "react";
import { InfoBar } from "@/components/info-bar";
import { User } from "lucide-react";
import { api } from "@/trpc/react";
import { columns } from "@/components/users/columns";
import { DataTable } from "@/components/users/data-table";

const Page = () => {
  const { data } = api.users.getAll.useQuery();
  return (
    <div className="space-y-4">
      <InfoBar header="Users" Icon={User} />

      {data && <DataTable columns={columns} data={data} />}
    </div>
  );
};

export default Page;
