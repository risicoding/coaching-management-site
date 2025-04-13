import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { api } from "@/trpc/react";
import { Ellipsis, Save, Trash2 } from "lucide-react";
import React from "react";

const RowAction = ({ id }: { id: string }) => {
  const utils = api.useUtils();

  const { mutate } = api.payments.deleteById.useMutation({
    onMutate: async (mutData) => {
      void utils.payments.getAll.cancel();

      const data = utils.payments.getAll.getData();

      utils.payments.getAll.setData(undefined, (paymentData) =>
        paymentData?.filter((p) => p.id !== mutData),
      );
      return { data };
    },
    onSettled: () => utils.payments.getAll.invalidate(),
    onError: (error, variables, context) => {
      utils.payments.getAll.setData(undefined, context?.data);
      utils.payments.getAll.invalidate();
    },
  });

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
