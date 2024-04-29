import { axiosInstance } from '@/lib/api';
import { Category, Product } from '@/types/product';
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

export const useUpdateCategory = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (updatedCategory: Category) =>
			axiosInstance.put('/admin/update-category', updatedCategory),
		onError: (error) => {
			toast.error('An error occurred: ' + error.message);
		},
		onSettled: async (_, error, variables) => {
			await queryClient.invalidateQueries({ queryKey: ['products'] });
			await queryClient.invalidateQueries({
				queryKey: ['products', { id: variables.id }],
			});
			toast.success('Update category successfully');
		},
	});
};

export const useDeleteCategory = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (cateId: string) =>
			axiosInstance.delete(`/admin/delete-category/${cateId}`),
		onError: (error) => {
			toast.error('An error occurred: ' + error.message);
		},
		onSettled: async (_, error) => {
			await queryClient.invalidateQueries({ queryKey: ['products'] });
			toast.success('Category deleted successfully');
		},
	});
};
