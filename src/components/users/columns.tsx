import type { ColumnDef } from "@tanstack/react-table";
import { User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { RowAction } from "./row-action";
import { FaUser, FaUserShield } from "react-icons/fa6";
import { Checkbox } from "../ui/checkbox";
import type { Role, TRoleFilter } from "./role-filter";
import type { ServerInferResponses } from "@ts-rest/core";
import type { userContract } from "@/server/api/contracts/user";

export type ResponseShapes = ServerInferResponses<
  typeof userContract
>["getAll"];

type InferSuccess<T> = T extends { status: 200 } ? T : never;

export type User = InferSuccess<ResponseShapes>["body"][0];

export const columns: ColumnDef<User>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "image",
    header: () => (
      <div className="ml-2">
        <User className="size-4" />
      </div>
    ),

    cell: ({ row }) =>
      row.getValue("image") ? (
        <img
          src={row.getValue("image")}
          alt={`user-image`}
          className="ml-2 size-6 overflow-clip rounded-full"
        />
      ) : (
        <User className="ml-2 size-4" />
      ),
  },
  { accessorKey: "name", header: "Name" },
  { accessorKey: "email", header: "Email" },
  {
    accessorKey: "role",
    header: "Role",
    filterFn: (row, columnId, filterValue: TRoleFilter) =>
      filterValue?.includes(row.original.role as Role) ?? false,

    cell: ({ row }) => (
      <Badge className={cn("capitalize")}>
        {row.getValue("role")}
        {row.getValue("role") === "admin" ? (
          <FaUserShield className="ml-2" />
        ) : (
          <FaUser className="ml-2" />
        )}
      </Badge>
    ),
  },
  {
    accessorKey: "actions",
    cell: ({ row }) => {
      return <RowAction id={row.original.id} />;
    },
    header: undefined,
  },
];
