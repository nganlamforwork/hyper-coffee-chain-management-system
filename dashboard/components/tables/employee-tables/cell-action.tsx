'use client';
import { ConfirmModal } from '@/components/modals/confirm-modal';
import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { deleteAccountById } from '@/server/actions/users/queries';
import { Employee } from '@/types/user';
import { Edit, MoreHorizontal, Trash } from 'lucide-react';
import { useState } from 'react';

interface CellActionProps {
	data: Employee;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
	const [loading, setLoading] = useState(false);

	const onConfirm = async () => {};

	const onDelete = async () => {
		try {
			setLoading(true);
			await deleteAccountById(data.id);
			console.log('Account deleted successfully');
			setLoading(false);
		} catch (error) {
			console.error('Error deleting account:', error);
		}
	};

	return (
		<>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant='ghost' className='h-8 w-8 p-0'>
						<span className='sr-only'>Open menu</span>
						<MoreHorizontal className='h-4 w-4' />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align='end'>
					<DropdownMenuLabel>Actions</DropdownMenuLabel>

					<DropdownMenuItem>
						<Edit className='mr-2 h-4 w-4' /> Update
					</DropdownMenuItem>
					<ConfirmModal
						header='Delete this account?'
						description='This will delete this account completely'
						disabled={loading}
						onConfirm={onDelete}
					>
						<DropdownMenuItem onSelect={(e) => e.preventDefault()}>
							<Trash className='mr-2 h-4 w-4' /> Delete
						</DropdownMenuItem>
					</ConfirmModal>
				</DropdownMenuContent>
			</DropdownMenu>
		</>
	);
};
