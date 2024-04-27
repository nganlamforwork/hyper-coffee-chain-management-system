import { User } from '@/types/user';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const useAccounts = () => {
	return useQuery({
		queryKey: ['users'],
		queryFn: () => axios.get<User[]>('/api/users').then((res) => res.data),
	});
};
