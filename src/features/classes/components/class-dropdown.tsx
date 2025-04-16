"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Ellipsis, Eye, Pencil, Trash } from "lucide-react";
import { useDeleteClass } from "../hooks";

export const ClassDropdown = ({ id }: { id: string }) => {
  const { mutate: deleteMutation } = useDeleteClass();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="rounded-md p-2 transition hover:bg-muted">
          <Ellipsis className="h-5 w-5" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40">
        <DropdownMenuItem>
          <Eye className="mr-2 h-4 w-4" /> Open
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Pencil className="mr-2 h-4 w-4" /> Edit
        </DropdownMenuItem>
        <DropdownMenuItem
          className="text-red-500 hover:bg-red-100 dark:hover:bg-red-900"
          onClick={() => deleteMutation(id)}
        >
          <Trash className="mr-2 h-4 w-4" /> Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
