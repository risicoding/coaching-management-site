import { inferRouterOutputs } from "@trpc/server";
import type { AppRouter } from "@/server/api/root";
import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import {User} from 'lucide-react'

export type Payment = inferRouterOutputs<AppRouter>["payments"]["getAll"][0];

export const columns: ColumnDef<Payment>[] = [
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
  {accessorKey:'user.name',header:'Name',
    cell:({row})=>(
    <div>
        {row.original.user.image?(
        <img className='size-4 rounded-full overflow-clip' src={row.original.user.image} alt={`user-avatar-${row.original.user.name}`} />
        ):<User/>}
      </div>
    )
  },
{accessorKey:''}

];
