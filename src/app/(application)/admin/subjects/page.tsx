"use client";

import { AddSubjectsDialog } from "@/components/subjects/add-subjects";
import React from "react";
import { api } from "@/trpc/react";
import { SubjectCard } from "@/components/subjects/subject-card";
import Link from "next/link";
import { InfoBar } from "@/components/info-bar";
import { Button } from "@/components/ui/button";
import { Folder, Plus } from "lucide-react";

const Page = () => {
  return (
    <div className="space-y-4">
      <SubjectsInfoBar />
    </div>
  );
};

const SubjectsInfoBar = () => {
  const { data } = api.subjects.getAll.useQuery();
  const { data: classes } = api.classes.getAll.useQuery();

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
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {data?.map((itx) => (
          <Link key={itx.id} href={`/admin/subjects/${itx.id}`}>
            <SubjectCard
              name={itx.name}
              id={itx.id}
              time={itx.time}
              classNo={
                classes?.find((item) => item.id === itx.classId)?.classNumber ??
                null
              }
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Page;
