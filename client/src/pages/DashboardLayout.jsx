import { createContext, useContext, useState } from 'react';
import {
	BigSidebar,
	NavBar,
	SmallSidebar,
	Loading,
	ErrorComponent,
} from '../components';
import { Outlet, useNavigate } from 'react-router-dom';
import api from '../utils/apiInstance';
import { toast } from 'react-toastify';
import useUser from '../hooks/useUser';
import { useQueryClient } from '@tanstack/react-query';

const DashboardContext = createContext();

const DashboardLayout = () => {
	const { data: user, isError, isLoading } = useUser();
	const queryClient = useQueryClient();
	const navigate = useNavigate();
	const [showSidebar, setShowSidebar] = useState(false);

	const toggleSidebar = () => {
		setShowSidebar(!showSidebar);
	};

	const logoutUser = async () => {
		navigate('/');
		await api.get('/auth/logout');
		queryClient.invalidateQueries();
		toast.success('Logged out');
	};

	if (isLoading) return <Loading />;
	if (isError) return <ErrorComponent />;

	return (
		<DashboardContext.Provider
			value={{
				user,
				showSidebar,
				toggleSidebar,
				logoutUser,
			}}
		>
			<div className='flex flex-col'>
				<div className='flex flex-1 overflow-hidden'>
					{showSidebar && (
						<div className='w-screen lg:flex  lg:w-60'>
							<SmallSidebar />
							<BigSidebar />
						</div>
					)}
					<div
						className={`${
							showSidebar
								? 'hidden lg:block lg:w-screen lg:flex-1'
								: 'block w-screen'
						}`}
					>
						<div className='flex'>
							<NavBar />
						</div>
						<div className='overflow-y-auto h-[calc(100vh-120px)]'>
							<Outlet context={{ user }} />
						</div>
					</div>
				</div>
			</div>
		</DashboardContext.Provider>
	);
};

export const useDashboardContext = () => useContext(DashboardContext);

export default DashboardLayout;
