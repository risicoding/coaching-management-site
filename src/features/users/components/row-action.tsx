import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import { FaUserShield, FaTrash, FaMoneyBill } from "react-icons/fa";
import { BsThreeDots } from "react-icons/bs";
import { useDeleteUsers, useSetRole } from "../hooks";

export const RowAction = ({ id }: { id: string }) => {
  const { mutate: deleteUsers } = useDeleteUsers();
  const { mutate: setRole } = useSetRole();

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
        <DropdownMenuItem onClick={() => deleteUsers({ ids: [id] })}>
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
