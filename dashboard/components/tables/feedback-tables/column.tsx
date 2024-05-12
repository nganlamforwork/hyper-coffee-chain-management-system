"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
import { Feedback } from "@/types/product";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { User } from "@/types/user";

export const columns: ColumnDef<Feedback>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
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
    accessorKey: "rating",
    header: "RATING",
    cell: ({ renderValue, ...props }) => {
      const value = renderValue() as number;
      return <span>{value}⭐</span>;
    },
  },
  {
    accessorKey: "customer",
    header: "CUSTOMER",
    cell: ({ renderValue, ...props }) => {
      const user = renderValue() as any;
      return <span>{user.name}</span>;
    },
  },
  {
    accessorKey: "orderId",
    header: "ORDER",
  },
  {
    accessorKey: "message",
    header: "REVIEW",
  },
  {
    accessorKey: "createdAt",
    header: "DATE",
    cell: ({ renderValue, ...props }) => {
      const value = renderValue() as string;
      const formattedDate = format(new Date(value), "MMMM d, yyyy - HH:mm:ss");
      return <span>{formattedDate}</span>;
    },
  },
  {
    accessorKey: "status",
    header: "STATUS",
    cell: ({ renderValue, ...props }) => {
      const value = renderValue() as boolean;
      return value ? (
        <Badge variant="staff">Replied</Badge>
      ) : (
        <Badge variant="admin">Pending</Badge>
      );
    },
  },
  {
    id: "actions",
    header: "ACTIONS",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
