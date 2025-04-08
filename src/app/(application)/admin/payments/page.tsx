"use client";

import { InfoBar } from "@/components/info-bar";
import { Wallet } from "lucide-react";
import { CreatePayments } from "@/components/payments/form/create-payments";

const Page = () => {
  return (
    <div>
      <InfoBar header="Payments" Icon={Wallet}>
        <CreatePayments />
      </InfoBar>
    </div>
  );
};

export default Page;
