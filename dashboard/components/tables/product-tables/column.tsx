'use client';

import { Checkbox } from '@/components/ui/checkbox';
import { ColumnDef } from '@tanstack/react-table';
import { CellAction } from './cell-action';
import { Product } from '@/types/product';

export const columns: ColumnDef<Product>[] = [
	{
		id: 'select',
		header: ({ table }) => (
			<Checkbox
				checked={table.getIsAllPageRowsSelected()}
				onCheckedChange={(value) =>
					table.toggleAllPageRowsSelected(!!value)
				}
				aria-label='Select all'
			/>
		),
		cell: ({ row }) => (
			<Checkbox
				checked={row.getIsSelected()}
				onCheckedChange={(value) => row.toggleSelected(!!value)}
				aria-label='Select row'
			/>
		),
		enableSorting: false,
		enableHiding: false,
	},
	{
		accessorKey: 'imageUrl',
		header: 'IMAGE',
	},
	{
		accessorKey: 'name',
		header: 'NAME',
	},
	{
		accessorKey: 'category',
		header: 'CATEGORY',
	},
	{
		accessorKey: 'description',
		header: 'DESCRIPTION',
	},
	{
		accessorKey: 'price',
		header: 'PRICE',
	},
	{
		id: 'actions',
		cell: ({ row }) => <CellAction data={row.original} />,
	},
];
