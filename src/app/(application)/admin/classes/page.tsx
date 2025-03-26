"use client";

import React from "react";
import { Plus, School } from "lucide-react";
import { InforBarDialog } from "../../_components/info-bar-dialog";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import AddClassForm from "./_components/class/add-class";
import CollapsibleClass from "./_components/class/collapsible-class";
import { SubjectCard } from "../../_components/subjects/subject-card";
import { api } from "@/trpc/react";

const Page = () => {
  const { data: classesData } = api.classes.getAll.useQuery();
  const { data: subjectsData } = api.subjects.getAll.useQuery();

  return (
    <div className="space-y-4">
      <ClassInfoBar />
      {classesData?.map((classItem) => (
        <CollapsibleClass
          key={classItem.id}
          id={classItem.id}
          classNo={classItem.classNumber}
        >
          {subjectsData
            ?.filter((itx) => itx.classId === classItem.id)
            .map((subjectItem) => (
              <SubjectCard
                key={subjectItem.id}
                name={subjectItem.name}
                id={subjectItem.id}
                time={subjectItem.createdAt.getTime().toLocaleString()}
                classNo={classItem.classNumber}
              />
            ))}
        </CollapsibleClass>
      ))}
    </div>
  );
};

const ClassInfoBar = () => {
  return (
    <InforBarDialog header="Classes" Icon={School}>
      <Dialog>
        <DialogTrigger asChild>
          <Button>
            Add Class <Plus />
          </Button>
        </DialogTrigger>
        <DialogContent className="w-3/4">
          <AddClassForm />
        </DialogContent>
      </Dialog>
    </InforBarDialog>
  );
};

export default Page;
