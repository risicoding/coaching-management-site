"use client";

import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Ellipsis } from "lucide-react";
import { ClassDropdown } from "./class-dropdown";

interface CollapsibleClassProps {
  id: string;
  classNo: number;
  children: React.ReactNode;
}

const CollapsibleClass: React.FC<CollapsibleClassProps> = ({
  id,
  classNo,
  children,
}) => {
  return (
    <Accordion type="single" collapsible className="w-full rounded-md border">
      <AccordionItem value={`class-${classNo}`}>
        <AccordionTrigger className="group p-4 text-left">
          Class {classNo}
          <div className="ml-auto mr-4 text-neutral-500">
            <ClassDropdown id={id} />
          </div>
        </AccordionTrigger>
        <AccordionContent className="space-y-4 p-4">
          {children}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default CollapsibleClass;
