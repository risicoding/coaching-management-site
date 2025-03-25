"use client";

import React from "react";
import { Plus, School } from "lucide-react";
import { InforBarDialog } from "../../_components/info-bar-dialog";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import AddClassForm from "./_components/class/add-class";
import CollapsibleClass from "./_components/class/collapsible-class";
import { SubjectCard } from "../../_components/subjects/subject-card";

const Page = () => {
  return (
    <div className="space-y-4">
      <ClassInfoBar />
      <CollapsibleClass classNo={12}>
        <SubjectCard name="Chemistry" id="21" time="12:00" classNo={12} />
      </CollapsibleClass>
    </div>
  );
};

const ClassInfoBar = () => {
  return (
    <InforBarDialog header="Classes" Icon={School}>
      <Dialog>
        <DialogTrigger>
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
