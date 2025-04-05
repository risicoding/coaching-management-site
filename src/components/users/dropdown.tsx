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
import { BsThreeDots } from "react-icons/bs";

export const UserDropdown = ({ id }: { id: string }) => {
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
        <DropdownMenuItem>
          <FaTrash />
          Delete
        </DropdownMenuItem>
        <DropdownMenuItem>
          <FaUserShield />
          Promote to admin
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
