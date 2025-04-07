import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import { FaUsers } from "react-icons/fa";
import { Checkbox } from "../ui/checkbox";

export type Role = "admin" | "student";

export type TRoleFilter = Role[] | undefined;

export type RoleFilterProps = {
  filter: TRoleFilter;
  setRoleFilter: (filter: TRoleFilter) => void;
};

const roles = ["admin", "student"] as Role[];

export const RoleFilter = ({ filter, setRoleFilter }: RoleFilterProps) => {
  if (filter)
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">
            Roles
            <FaUsers />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {roles.map((role) => (
            <DropdownMenuItem key={role}>
              <Button
                variant="ghost"
                className="p-0"
                onClick={() =>
                  filter.includes(role)
                    ? setRoleFilter(filter.filter((val) => val !== role))
                    : setRoleFilter([...filter, role])
                }
              >
                <Checkbox checked={filter.includes(role)} />
                {role}
              </Button>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    );
};
