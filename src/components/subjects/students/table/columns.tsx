import type { ColumnDef } from "@tanstack/react-table";
import { User } from "lucide-react";
import  type{ServerInferResponses} from '@ts-rest/core'
import type{ InferSuccess } from "@/lib/inferSuccess";
import type { userContract } from "@/server/api/contracts/user";

export type User = InferSuccess<ServerInferResponses<typeof userContract>['getBySubjectId']>['body'][0]

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
