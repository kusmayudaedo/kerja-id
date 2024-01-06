import { Form, useNavigation } from 'react-router-dom';
import { FormRow } from '../components';
import { useDashboardContext } from './DashboardLayout';
import api from '../utils/apiInstance';
import { toast } from 'react-toastify';

export const action =
	(queryClient) =>
	async ({ request }) => {
		const formData = await request.formData();
		const file = formData.get('avatar');
		if (file && file.size > 500000) {
			toast.error('Image size too large');
			return null;
		}
		try {
			await api.patch('/users/update-user', formData);
			queryClient.invalidateQueries(['user']);
			toast.success('Profile updated successfully');
		} catch (error) {
			toast.error(error?.response?.data?.message);
		}
		return null;
	};

const Profile = () => {
	const { user } = useDashboardContext();
	const navigation = useNavigation();
	const isSubmitting = navigation.state === 'submitting';
	return (
		<div className='flex flex-col items-center mt-5'>
			<div className='m-3 bg-white rounded w-[90%] shadow-lg'>
				<Form method='post' className='p-3 m-5' encType='multipart/form-data'>
					<h4 className='p-0 m-0 text-3xl mb-5 font-semibold'>Profile</h4>
					<div className='flex flex-col gap-3'>
						<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3'>
							<div className='mb-4'>
								<label
									className='block text-gray-700 text-sm mb-2'
									htmlFor='avatar'
								>
									Profile Picture (Max 0.5 MB)
								</label>
								<input
									type='file'
									id='avatar'
									name='avatar'
									accept='image/*'
									className='shadow appearance-none border rounded w-full py-[7px] px-3 text-gray-700 leading-tight focus:outline-[--primary-color] focus:shadow-outline'
								/>
							</div>
							<div className='flex-1'>
								<FormRow
									text='firstName'
									name='firstName'
									labelText='First Name'
									defaultValue={user.firstName}
								/>
							</div>
							<div className='flex-1'>
								<FormRow
									text='lastName'
									name='lastName'
									labelText='Last Name'
									defaultValue={user.lastName}
								/>
							</div>
							<div className='flex-1'>
								<FormRow
									text='username'
									name='username'
									labelText='Username'
									defaultValue={user.username}
								/>
							</div>
							<div className='flex-1'>
								<FormRow
									text='email'
									name='email'
									labelText='Email'
									defaultValue={user.email}
								/>
							</div>
							<div className='flex-1 mt-7'>
								<button
									type='submit'
									className='bg-[--primary-color] text-white px-4 py-2 rounded w-full'
									disabled={isSubmitting}
								>
									{isSubmitting ? 'Saving changes...' : 'Save Changes'}
								</button>
							</div>
						</div>
					</div>
				</Form>
			</div>
		</div>
	);
};

export default Profile;
