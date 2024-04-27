import { User } from '@/types/user';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

export const useCreateAccount = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (newAccount: User) => axios.post('/api/users', newAccount),
		onSettled: async (_, error) => {
			await queryClient.invalidateQueries({ queryKey: ['users'] });
		},
	});
};

export const useUpdateAccount = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (updatedAccount: User) =>
			axios.put('/api/users', updatedAccount),
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
		mutationFn: (userId: string) => axios.delete(`/api/users/${userId}`),
		onSettled: async (_, error) => {
			await queryClient.invalidateQueries({ queryKey: ['users'] });
		},
	});
};
