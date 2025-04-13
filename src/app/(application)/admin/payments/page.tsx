"use client";

import { InfoBar } from "@/components/info-bar";
import { Wallet } from "lucide-react";
import { CreatePayments } from "@/components/payments/form/create-payments";
import { DataTable } from "@/components/payments/table/data-table";
import { columns } from "@/components/payments/table/columns";
import { api } from "@/trpc/react";

const Page = () => {
  const { data } = api.payments.getAll.useQuery();

  return (
    <div className="space-y-6">
      <InfoBar header="Payments" Icon={Wallet}>
        <CreatePayments />
      </InfoBar>
      {data && <DataTable columns={columns} data={data} />}
    </div>
  );
};

export default Page;
