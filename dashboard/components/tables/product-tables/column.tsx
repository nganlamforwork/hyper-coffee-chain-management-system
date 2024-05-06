"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
import { Product, Promotion } from "@/types/product";
import Image from "next/image";
import { format } from "date-fns";

export const columns: ColumnDef<Product>[] = [
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
    accessorKey: "imageUrl",
    header: "IMAGE",
    cell: ({ renderValue, ...props }) => {
      const value = renderValue() as string;
      return (
        <Image
          src={value}
          alt="productImage"
          width={80}
          height={80}
          className="rounded-lg"
        />
      );
    },
  },
  {
    accessorKey: "name",
    header: "NAME",
  },
  {
    accessorKey: "category",
    header: "CATEGORY",
  },
  {
    accessorKey: "description",
    header: "DESCRIPTION",
    cell: ({ renderValue, ...props }) => {
      const value = renderValue() as string;
      return <p className="max-w-md">{value}</p>;
    },
  },
  {
    accessorKey: "price",
    header: "PRICE",
    cell: ({ renderValue, ...props }) => {
      const value = renderValue() as number;
      return <p>${value.toFixed(2)}</p>;
    },
  },
  {
    accessorKey: "promotion",
    header: "PROMOTION",
    cell: ({ renderValue, ...props }) => {
      const promotion = renderValue() as Promotion;
      return promotion ? (
        <div className="bg-gray-100 p-4 rounded-md shadow-md">
          <div className="flex flex-col gap-2">
            <p>
              <strong>Name:</strong> {promotion.name}
            </p>
            <p>
              <strong>Description:</strong> {promotion.description}
            </p>
            <p>
              <strong>Start Date:</strong>{" "}
              {format(
                new Date(promotion.startDate!),
                "MMMM d, yyyy - HH:mm:ss"
              )}
            </p>
            <p>
              <strong>End Date:</strong>{" "}
              {format(new Date(promotion.endDate!), "MMMM d, yyyy - HH:mm:ss")}
            </p>
            <p>
              <strong>Promotion Rate:</strong> {promotion.promotionRate}%
            </p>
          </div>
        </div>
      ) : (
        <span className="text-slate-500">
          No promotion campaign is set for this product.
        </span>
      );
    },
  },
  {
    id: "actions",
    header: "ACTIONS",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
