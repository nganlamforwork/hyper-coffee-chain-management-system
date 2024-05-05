'use client';

import { Checkbox } from '@/components/ui/checkbox';
import { ColumnDef } from '@tanstack/react-table';
import { CellAction } from './cell-action';
import { User } from '@/types/user';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { OrderDetails } from '@/types/product';

export const columns: ColumnDef<User>[] = [
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
		accessorKey: 'id',
		header: 'ORDER ID',
	},
	{
		accessorKey: 'createdAt',
		header: 'CREATED',
		cell: ({ renderValue, ...props }) => {
			const value = renderValue() as string;
			const formattedDate = format(
				new Date(value),
				'MMMM d, yyyy - HH:mm:ss'
			);
			return <span>{formattedDate}</span>;
		},
	},
	{
		accessorKey: 'name',
		header: 'NAME',
	},
	{
		accessorKey: 'address',
		header: 'ADDRESS',
	},
	{
		accessorKey: 'items',
		header: 'QUANTITY',
		cell: ({ renderValue, ...props }) => {
			const value = renderValue() as OrderDetails[];
			return <span>{value.length}</span>;
		},
	},
	{
		accessorKey: 'total',
		header: 'TOTAL BILL',
		cell: ({ renderValue, ...props }) => {
			const value = renderValue() as number;
			return <span>${value.toFixed(2)}</span>;
		},
	},
	{
		accessorKey: 'paymentMethodId',
		header: 'PAYMENT',
		cell: ({ renderValue, ...props }) => {
			const value = renderValue() as string;
			const type = value ? 'Non-Cash' : 'Cash';
			return <span>{type}</span>;
		},
	},
	{
		accessorKey: 'status',
		header: 'STATUS',
		cell: ({ renderValue, ...props }) => {
			const value = renderValue() as string;
			const statusToVariant = {
				pending: 'admin',
				ready: 'default',
				done: 'staff',
			} as any;
			const variant = statusToVariant[value];
			return <Badge variant={variant}>{value.toUpperCase()}</Badge>;
		},
	},
	{
		id: 'actions',
		cell: ({ row }) => <CellAction data={row.original} />,
	},
];
