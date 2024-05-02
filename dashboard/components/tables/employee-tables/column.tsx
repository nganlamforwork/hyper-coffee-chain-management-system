'use client';

import { Checkbox } from '@/components/ui/checkbox';
import { ColumnDef } from '@tanstack/react-table';
import { CellAction } from './cell-action';
import { User } from '@/types/user';
import { Badge } from '@/components/ui/badge';

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
		accessorKey: 'name',
		header: 'NAME',
	},
	{
		accessorKey: 'role',
		header: 'ROLE',
		cell: ({ renderValue, ...props }) => {
			const value = renderValue() as string;
			const roleToVariant = {
				admin: 'admin',
				staff: 'staff',
				switch_board_staff: 'switch_board_staff',
			};
			const role =
				value.toLowerCase() as string as keyof typeof roleToVariant;
			const variant = roleToVariant[role] as typeof role;
			return <Badge variant={variant}>{value}</Badge>;
		},
	},
	{
		accessorKey: 'email',
		header: 'EMAIL',
	},
	{
		accessorKey: 'gender',
		header: 'GENDER',
	},
	{
		accessorKey: 'phone',
		header: 'PHONE',
	},
	{
		accessorKey: 'dateOfBirth',
		header: 'DATE OF BIRTH',
	},
	{
		id: 'actions',
		cell: ({ row }) => <CellAction data={row.original} />,
	},
];
