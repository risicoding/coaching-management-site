"use client";
import { JoinCard } from "../(application)/dashboard/subjects/_components/join-card";
import { api } from "@/trpc/react";
import { Loader } from "lucide-react";

const Page = () => {
  const subjectId = "02bdea5d-fea1-491c-94c4-50e074691a0f";

  const { data: subjects } = api.subjects.getAll.useQuery();

  const { data, isLoading } = api.subjects.getById.useQuery(subjectId);
  console.log(data);

  return (
    <div className="flex flex-col min-h-screen items-center justify-center">
      {subjects?.map((sub) => (
        <JoinCard
          key={sub.id}
          subjectId={sub.id}
          name={sub.name}
          pricing={sub.pricing}
          days={sub.days}
        />
      ))}
    </div>
  );
};

export default Page;
