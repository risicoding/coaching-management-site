"use client";

import { AddSubjectsDialog } from "@/features/subjects/components/add-subjects";
import React from "react";
import { SubjectCard } from "@/components/subjects/subject-card";
import Link from "next/link";
import { InfoBar } from "@/components/info-bar";
import { Button } from "@/components/ui/button";
import { Folder, Plus } from "lucide-react";
import { SubjectCardSkeleton } from "@/components/skeleton/subject-card-skeleton";
import { useAllSubjects } from "@/features/subjects/hooks";
import { useAllClasses } from "@/features/classes/hooks";

const Page = () => {
  const { data, isLoading } = useAllSubjects();
  const { data: classes } = useAllClasses();
  return (
    <div className="space-y-6">
      <InfoBar header="Subjects" Icon={Folder}>
        <AddSubjectsDialog>
          <Button>
            Add Subject
            <Plus />
          </Button>
        </AddSubjectsDialog>
      </InfoBar>
      {!isLoading ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {data?.map((itx) => (
            <Link key={itx.id} href={`/admin/subjects/${itx.id}`}>
              <SubjectCard
                name={itx.name}
                id={itx.id}
                time={itx.time}
                classNo={
                  classes?.find((item) => item.id === itx.classId)
                    ?.classNumber ?? null
                }
              />
            </Link>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <SubjectCardSkeleton />
          <SubjectCardSkeleton />
          <SubjectCardSkeleton />
          <SubjectCardSkeleton />
        </div>
      )}
    </div>
  );
};

export default Page;
