import { FaAlignLeft } from 'react-icons/fa';
import { useDashboardContext } from '../pages/DashboardLayout';
import LogoutContainer from './LogoutContainer';
import logo from '../assets/images/logo.png';

export const NavBar = () => {
	const { toggleSidebar } = useDashboardContext();
	return (
		<div className='flex flex-col items-center h-20 bg-white w-full'>
			<div className='w-[90%] h-full flex justify-between items-center'>
				<button
					className='text-2xl text-[--primary-color]'
					onClick={toggleSidebar}
				>
					<FaAlignLeft />
				</button>
				<div className='text-2xl font-semibold hidden md:block'>Dashboard</div>
				<div className='w-10 h-10 md:hidden'>
					<img src={logo} className='m-0 p-0' />
				</div>
				<LogoutContainer />
			</div>
		</div>
	);
};

export default NavBar;
