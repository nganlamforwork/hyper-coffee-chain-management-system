import { axiosInstance } from '@/lib/api';
import { IEmployeeAccountsRequest, User } from '@/types/user';
import { useQuery } from '@tanstack/react-query';

export const useAccounts = () => {
	return useQuery({
		queryKey: ['users'],
		queryFn: () =>
			axiosInstance
				.get<IEmployeeAccountsRequest>('/admin/get-employees')
				.then((res) => res.data.employees),
	});
};
