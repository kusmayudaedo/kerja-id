import { useQuery } from '@tanstack/react-query';
import api from '../utils/apiInstance';

const useUser = () => {
	const userQuery = {
		queryKey: ['user'],
		queryFn: async () => {
			const response = await api.get('/users/current-user');
			return response.data.user;
		},
		staleTime: 1000 * 60 * 5,
	};

	return useQuery(userQuery);
};

export default useUser;
