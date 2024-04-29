import { axiosInstance } from '@/lib/api';
import { Category } from '@/types/product';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export const useCreateCategory = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (newCategory: Category) =>
			axiosInstance.post('/admin/create-category', newCategory),
		onError: (error) => {
			toast.error('An error occurred: ' + error.message);
		},
		onSettled: async (_, error) => {
			await queryClient.invalidateQueries({ queryKey: ['categories'] });
			toast.success('Add new category successfully');
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
			await queryClient.invalidateQueries({ queryKey: ['categories'] });
			await queryClient.invalidateQueries({
				queryKey: ['categories', { id: variables.id }],
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
			await queryClient.invalidateQueries({ queryKey: ['categories'] });
			toast.success('Category deleted successfully');
		},
	});
};
