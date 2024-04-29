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
import { useDeleteAccount } from '@/server/users/mutations';
import { Edit, MoreHorizontal, Trash } from 'lucide-react';
import { toast } from 'sonner';
import { Product } from '@/types/product';

interface CellActionProps {
	data: Product;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
	const deleteAccount = useDeleteAccount();
	const onDelete = async () => {
		try {
			await deleteAccount.mutateAsync(data.id!);
			toast.success('Account deleted successfully');
		} catch (error) {
			console.error('Error deleting account:', error);
			toast.error('Error deleting account:');
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
						<div className='flex transition-all hover:bg-muted items-center gap-2 w-full rounded-md'>
							<Edit className='h-4 w-4' /> Update
						</div>
					</DropdownMenuItem>
					<ConfirmModal
						header='Delete this account?'
						description='This will delete this account completely'
						disabled={deleteAccount.isPending}
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
