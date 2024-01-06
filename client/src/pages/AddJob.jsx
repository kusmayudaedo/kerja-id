import {
	Form,
	useOutletContext,
	useNavigation,
	redirect,
} from 'react-router-dom';
import { FormRow, FormRowSelection } from '../components';
import { JOB_STATUS, JOB_TYPE } from '../../../utils/constants.js';
import api from '../utils/apiInstance.js';
import { toast } from 'react-toastify';

export const action =
	(queryClient) =>
	async ({ request }) => {
		const formData = await request.formData();
		const data = Object.fromEntries(formData);
		try {
			await api.post('/jobs', data);
			queryClient.invalidateQueries(['jobs']);
			toast.success('Job added successfully');
			return redirect('/dashboard/all-jobs');
		} catch (error) {
			toast.error(error?.response?.data?.message);
			return error;
		}
	};

const AddJob = () => {
	const { user } = useOutletContext();
	const navigation = useNavigation();
	const isSubmitting = navigation.state === 'submitting';
	return (
		<div className='flex flex-col items-center mt-5'>
			<div className='m-3 bg-white rounded w-[90%] shadow-lg'>
				<Form method='post' className='p-3 m-5'>
					<h4 className='p-0 m-0 text-3xl mb-5 font-semibold'>Add Job</h4>
					<div className='flex flex-col gap-3'>
						<div className='grid grid-cols-1 md:grid-cols-3 gap-3'>
							<div className='flex-1'>
								<FormRow text='position' name='position' labelText='Position' />
							</div>
							<div className='flex-1'>
								<FormRow text='company' name='company' labelText='Company' />
							</div>
							<div className='flex-1'>
								<FormRow
									text='jobLocation'
									name='jobLocation'
									labelText='Job Location'
									defaultValue={user.location}
								/>
							</div>
							<div className='flex-1'>
								<FormRowSelection
									name='jobStatus'
									labelText='Job Status'
									list={JOB_STATUS}
									defaultValue={JOB_STATUS.PENDING}
								/>
							</div>
							<div className='flex-1'>
								<FormRowSelection
									name='jobType'
									labelText='Job Type'
									list={JOB_TYPE}
									defaultValue={JOB_TYPE.FULL_TIME}
								/>
							</div>
							<div className='flex-1 mt-7'>
								<button
									type='submit'
									className='bg-[--primary-color] text-white px-4 py-2 rounded w-full'
									disabled={isSubmitting}
								>
									{isSubmitting ? 'Submitting...' : 'Submit'}
								</button>
							</div>
						</div>
					</div>
				</Form>
			</div>
		</div>
	);
};

export default AddJob;
