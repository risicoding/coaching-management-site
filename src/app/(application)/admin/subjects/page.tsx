"use client";

import React from "react";
import { Plus, School } from "lucide-react";
import { InforBarDialog } from "../../_components/info-bar-dialog";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const Page = () => {
  return (
    <div className="space-y-4">
      <SubjectsInfoBar/>
    </div>
  );
};

const SubjectsInfoBar = () => {
  return (
    <InforBarDialog header="Classes" Icon={School}>
      <Dialog>
        <DialogTrigger>
          <Button>
            Add Class <Plus />
          </Button>
        </DialogTrigger>
        <DialogContent className="w-3/4">
        </DialogContent>
      </Dialog>
    </InforBarDialog>
  );
};

export default Page;
