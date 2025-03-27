"use client";

import React from "react";
import { api } from "@/trpc/react";
import { SubjectCard } from "../../_components/subjects/subject-card";

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
    <div className='space-y-6'>
      {data?.map((itx) => (
        <SubjectCard
          key={itx.id}
          name={itx.name}
          id={itx.id}
          time={itx.name}
          classNo={
            utils.classes.getAll
              .getData()
              ?.find((item) => item.id === itx.classId)?.classNumber ?? null
          }
        />
      ))}
    </div>
  );
};

export default Page;
