import { useQuery } from '@tanstack/react-query';
import api from '../utils/apiInstance';

const useAllJobs = (params) => {
	const { search, jobStatus, jobType, sort, page } = params;
	const jobsQuery = {
		queryKey: [
			'jobs',
			search ?? '',
			jobStatus ?? 'all',
			jobType ?? 'all',
			sort ?? 'newest',
			page ?? 1,
		],
		queryFn: async () => {
			const { data } = await api.get('/jobs', { params });
			return data;
		},
		staleTime: 1000 * 60 * 5,
	};

	return useQuery(jobsQuery);
};

export default useAllJobs;
