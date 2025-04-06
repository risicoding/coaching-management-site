import { inferRouterOutputs } from "@trpc/server";
import type { AppRouter } from "@/server/api/root";
import { ColumnDef } from "@tanstack/react-table";
import { User } from "lucide-react";

type UserRouterOutput =
  inferRouterOutputs<AppRouter>["users"]["getUsersBySubjectId"];

export type User = NonNullable<UserRouterOutput>[0];

export const columns: ColumnDef<User>[] = [
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
