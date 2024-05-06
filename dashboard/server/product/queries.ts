import { axiosInstance } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';

export const useProducts = (categoryId?: string) => {
	return useQuery({
		queryKey: ['products', categoryId],
		queryFn: () =>
			axiosInstance
				.get(
					`/get-products${
						categoryId ? `?categoryId=${categoryId}` : ''
					}`
				)
				.then((res) => res.data.products),
	});
};
