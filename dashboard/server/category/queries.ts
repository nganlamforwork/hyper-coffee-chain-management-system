import { axiosInstance } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';

export const useCategories = () => {
	return useQuery({
		queryKey: ['categories'],
		queryFn: () =>
			axiosInstance
				.get('/admin/get-categories')
				.then((res) => res.data.categories),
	});
};
