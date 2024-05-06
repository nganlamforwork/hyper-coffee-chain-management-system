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
import { Edit, MoreHorizontal, Trash } from 'lucide-react';
import { toast } from 'sonner';
import { Product } from '@/types/product';
import { useDeleteProduct } from '@/server/product/mutations';
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@/components/ui/sheet';
import CreateProductForm from '@/app/(main)/dashboard/(routes)/menu/_components/create-product-form';

interface CellActionProps {
	data: Product;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
	const deleteProduct = useDeleteProduct();
	const onDelete = async () => {
		deleteProduct.mutateAsync(data.id!);
		try {
		} catch (error) {
			console.error('Error deleting account:', error);
			toast.error('Error deleting account:');
		}
	};

	return (
		<Sheet>
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
						<SheetTrigger asChild>
							<div className='flex transition-all hover:bg-muted items-center gap-2 w-full rounded-md'>
								<Edit className='h-4 w-4' /> Update
							</div>
						</SheetTrigger>
					</DropdownMenuItem>
					<ConfirmModal
						header='Delete this product?'
						description='This will delete this product completely'
						disabled={deleteProduct.isPending}
						onConfirm={onDelete}
					>
						<DropdownMenuItem onSelect={(e) => e.preventDefault()}>
							<Trash className='mr-2 h-4 w-4' /> Delete
						</DropdownMenuItem>
					</ConfirmModal>
				</DropdownMenuContent>
			</DropdownMenu>
			<SheetContent className='sm:max-w-2xl overflow-auto'>
				<SheetHeader>
					<SheetTitle>Update product</SheetTitle>
					<SheetDescription>
						Fill in all the information fields below.
					</SheetDescription>
				</SheetHeader>
				<CreateProductForm update={true} product={data} />
			</SheetContent>
		</Sheet>
	);
};
