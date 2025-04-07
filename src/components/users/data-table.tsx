"use client";

import {
  type ColumnDef,
  type ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";

import { RoleFilter, type TRoleFilter } from "./role-filter";
import { InputFilter, type TInputFilter } from "./input-filter";
import { Button } from "../ui/button";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { RowBulkAction } from "./row-bulk-action";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export type RoleFilter = "admin" | "student" | "none" | undefined;

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [rowSelection, setRowSelection] = useState({});
  const [filterKey, setFilterKey] = useState<TInputFilter>("email");

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: setRowSelection,
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      columnFilters,
      rowSelection,
    },
  });

  useEffect(
    () =>
      table
        .getColumn("role")
        ?.setFilterValue(["admin", "student"] as TRoleFilter),
    [],
  );

  return (
    <div className="w-full">
      <div className="flex items-center justify-between gap-2 py-4">
        <div className="flex gap-2">
          <InputFilter
            filterKey={filterKey}
            setFilterKey={setFilterKey}
            filterValue={table.getColumn(filterKey)?.getFilterValue() as string}
            setFilterValue={(value) =>
              table.getColumn(filterKey)?.setFilterValue(value)
            }
          />

          <RoleFilter
            filter={table.getColumn("role")?.getFilterValue() as TRoleFilter}
            setRoleFilter={(value) =>
              table.getColumn("role")?.setFilterValue(value)
            }
          />
        </div>
        {table.getSelectedRowModel().rows.length > 0 && (
          <div className="flex gap-2">
            <RowBulkAction
              reset={table.resetRowSelection}
              ids={table
                .getSelectedRowModel()
                .rows.map((row) => (row.original as { id: string }).id)}
            />
          </div>
        )}
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-between p-4">
        <div className="ml-auto flex gap-6">
          <Select
            value={`${table.getState().pagination.pageSize}`}
            onValueChange={(value) => table.setPageSize(Number(value))}
          >
            <SelectTrigger>
              <SelectValue placeholder="No of rows" />
            </SelectTrigger>
            <SelectContent>
              {Array.from({ length: 5 }).map((_, i) => (
                <SelectItem key={i} value={`${(i + 1) * 10}`}>
                  {(i + 1) * 10}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <FaChevronLeft />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              <FaChevronRight />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
