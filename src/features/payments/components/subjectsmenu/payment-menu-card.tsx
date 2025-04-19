import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { useParams } from "next/navigation";
import { DataTable } from "@/components/payments/table/data-table";
import { columns } from "./table/columns";
import { usePaymentBySubjectId } from "../../hooks";

export const PaymentMenuCard = () => {
  const { subjectId } = useParams<{ subjectId: string }>();
  const { data } = usePaymentBySubjectId(subjectId);

  return (
    <Card className="py-6">
      <CardContent>
        {data && <DataTable columns={columns} data={data} />}
      </CardContent>
    </Card>
  );
};
