"use client";

import { SubjectCard } from "@/app/(application)/_components/subjects/subject-card";
import { api } from "@/trpc/react";
import { Loader } from "lucide-react";
import { useParams } from "next/navigation";

const Page = () => {
  const { subjectId } = useParams<{ subjectId: string }>();

  const { data, isLoading } =
    api.subjects.getEnrolledSubject.useQuery(subjectId);

  return (
    <div>
      {data && !isLoading ? (
        <SubjectCard name={data.name} classNo={12} time="12:00" id={data.id} />
      ) : (
        <Loader className="animate-spin" />
      )}
    </div>
  );
};

export default Page;
