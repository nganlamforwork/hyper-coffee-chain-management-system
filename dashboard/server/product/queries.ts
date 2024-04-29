import { axiosInstance } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';

export const useProducts = () => {
	return useQuery({
		queryKey: ['products'],
		queryFn: () =>
			axiosInstance
				.get('/admin/get-products')
				.then((res) => res.data.products),
	});
};
