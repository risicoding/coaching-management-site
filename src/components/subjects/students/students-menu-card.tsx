import { Card, CardContent } from "@/components/ui/card";
import React from "react";
import { DataTable } from "./table/data-table";
import { api } from "@/trpc/react";
import { useParams } from "next/navigation";
import { columns } from "./table/columns";

const StudentsMenuCard = () => {
  const { subjectId } = useParams<{ subjectId: string }>();
  const { data } = api.users.getUsersBySubjectId.useQuery(subjectId);

  if (!data) return;

  return <DataTable columns={columns} data={data} />;
};

export default StudentsMenuCard;
