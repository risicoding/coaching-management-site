"use client";

import React from "react";
import { Plus, School } from "lucide-react";
import { InfoBar } from "@/components/info-bar";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AddClassForm } from "@/features/classes/components/add-class";
import { CollapsibleClass } from "@/features/classes/components/collapsible-class";
import { SubjectCard } from "@/components/subjects/subject-card";
import Link from "next/link";
import { CollapsibleCardHeaderSkeleton } from "@/components/skeleton/collapsible-class-skeleton";
import { useQuery } from "@tanstack/react-query";
import { getAllClasses } from "@/features/classes/data/options";
import { getAllSubject } from "@/features/subjects/data/options";

const Page = () => {
  const { data: classesData, isLoading } = useQuery(getAllClasses);
  const { data: subjectsData } = useQuery(getAllSubject);

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
