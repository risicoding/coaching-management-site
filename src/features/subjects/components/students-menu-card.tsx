import React from "react";
import { DataTable } from "./table/data-table";
import { useParams } from "next/navigation";
import { columns } from "./table/columns";
import { useUsersBySubjectId } from "@/features/users/hooks";

const StudentsMenuCard = () => {
  const { subjectId } = useParams<{ subjectId: string }>();
  const { data } = useUsersBySubjectId(subjectId);

  if (!data) return;

  return <DataTable columns={columns} data={data} />;
};

export default StudentsMenuCard;
