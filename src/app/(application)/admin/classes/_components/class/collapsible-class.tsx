"use client"

import React from "react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

interface CollapsibleClassProps {
  classNo: number
  children: React.ReactNode
}

const CollapsibleClass: React.FC<CollapsibleClassProps> = ({ classNo, children }) => {
  return (
    <Accordion type="single"  collapsible className="w-full border rounded-md">
      <AccordionItem value={`class-${classNo}`}>
        <AccordionTrigger className="p-4 text-left">
          Class {classNo}
        </AccordionTrigger>
        <AccordionContent className="p-4 space-y-2">{children}</AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}

export default CollapsibleClass

