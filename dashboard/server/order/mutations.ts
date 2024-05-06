import { axiosInstance } from '@/lib/api';
import { Order } from '@/types/product';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export const useCreateOrder = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (newOrder: Order) =>
			axiosInstance.post('/admin/create-order', newOrder),
		onError: (error) => {
			toast.error('An error occurred: ' + error.message);
		},
		onSettled: async (_, error) => {
			await queryClient.invalidateQueries({ queryKey: ['orders'] });
			toast.success('Add new order successfully');
		},
	});
};

export const useUpdateOrderStatus = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (updatedOrder: Order) =>
			axiosInstance.put('/admin/update-order-status', updatedOrder),
		onError: (error) => {
			toast.error('An error occurred: ' + error.message);
		},
		onSettled: async (_, error, variables) => {
			await queryClient.invalidateQueries({ queryKey: ['orders'] });
			await queryClient.invalidateQueries({
				queryKey: ['orders', { id: variables.id }],
			});
			toast.success('Update order status successfully');
		},
	});
};
