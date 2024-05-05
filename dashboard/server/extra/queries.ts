import { axiosInstance } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';

export const useExtraGroups = () => {
	return useQuery({
		queryKey: ['extras'],
		queryFn: () =>
			axiosInstance
				.get('/get-extra-groups')
				.then((res) => res.data.extraGroups),
	});
};
