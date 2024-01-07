import { Form, useSubmit, useNavigate } from 'react-router-dom';
import { FormRow, FormRowSelection } from '../components';
import { JOB_STATUS, JOB_TYPE, JOB_SORT_BY } from '../../../utils/constants.js';
import { useAllJobsContext } from '../pages/AllJobs.jsx';
import { useQueryClient } from '@tanstack/react-query';

const JobSearchContainer = () => {
	const { searchValues } = useAllJobsContext();
	const { search, jobStatus, jobType, sort } = searchValues;
	const submit = useSubmit();
	const navigate = useNavigate();
	const queryClient = useQueryClient();

	const debounce = (onChange) => {
		let timeout;
		return (e) => {
			const form = e.currentTarget.form;
			clearTimeout(timeout);
			timeout = setTimeout(() => {
				onChange(form);
			}, 1000);
		};
	};

	const handleResetValue = () => {
		navigate('/dashboard/all-jobs');
		queryClient.invalidateQueries(['jobs']);
	};

	return (
		<div className='flex flex-col items-center mt-5'>
			<div className='m-3 bg-white rounded w-full'>
				<Form className='p-3 m-5'>
					<h4 className='p-0 m-0 text-3xl mb-5 font-semibold'>Search Form</h4>
					<div className='flex flex-col gap-3'>
						<div className='grid grid-cols-1 md:grid-cols-3 gap-3'>
							<div className='flex-1'>
								<FormRow
									type='search'
									text='search'
									name='search'
									labelText='Search'
									defaultValue={search}
									onChange={debounce((form) => {
										submit(form);
									})}
								/>
							</div>
							<div className='flex-1'>
								<FormRowSelection
									name='jobStatus'
									labelText='Job Status'
									list={['all', ...Object.values(JOB_STATUS)]}
									defaultValue={jobStatus}
									onChange={(e) => {
										submit(e.currentTarget.form);
									}}
								/>
							</div>
							<div className='flex-1'>
								<FormRowSelection
									name='jobType'
									labelText='Job Type'
									list={['all', ...Object.values(JOB_TYPE)]}
									defaultValue={jobType}
									onChange={(e) => {
										submit(e.currentTarget.form);
									}}
								/>
							</div>
							<div className='flex-1'>
								<FormRowSelection
									name='sort'
									labelText='Sort'
									list={JOB_SORT_BY}
									defaultValue={sort}
									onChange={(e) => {
										submit(e.currentTarget.form);
									}}
								/>
							</div>

							<div className='flex-1 mt-7'>
								<button
									type='button'
									className='bg-[--primary-color] text-white px-4 py-[7px] rounded w-full'
									onClick={handleResetValue}
								>
									Reset Search Value
								</button>
							</div>
						</div>
					</div>
				</Form>
			</div>
		</div>
	);
};

export default JobSearchContainer;
