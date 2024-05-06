import { axiosInstance } from '@/lib/api';
import { Product } from '@/types/product';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export const useCreateProduct = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (newProduct: Product) =>
			axiosInstance.post('/admin/create-product', newProduct),
		onError: (error) => {
			toast.error('An error occurred: ' + error.message);
		},
		onSettled: async (_, error) => {
			await queryClient.invalidateQueries({ queryKey: ['products'] });
			toast.success('Add new product successfully');
		},
	});
};

export const useUpdateProduct = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (updatedProduct: Product) =>
			axiosInstance.put('/admin/update-product', updatedProduct),
		onError: (error) => {
			toast.error('An error occurred: ' + error.message);
		},
		onSettled: async (_, error, variables) => {
			await queryClient.invalidateQueries({ queryKey: ['products'] });
			await queryClient.invalidateQueries({
				queryKey: ['products', { id: variables.id }],
			});
			toast.success('Update product successfully');
		},
	});
};

export const useDeleteProduct = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (prodId: string) =>
			axiosInstance.delete(`/admin/delete-product/${prodId}`),
		onError: (error) => {
			toast.error('An error occurred: ' + error.message);
		},
		onSettled: async (_, error) => {
			await queryClient.invalidateQueries({ queryKey: ['products'] });
			toast.success('Product deleted successfully');
		},
	});
};
