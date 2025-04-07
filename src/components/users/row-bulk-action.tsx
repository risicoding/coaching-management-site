import { FaTrash, FaUserShield } from "react-icons/fa";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { api } from "@/trpc/react";
import { BsThreeDots } from "react-icons/bs";

export const RowBulkAction = ({
  ids,
  reset,
}: {
  ids: string[];
  reset: () => void;
}) => {
  const utils = api.useUtils();

  const { mutate: deleteUsers } = api.users.delete.useMutation({
    onSettled: () => utils.users.getAll.invalidate(),
    onMutate: async (ids) => {
      void utils.users.getAll.cancel();

      const data = utils.users.getAll.getData();
      console.log(data);

      utils.users.getAll.setData(undefined, (users) =>
        users?.filter((user) => !ids.includes(user.id)),
      );

      reset();

      return { data };
    },
    onError: (error, variables, context) => {
      utils.users.getAll.setData(undefined, context?.data);
    },
  });

  const { mutate: setRole } = api.users.setRole.useMutation({
    onMutate: async ({ ids, role }) => {
      void utils.users.getAll.cancel();

      const data = utils.users.getAll.getData();

      utils.users.getAll.setData(undefined, (users) =>
        users?.map((user) =>
          ids.includes(user.id) ? { ...user, role } : user,
        ),
      );

      reset()

      return { data };

    },

    onError: (error, variable, context) => {
      utils.users.getAll.setData(undefined, context?.data);
    },

    onSettled: () => {
      void utils.users.getAll.invalidate();
      reset();
    },
  });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button variant="outline">
          <BsThreeDots />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={() => deleteUsers(ids)}>
          <FaTrash />
          Delete
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setRole({ ids, role: "admin" })}>
          <FaUserShield />
          Promote to admin
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
