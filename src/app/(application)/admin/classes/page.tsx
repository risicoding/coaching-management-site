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
import Link from "next/link";
import { CollapsibleCardHeaderSkeleton } from "@/components/skeleton/collapsible-class-skeleton";

const Page = () => {
  const { data: classesData, isLoading } = api.classes.getAll.useQuery();
  const { data: subjectsData } = api.subjects.getAll.useQuery();

  return (
    <div className="space-y-4">
      <ClassInfoBar />
      {!isLoading ? (
        classesData?.map((classItem) => (
          <CollapsibleClass
            key={classItem.id}
            id={classItem.id}
            classNo={classItem.classNumber}
          >
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              {subjectsData
                ?.filter((itx) => itx.classId === classItem.id)
                .map((subjectItem) => (
                  <Link
                    href={`/admin/subjects/${subjectItem.id}`}
                    key={subjectItem.id}
                  >
                    <SubjectCard
                      key={subjectItem.id}
                      name={subjectItem.name}
                      id={subjectItem.id}
                      time={subjectItem.time}
                      classNo={classItem.classNumber}
                    />
                  </Link>
                ))}
            </div>
          </CollapsibleClass>
        ))
      ) : (
        <>
          <CollapsibleCardHeaderSkeleton />
          <CollapsibleCardHeaderSkeleton />
          <CollapsibleCardHeaderSkeleton />
          <CollapsibleCardHeaderSkeleton />
        </>
      )}
      {!isLoading && (
        <CollapsibleClass key="other" id="other">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {subjectsData
              ?.filter((itx) => itx.classId === null)
              .map((itx) => (
                <SubjectCard
                  key={itx.id}
                  name={itx.name}
                  id={itx.id}
                  time={itx.time}
                />
              ))}
          </div>
        </CollapsibleClass>
      )}
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
