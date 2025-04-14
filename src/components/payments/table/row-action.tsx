import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDeletePaymentById } from "@/hooks/payments";
import { Ellipsis, Save, Trash2 } from "lucide-react";
import React from "react";

const RowAction = ({ id }: { id: string }) => {

  const { mutate } =useDeletePaymentById() 

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">
            <Ellipsis />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={() => mutate(id)}>
            <Trash2 />
            Delete
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Save />
            Generate invoice
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default RowAction;
