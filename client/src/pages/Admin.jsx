import api from '../utils/apiInstance';
import { redirect, useLoaderData } from 'react-router-dom';
import { toast } from 'react-toastify';
import { StatItem } from '../components';
import { FaUserCircle } from 'react-icons/fa';

export const loader = async () => {
	try {
		const response = await api.get('/users/admin/app-stats');
		return response.data;
	} catch (error) {
		toast.error('Unauthorize');
		return redirect('/dashboard');
	}
};

const Admin = () => {
	const { users, jobs } = useLoaderData();
	return (
		<div className='flex justify-center w-full mt-5'>
			<div className='w-[90%]'>
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3'>
					<StatItem
						count={users}
						title={`${users === 1 ? 'Total User' : 'Total Users'}`}
						icon={<FaUserCircle />}
						textColor='text-color-pending'
						bgColor='bg-color-pending'
						borderColor='border-color-pending'
					/>
					<StatItem
						count={jobs}
						title={`${jobs === 1 ? 'Total Job' : 'Total Jobs'}`}
						icon={<FaUserCircle />}
						textColor='text-color-interview'
						bgColor='bg-color-interview'
						borderColor='border-color-interview'
					/>
				</div>
			</div>
		</div>
	);
};

export default Admin;
