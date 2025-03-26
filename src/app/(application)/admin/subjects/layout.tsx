import React from "react";
import { InforBarDialog } from "../../_components/info-bar-dialog";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
} from "@/components/ui/dialog";

import { Folder, Plus, School } from "lucide-react";
import { Button } from "@/components/ui/button";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <InforBarDialog header="Subjects" Icon={Folder}>
        <Dialog>
          <DialogTrigger>
            <Button>
              Add subject <Plus />
            </Button>
          </DialogTrigger>
          <DialogContent className="w-3/4"></DialogContent>
        </Dialog>
      </InforBarDialog>

      <div>{children}</div>
    </div>
  );
};

export default Layout;
