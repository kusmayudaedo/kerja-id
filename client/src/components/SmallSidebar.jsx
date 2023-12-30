import Logo from './Logo';
import NavLinks from './NavLinks';
import { IoClose } from 'react-icons/io5';
import { useDashboardContext } from '../pages/DashboardLayout';

const SmallSidebar = () => {
	const { toggleSidebar, showSidebar } = useDashboardContext();
	return (
		<div
			className={`${
				showSidebar
					? 'block lg:hidden rounded-md bg-white h-[calc(100vh-40px)] m-6 '
					: 'hidden'
			}`}
		>
			<div className='text-3xl text-red-500'>
				<button className='' onClick={toggleSidebar}>
					<IoClose />
				</button>
			</div>
			<div className='flex flex-col items-center'>
				<div className=''>
					<Logo />
				</div>
				<div className=''>
					<NavLinks />
				</div>
			</div>
		</div>
	);
};

export default SmallSidebar;
