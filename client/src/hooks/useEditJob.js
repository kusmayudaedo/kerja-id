import { useQuery } from '@tanstack/react-query';
import api from '../utils/apiInstance';

const useEditJob = (id) => {
	const editQuery = {
		queryKey: ['jobs', id],
		queryFn: async () => {
			const response = await api.get(`jobs/${id}`);
			return response.data.job;
		},
		staleTime: 1000 * 60 * 5,
	};

	return useQuery(editQuery);
};

export default useEditJob;
