import { Form, redirect, useNavigation, useParams } from 'react-router-dom';
import api from '../utils/apiInstance';
import { toast } from 'react-toastify';
import { JOB_STATUS, JOB_TYPE } from '../../../utils/constants';
import {
	ErrorComponent,
	FormRow,
	FormRowSelection,
	Loading,
} from '../components';
import useEditJob from '../hooks/useEditJob';

export const action =
	(queryClient) =>
	async ({ request, params }) => {
		const formData = await request.formData();
		const data = Object.fromEntries(formData);
		try {
			await api.patch(`/jobs/${params.id}`, data);
			queryClient.invalidateQueries(['jobs']);
			toast.success('Job edited successfully');
			return redirect('/dashboard/all-jobs');
		} catch (error) {
			toast.error(error?.response?.data?.message);
			return error;
		}
	};

const EditJob = () => {
	const navigation = useNavigation();
	const isSubmitting = navigation.state === 'submitting';
	const { id } = useParams();
	const { data: job, isError, isLoading } = useEditJob(id);
	if (isLoading) return <Loading />;
	if (isError) return <ErrorComponent />;
	return (
		<div className='flex flex-col items-center mt-5'>
			<div className='m-3 bg-white rounded w-[90%] shadow-lg'>
				<Form method='post' className='p-3 m-5'>
					<h4 className='p-0 m-0 text-3xl mb-5 font-semibold'>Edit Job</h4>
					<div className='flex flex-col gap-3'>
						<div className='grid grid-cols-1 md:grid-cols-3 gap-3'>
							<div className='flex-1'>
								<FormRow
									text='position'
									name='position'
									labelText='Position'
									defaultValue={job?.position}
								/>
							</div>
							<div className='flex-1'>
								<FormRow
									text='company'
									name='company'
									labelText='Company'
									defaultValue={job?.company}
								/>
							</div>
							<div className='flex-1'>
								<FormRow
									text='jobLocation'
									name='jobLocation'
									labelText='Job Location'
									defaultValue={job?.jobLocation}
								/>
							</div>
							<div className='flex-1'>
								<FormRowSelection
									name='jobStatus'
									labelText='Job Status'
									list={JOB_STATUS}
									defaultValue={job?.jobStatus}
								/>
							</div>
							<div className='flex-1'>
								<FormRowSelection
									name='jobType'
									labelText='Job Type'
									list={JOB_TYPE}
									defaultValue={job?.jobType}
								/>
							</div>
							<div className='flex-1 mt-7'>
								<button
									type='submit'
									className='bg-[--primary-color] text-white px-4 py-2 rounded w-full'
									disabled={isSubmitting}
								>
									{isSubmitting ? 'Editing...' : 'Edit'}
								</button>
							</div>
						</div>
					</div>
				</Form>
			</div>
		</div>
	);
};

export default EditJob;
