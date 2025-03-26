import React from "react";
import { InforBarDialog } from "../../_components/info-bar-dialog";

import { Folder, Plus, School } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AddSubjectsDialog } from "./_components/add-subjects";

const Layout = ({ children }: { children: React.ReactNode }) => {
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

      <div>{children}</div>
    </div>
  );
};

export default Layout;
