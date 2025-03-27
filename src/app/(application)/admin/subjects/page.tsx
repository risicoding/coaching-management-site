"use client";

import { AddSubjectsDialog } from "./_components/add-subjects";

import React from "react";
import { api } from "@/trpc/react";
import { SubjectCard } from "../../_components/subjects/subject-card";
import Link from "next/link";
import { InforBarDialog } from "../../_components/info-bar-dialog";
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
  const utils = api.useUtils();

  return (
    <div className="space-y-6">
      <InforBarDialog header="Subjects" Icon={Folder}>
        <AddSubjectsDialog>
          <Button>
            Add Subject
            <Plus />
          </Button>
        </AddSubjectsDialog>
      </InforBarDialog>
      <div className="grid sm:grid-cols-3 grid-cols-1 gap-4">
        {data?.map((itx) => (
          <Link key={itx.id} href={`/admin/subjects/${itx.id}`}>
            <SubjectCard
              name={itx.name}
              id={itx.id}
              time={itx.name}
              classNo={
                utils.classes.getAll
                  .getData()
                  ?.find((item) => item.id === itx.classId)?.classNumber ?? null
              }
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Page;
