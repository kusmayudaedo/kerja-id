import { useLoaderData } from 'react-router-dom';
import { JobsContainer, JobSearchContainer } from '../components';
import api from '../utils/apiInstance';
import { toast } from 'react-toastify';
import { createContext, useContext } from 'react';

export const loader = async ({ request }) => {
	const params = Object.fromEntries([
		...new URL(request.url).searchParams.entries(),
	]);

	try {
		const { data } = await api.get('/jobs', { params });
		return { data, searchValues: { ...params } };
	} catch (error) {
		toast.error(error?.response?.data?.message);
		return error;
	}
};

const AllJobsContext = createContext();

const AllJobs = () => {
	const { data, searchValues } = useLoaderData();

	return (
		<AllJobsContext.Provider value={{ data, searchValues }}>
			<div className='flex flex-col items-center mt-5'>
				<div className='w-[90%] mb-10'>
					<JobSearchContainer />
				</div>
				<div className='w-[90%]'>
					<JobsContainer />
				</div>
			</div>
		</AllJobsContext.Provider>
	);
};

export const useAllJobsContext = () => useContext(AllJobsContext);

export default AllJobs;
