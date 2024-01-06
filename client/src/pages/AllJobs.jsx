import { useSearchParams } from 'react-router-dom';
import {
	ErrorComponent,
	JobsContainer,
	JobSearchContainer,
	Loading,
} from '../components';
import { createContext, useContext } from 'react';
import useAllJobs from '../hooks/useAllJobs';

const AllJobsContext = createContext();

const AllJobs = () => {
	const [searchParams] = useSearchParams();
	const searchValues = Object.fromEntries([...searchParams]);
	const { data, isLoading, isError } = useAllJobs(searchValues);

	if (isLoading) return <Loading />;
	if (isError) return <ErrorComponent />;

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
