"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { api } from "@/trpc/react";
import { Ellipsis, Eye, Pencil, Trash } from "lucide-react";

export const ClassDropdown = ({ id }: { id: string }) => {
  const utils = api.useUtils();

  const { mutate: deleteMutation } = api.classes.delete.useMutation({
    onMutate: async () => {
      void utils.classes.getAll.cancel();
      const data = utils.classes.getAll.getData();

      utils.classes.getAll.setData(undefined, (classes) => {
        const filteredClasses = classes?.filter((itx) => itx.id !== id);
        return filteredClasses;
      });

      return { data };
    },

    onError: (_err, _id, context) => {
      utils.classes.getAll.setData(undefined, context?.data);
    },

    onSuccess: async () => utils.classes.getAll.invalidate(),
  });

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
