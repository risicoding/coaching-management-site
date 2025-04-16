import type { ColumnDef } from "@tanstack/react-table";
import { User } from "lucide-react";
import { User as UserType } from "@/features/users/api/types";

export const columns: ColumnDef<UserType>[] = [
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
];
