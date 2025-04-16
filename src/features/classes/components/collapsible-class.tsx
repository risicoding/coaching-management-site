"use client";

import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ClassDropdown } from "./class-dropdown";
import { AddSubjectsDialog } from "@/features/subjects/components/add-subjects";
import { Button } from "@/components/ui/button";
import { CirclePlus } from "lucide-react";

interface CollapsibleClassProps {
  id?: string;
  classNo?: number;
  children: React.ReactNode;
}

export const CollapsibleClass: React.FC<CollapsibleClassProps> = ({
  id,
  classNo,
  children,
}) => {
  return (
    <Accordion type="single" collapsible className="w-full rounded-md border">
      <AccordionItem value={`class-${classNo}`}>
        <AccordionTrigger className="group p-4 text-left">
          {classNo ? `Class ${classNo}` : "Other"}
          <div className="ml-auto mr-4 text-neutral-500">
            <AddSubjectsDialog classId={id}>
              <Button variant="ghost">
                <CirclePlus />
              </Button>
            </AddSubjectsDialog>

            {id && id !== "other" && <ClassDropdown id={id} />}
          </div>
        </AccordionTrigger>
        <AccordionContent className="space-y-4 p-4">
          {children}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
