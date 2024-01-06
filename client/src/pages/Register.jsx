import { Logo, FormRow } from '../components';
import { Link, Form, useNavigation, redirect } from 'react-router-dom';
import api from '../utils/apiInstance';
import { toast } from 'react-toastify';

export const action = async ({ request }) => {
	const formData = await request.formData();
	const data = Object.fromEntries(formData);

	try {
		await api.post('/auth/register', data);
		toast.success('Register successful');
		return redirect('/login');
	} catch (error) {
		toast.error(error?.response?.data?.message);
		return error;
	}
};

const Register = () => {
	const navigation = useNavigation();
	const isSubmitting = navigation.state === 'submitting';
	return (
		<div className='flex flex-col h-[calc(100vh-50px)] py-10 items-center justify-center'>
			<div className='w-[300px] md:w-[600px] lg:min-w-[800px] h-auto bg-white rounded-lg shadow-lg'>
				<div className='w-full bg-[--primary-color] h-1 rounded-t-lg'></div>
				<div className='flex flex-col items-center mt-4 mb-2 '>
					<Logo />
				</div>

				<div className='flex flex-col px-5 -mt-10'>
					<h3 className='flex justify-center'>Register</h3>
					<Form
						method='post'
						className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3'
					>
						<FormRow type='text' name='firstName' labelText='First Name' />
						<FormRow type='text' name='lastName' labelText='Last Name' />
						<FormRow type='text' name='username' labelText='Username' />
						<FormRow type='text' name='email' labelText='Email' />
						<FormRow type='password' name='password' labelText='Password' />
						<FormRow
							type='password'
							name='confirmPassword'
							labelText='Confirm Password'
						/>
						<div className='md:col-span-2 lg:col-span-3'>
							<button
								type='submit'
								className='bg-[--primary-color] px-3 py-1 text-white font-semibold rounded-md mr-2 w-full'
								disabled={isSubmitting}
							>
								{isSubmitting ? 'Submitting...' : 'Submit'}
							</button>
						</div>
					</Form>
					<p className='text-center'>
						Already a member?{' '}
						<span className=''>
							<Link to='/login' className='text-[--primary-color]'>
								Login{' '}
							</Link>
						</span>
					</p>
				</div>
			</div>
		</div>
	);
};

export default Register;
