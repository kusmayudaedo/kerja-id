import {
	Link,
	useNavigation,
	redirect,
	Form,
	useNavigate,
} from 'react-router-dom';
import { FormRow, Logo } from '../components';
import api from '../utils/apiInstance';
import { toast } from 'react-toastify';

export const action =
	(queryClient) =>
	async ({ request }) => {
		const formData = await request.formData();
		const data = Object.fromEntries(formData);

		try {
			await api.post('/auth/login', data);
			queryClient.invalidateQueries();
			toast.success('Logged in');
			return redirect('/dashboard');
		} catch (error) {
			toast.error(error?.response?.data?.message);
			return error;
		}
	};

const Login = () => {
	const navigation = useNavigation();
	const isSubmitting = navigation.state === 'submitting';
	const navigate = useNavigate();

	const loginDemo = async () => {
		const data = {
			email: 'demian@demo.com',
			password: 'secret1234',
		};

		try {
			await api.post('/auth/login', data);
			toast.success('Take a test drive');
			return navigate('/dashboard');
		} catch (error) {
			toast.error(error?.response?.data?.message);
		}
	};

	return (
		<div className='flex flex-col h-[calc(100vh-30px)] items-center justify-center'>
			<div className='w-[300px] md:w-[350px] lg:w-[400px] h-auto bg-white rounded-lg shadow-lg'>
				<div className='w-full bg-[--primary-color] h-1 rounded-t-lg'></div>
				<div className='flex flex-col items-center mt-4 mb-2'>
					<Logo />
				</div>
				<div className='flex flex-col px-5 -mt-10'>
					<h3 className='flex justify-center'>Login</h3>
					<Form method='post'>
						<FormRow type='text' name='email' labelText='Email' />
						<FormRow type='password' name='password' labelText='Password' />
						<div className='flex flex-col gap-3'>
							<button
								type='submit'
								className='bg-[--primary-color] px-3 py-1 text-white font-semibold rounded-md mr-2 w-full'
								disabled={isSubmitting}
							>
								{isSubmitting ? 'Login...' : 'Login'}
							</button>
							<button
								type='button'
								className='bg-[--primary-color] px-3 py-1 text-white font-semibold rounded-md mr-2 w-full'
								onClick={loginDemo}
							>
								Explore The App
							</button>
						</div>
					</Form>
					<p className='text-center'>
						Not a member?{' '}
						<span className=''>
							<Link to='/register' className='text-[--primary-color]'>
								Register Here{' '}
							</Link>
						</span>
					</p>
				</div>
			</div>
		</div>
	);
};

export default Login;
