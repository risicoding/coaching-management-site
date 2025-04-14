import type { ColumnDef } from "@tanstack/react-table";
import { Book, ChevronDown, User } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import RowAction from "./row-action";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

export type Payment = inferRouterOutputs<AppRouter>["payments"]["getAll"][0];

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
    accessorKey: "subjects",
    header: "Subjects",

    cell: ({ row }) => (
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="flex h-7 items-center gap-1.5 px-2 text-muted-foreground hover:text-foreground"
          >
            <Book className="h-3.5 w-3.5" />
            <Badge variant="outline" className="h-5 px-1.5 py-0">
              {row.original.subjects.length}
            </Badge>
            <ChevronDown className="ml-0.5 h-3.5 w-3.5" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80 p-0" align="start">
          <div className="max-h-80 overflow-auto p-2">
            {row.original.subjects.map(
              (subject) =>
                subject && (
                  <Card key={subject.id} className="mb-2 overflow-hidden">
                    <CardContent className="flex items-center justify-between p-3">
                      <div className="font-medium">{subject.name}</div>
                      <div className="text-sm font-semibold text-primary">
                        {new Intl.NumberFormat("en-In", {
                          style: "currency",
                          currency: "INR",
                        }).format(subject.pricing)}
                      </div>
                    </CardContent>
                  </Card>
                ),
            )}
          </div>
        </PopoverContent>
      </Popover>
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
        {row.original.createdAt.toLocaleDateString("en-US", {
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
