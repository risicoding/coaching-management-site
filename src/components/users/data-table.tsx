"use client";

import {
  type ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
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

import { Input } from "../ui/input";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";

import { useCallback, useState } from "react";
import { Button } from "../ui/button";
import { FaUsers } from "react-icons/fa";
import { IoIosOptions, IoIosSettings } from "react-icons/io";
import { Select, SelectContent, SelectItem, SelectValue } from "../ui/select";
import { SelectTrigger } from "@radix-ui/react-select";

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

  const [filterKey, setFilterKey] = useState("email");

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      columnFilters,
      rowSelection,
    },
  });

  console.log(table.getSelectedRowModel().rows);

  const getRoleFilter = useCallback(
    () => table.getColumn("role")?.getFilterValue() as RoleFilter,
    [table],
  );
  const setRoleFilter = useCallback(
    (value: RoleFilter) => table.getColumn("role")?.setFilterValue(value),
    [table],
  );

  return (
    <div className='w-full'>
      <div className="flex items-center justify-between gap-2 py-4">
        <div className="flex gap-6">
          <div className="flex gap-1">
              <Input
                placeholder={`Filter ${filterKey}...`}
                value={
                  (table.getColumn(filterKey)?.getFilterValue() as string) ?? ""
                }
                onChange={(e) =>
                  table.getColumn(filterKey)?.setFilterValue(e.target.value)
                }
                className="w-44"
              />
            <Select value={filterKey} onValueChange={setFilterKey}>
              <SelectTrigger>
                <Button variant="outline">
                  <IoIosOptions />
                </Button>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Name</SelectItem>
                <SelectItem value="email">Email</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger>
              <Button variant="outline">
                Roles
                <FaUsers />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuCheckboxItem
                onSelect={(e) => e.preventDefault()}
                className="capitalize"
                checked={getRoleFilter() === "admin" || !getRoleFilter()}
                onCheckedChange={(checked) => {
                  const filter = getRoleFilter();

                  if (checked) {
                    if (filter === "none") return setRoleFilter("admin");
                    return setRoleFilter(undefined);
                  }

                  if (filter === undefined) return setRoleFilter("student");
                  return setRoleFilter("none");
                }}
              >
                Admin
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                onSelect={(e) => e.preventDefault()}
                className="capitalize"
                checked={getRoleFilter() === "student" || !getRoleFilter()}
                onCheckedChange={(checked) => {
                  const filter = getRoleFilter();

                  if (checked) {
                    if (filter === "none") return setRoleFilter("student");
                    return setRoleFilter(undefined);
                  }

                  if (filter === undefined) return setRoleFilter("admin");
                  return setRoleFilter("none");
                }}
              >
                Student
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
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
    </div>
  );
}
