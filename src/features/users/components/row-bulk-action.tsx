import { FaTrash, FaUserShield } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BsThreeDots } from "react-icons/bs";
import { useDeleteUsers, useSetRole } from "../hooks";

export const RowBulkAction = ({
  ids,
  reset,
}: {
  ids: string[];
  reset: () => void;
}) => {
  const { mutate: deleteUsers } = useDeleteUsers();
  const { mutate: setRole } = useSetRole();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button variant="outline">
          <BsThreeDots />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem
          onClick={() => deleteUsers({ ids }, { onSuccess: () => reset() })}
        >
          <FaTrash />
          Delete
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() =>
            setRole({ ids, role: "admin" }, { onSuccess: () => reset() })
          }
        >
          <FaUserShield />
          Promote to admin
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
