import { Link } from 'react-router-dom';
import main from '../assets/images/main.svg';
import { Logo } from '../components';

const Landing = () => {
	return (
		<div className='flex justify-center min-h-screen'>
			<div className='flex flex-col w-[75%]'>
				<div>
					<Logo />
				</div>
				<div className='flex-1 grid grid-cols-1 items-center gap-4  h-auto lg:h-auto lg:grid-cols-2'>
					<div>
						<h1 className='md:text-5xl lg:text-6xl m-0'>
							Job <span className='text-[--primary-color]'>Tracking</span> App
						</h1>
						<p className='text-base opacity-80 my-8 max-w-xl'>
							Lorem ipsum dolor, sit amet consectetur adipisicing elit.
							Officiis, sit! Laudantium quasi similique quaerat fuga facilis
							commodi cumque corporis facere sit? Velit iste non et excepturi
							consectetur, modi corporis ea?
						</p>
						<div className='flex flex-wrap gap-1'>
							<Link to='/register'>
								<button className='bg-[--primary-color] px-3 py-1 text-white font-semibold rounded-md mr-2'>
									Register
								</button>
							</Link>
							<Link to='/login'>
								<button className='bg-[--primary-color] px-3 py-1 text-white font-semibold rounded-md mr-2'>
									Login / Demo User
								</button>
							</Link>
						</div>
					</div>
					<div className='hidden lg:block'>
						<img src={main} alt='' className='max-w-sm' />
					</div>
				</div>
			</div>
		</div>
	);
};

export default Landing;
