import { useQuery } from '@tanstack/react-query';
import api from '../utils/apiInstance';

const useAdmin = () => {
	const adminQuery = {
		queryKey: ['admin'],
		queryFn: async () => {
			const response = await api.get('/users/admin/app-stats');
			return response.data;
		},
		staleTime: 1000 * 60 * 5,
	};

	return useQuery(adminQuery);
};

export default useAdmin;
