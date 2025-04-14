import React from "react";
import { DataTable } from "./table/data-table";
import { useParams } from "next/navigation";
import { columns } from "./table/columns";
import { useUserBySubjectId } from "@/hooks/user";

const StudentsMenuCard = () => {
  const { subjectId } = useParams<{ subjectId: string }>();
  const { data } = useUserBySubjectId(subjectId)

  if (!data) return;

  return <DataTable columns={columns} data={data} />;
};

export default StudentsMenuCard;
