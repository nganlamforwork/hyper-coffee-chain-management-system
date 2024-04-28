import { axiosInstance } from '@/lib/api';
import { User } from '@/types/user';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useCreateAccount = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (newAccount: User) =>
			axiosInstance.post('/admin/create-accounts', newAccount),
		onSettled: async (_, error) => {
			await queryClient.invalidateQueries({ queryKey: ['users'] });
		},
	});
};

export const useUpdateEmployeeRole = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (updatedAccount: User) =>
			axiosInstance.put('/admin/update-employee-role', updatedAccount),
		onSettled: async (_, error, variables) => {
			await queryClient.invalidateQueries({ queryKey: ['users'] });
			await queryClient.invalidateQueries({
				queryKey: ['users', { id: variables.id }],
			});
		},
	});
};

export const useDeleteAccount = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (userId: string) =>
			axiosInstance.delete(`/admin/delete-user/${userId}`),
		onSettled: async (_, error) => {
			await queryClient.invalidateQueries({ queryKey: ['users'] });
		},
	});
};
