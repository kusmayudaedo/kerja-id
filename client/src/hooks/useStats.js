import { useQuery } from '@tanstack/react-query';
import api from '../utils/apiInstance';

const useStats = () => {
	const statsQuery = {
		queryKey: ['stats'],
		queryFn: async () => {
			const response = await api.get('/jobs/stats');
			return response.data;
		},
		staleTime: 1000 * 60 * 5,
	};

	return useQuery(statsQuery);
};

export default useStats;
