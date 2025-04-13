import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useParams } from "next/navigation";
import { api } from "@/trpc/react";
import { DataTable } from "@/components/payments/table/data-table";
import { columns } from "./table/columns";

const PaymentMenuCard = () => {
  const { subjectId } = useParams<{ subjectId: string }>();
  const { data } = api.payments.getBySubjectId.useQuery(subjectId);

  return (
    <Card className="py-6">
      <CardContent>
        {data && <DataTable columns={columns} data={data} />}
      </CardContent>
    </Card>
  );
};

export default PaymentMenuCard;
