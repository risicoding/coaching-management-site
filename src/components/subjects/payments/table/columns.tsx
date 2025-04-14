import type { ColumnDef } from "@tanstack/react-table";
import { User } from "lucide-react";
import RowAction from "@/components/payments/table/row-action";
import type{ServerInferResponses} from '@ts-rest/core'
import type{paymentsContract} from '@/server/api/contracts/payments'


export type ResponseShapes = ServerInferResponses<typeof paymentsContract>['getPaymentsBySubjectId']

type InferSuccess<T>=T extends {status:200}?T:never

export type Payment =InferSuccess<ResponseShapes>['body'][0]

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "user.name",
    header: "Name",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        {row.original.user.image ? (
          <img
            className="size-4 overflow-clip rounded-full"
            src={row.original.user.image}
            alt={`user-avatar-${row.original.user.name}`}
          />
        ) : (
          <User />
        )}
        <span className="capitalize">{row.original.user.name}</span>
      </div>
    ),
  },

  {
    accessorKey: "month",
    header: "Month",
    cell: ({ row }) => (
      <span>
        {new Date(row.original.month).toLocaleDateString("default", {
          month: "long",
        })}
      </span>
    ),
  },

  {
    accessorKey: "createdAt",
    header: "Payment Date",
    cell: ({ row }) => (
      <span>
        {row.original.createdAt?.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "2-digit",
        })}
      </span>
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
