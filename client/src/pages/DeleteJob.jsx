import api from '../utils/apiInstance';
import { toast } from 'react-toastify';
import { redirect } from 'react-router-dom';

export const action = async ({ params }) => {
	try {
		await api.delete(`/jobs/${params.id}`);
		toast.success('Job deleted successfully');
	} catch (error) {
		toast.error(error?.response?.data?.message);
	}
	return redirect('/dashboard/all-jobs');
};

export default action;
