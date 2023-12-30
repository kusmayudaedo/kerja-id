import { FaUserCircle } from 'react-icons/fa';
import { useDashboardContext } from '../pages/DashboardLayout';
import { useState } from 'react';

const LogoutContainer = () => {
	const { user, logoutUser } = useDashboardContext();
	const [showLogout, setShowLogout] = useState(false);
	return (
		<div className='relative'>
			<button
				className='bg-[--primary-color] w-8 h-8 rounded-full overflow-hidden flex justify-center items-center text-white text-2xl mb-1'
				onClick={() => setShowLogout(!showLogout)}
			>
				{user.avatar ? <img src={user.avatar} /> : <FaUserCircle />}
			</button>
			<div
				className={`${
					showLogout ? 'block' : 'hidden'
				} absolute right-0 w-48 bg-white rounded-lg p-4 shadow-lg mt-1`}
			>
				<div className='flex flex-col mb-4'>
					<span className='capitalize'>
						{user.firstName} {user.lastName}
					</span>
					<span className='opacity-80'>@{user.username}</span>
				</div>
				<div>
					<button
						className='block bg-[--primary-color] rounded-md px-3 py-[2px] text-white font-semibold w-full'
						onClick={() => {
							logoutUser();
							setShowLogout(!showLogout);
						}}
					>
						Logout
					</button>
				</div>
			</div>
		</div>
	);
};

export default LogoutContainer;
