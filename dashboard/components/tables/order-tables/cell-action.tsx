'use client';
import CustomDialogTrigger from '@/components/global/custom-dialog-trigger';
import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Edit, MoreHorizontal } from 'lucide-react';
import { StatusSelection } from './status-selection';
import { Order } from '@/types/product';

interface CellActionProps {
	data: Order;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
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
					<DropdownMenuItem onSelect={(e) => e.preventDefault()}>
						<CustomDialogTrigger
							header='Update Order Status'
							content={<StatusSelection order={data} />}
							description='Update the order status for tracking purposes.'
						>
							<div className='flex transition-all hover:bg-muted items-center gap-2 w-full rounded-md'>
								<Edit className='h-4 w-4' /> Update Status
							</div>
						</CustomDialogTrigger>
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</>
	);
};
