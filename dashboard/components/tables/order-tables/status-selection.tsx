'use client';

import { Loader } from '@/components/global/loader';
import { Button } from '@/components/ui/button';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { useUpdateOrderStatus } from '@/server/order/mutations';
import { Order } from '@/types/product';
import { useState } from 'react';
import { toast } from 'sonner';

interface StatusSelectionProps {
	order: Order;
}

export const StatusSelection = ({ order }: StatusSelectionProps) => {
	const [newStatus, setNewStatus] = useState<string | undefined>(undefined);
	const updateStatus = useUpdateOrderStatus();
	const handleChangeStatus = async () => {
		try {
			updateStatus.mutate({
				...order,
				status: newStatus,
			});
		} catch (error) {
			console.error('Error deleting account:', error);
			toast.error('Error deleting account:');
		}
	};
	return (
		<div className='flex gap-4 flex-col mt-4'>
			<Select
				defaultValue={order.status}
				onValueChange={(value: string) => setNewStatus(value)}
			>
				<SelectTrigger className='w-full'>
					<SelectValue placeholder='Change order status' />
				</SelectTrigger>
				<SelectContent>
					<SelectItem value='pending'>PENDING</SelectItem>
					<SelectItem value='ready'>READY</SelectItem>
					<SelectItem value='done'>DONE</SelectItem>
				</SelectContent>
			</Select>
			<div className='self-end'>
				<Button
					disabled={updateStatus.isPending}
					onClick={handleChangeStatus}
				>
					{updateStatus.isPending && (
						<Loader className='h-4 w-4 mr-2' />
					)}
					Change status
				</Button>
			</div>
		</div>
	);
};
