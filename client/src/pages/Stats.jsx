import api from '../utils/apiInstance';
import { redirect, useLoaderData } from 'react-router-dom';
import { toast } from 'react-toastify';
import { StatItem } from '../components';
import { FaBriefcase, FaBug, FaCalendarCheck } from 'react-icons/fa';
import { StatsContainer, ChartContainer } from '../components';

export const loader = async () => {
	try {
		const response = await api.get('/jobs/stats');
		return response.data;
	} catch (error) {
		toast.error('Unauthorize');
		return redirect('/dashboard');
	}
};

const Stats = () => {
	const { defaultStats, monthlyApplications } = useLoaderData();
	return (
		<div className='flex justify-center w-full mt-5'>
			<div className='w-[90%] flex flex-col gap-16'>
				<StatsContainer defaultStats={defaultStats} />
				<ChartContainer data={monthlyApplications} />
			</div>
		</div>
	);
};

export default Stats;
