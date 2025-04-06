import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import { FaUserShield, FaTrash, FaMoneyBill } from "react-icons/fa";
import { api } from "@/trpc/react";
import { BsThreeDots } from "react-icons/bs";

export const RowAction = ({ id }: { id: string }) => {
  const utils = api.useUtils();
  const { mutate: deleteUsers } = api.users.delete.useMutation({
    onMutate: async (ids: string[]) => {
      void utils.users.getAll.cancel();

      const data = utils.users.getAll.getData();

      utils.users.getAll.setData(undefined, (users) =>
        users?.filter((user) => !ids.includes(user.id)),
      );

      return { data };
    },

    onError: (error, variable, context) => {
      utils.users.getAll.setData(undefined, context?.data);
    },

    onSettled: () => utils.users.getAll.invalidate(),
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

      return { data };
    },

    onError: (error, variable, context) =>
      utils.users.getAll.setData(undefined, context?.data),
    onSettled: () => utils.users.getAll.invalidate(),
  });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost">
          <BsThreeDots />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>
          <FaArrowUpRightFromSquare />
          View Courses
        </DropdownMenuItem>
        <DropdownMenuItem>
          <FaMoneyBill />
          Payments
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => deleteUsers([id])}>
          <FaTrash />
          Delete
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setRole({ ids: [id], role: "admin" })}>
          <FaUserShield />
          Promote to admin
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
