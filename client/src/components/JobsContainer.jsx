import { useAllJobsContext } from '../pages/AllJobs';
import JobsCard from './JobsCard';
import PaginationContainer from './PaginationContainer';

const JobsContainer = () => {
	const { data } = useAllJobsContext();
	const { jobs, totalJobs, numberOfPages } = data;

	if (jobs.length === 0) {
		return (
			<div>
				<h2>No job to display</h2>
			</div>
		);
	}
	return (
		<>
			<h2 className='m-0 p-0 ml-3 mb-3'>{`${totalJobs} ${
				jobs.length > 1 ? 'Jobs Found' : 'Job Found'
			}`}</h2>
			<div className='grid grid-cols-1 md:grid-cols-2 gap-2'>
				{jobs.map((job) => (
					<div key={job._id}>
						<JobsCard {...job} />
					</div>
				))}
			</div>
			<div className='flex justify-end mt-5 mx-3'>
				{numberOfPages > 1 && <PaginationContainer />}
			</div>
		</>
	);
};

export default JobsContainer;
