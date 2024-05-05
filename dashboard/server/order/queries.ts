import { axiosInstance } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';

export const useOrders = () => {
	return useQuery({
		queryKey: ['orders'],
		queryFn: () =>
			axiosInstance.get('/get-orders').then((res) => res.data.orders),
	});
};
