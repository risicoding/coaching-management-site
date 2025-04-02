"use client";

import React from "react";
import { Plus, School } from "lucide-react";
import { InfoBar } from "@/components/info-bar";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AddClassForm } from "@/components/class/add-class";
import { CollapsibleClass } from "@/components/class/collapsible-class";
import { SubjectCard } from "@/components/subjects/subject-card";
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
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {subjectsData
              ?.filter((itx) => itx.classId === classItem.id)
              .map((subjectItem) => (
                <SubjectCard
                  key={subjectItem.id}
                  name={subjectItem.name}
                  id={subjectItem.id}
                  time={subjectItem.time}
                  classNo={classItem.classNumber}
                />
              ))}
          </div>
        </CollapsibleClass>
      ))}
    </div>
  );
};

const ClassInfoBar = () => {
  return (
    <InfoBar header="Classes" Icon={School}>
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
    </InfoBar>
  );
};

export default Page;
