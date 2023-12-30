import { createContext, useContext, useState } from 'react';
import { BigSidebar, NavBar, SmallSidebar, Loading } from '../components';
import {
	Outlet,
	useLoaderData,
	redirect,
	useNavigate,
	useNavigation,
} from 'react-router-dom';
import api from '../utils/apiInstance';
import { toast } from 'react-toastify';

export const loader = async () => {
	try {
		const { data } = await api.get('/users/current-user');
		return data;
	} catch (error) {
		return redirect('/');
	}
};

const DashboardContext = createContext();

const DashboardLayout = () => {
	const { user } = useLoaderData();
	const navigate = useNavigate();
	const navigation = useNavigation();
	const isPageLoading = navigation.state === 'loading';
	const [showSidebar, setShowSidebar] = useState(false);
	const [isDarkTheme, setIsDarkTheme] = useState(false);

	const toggleTheme = () => {
		setIsDarkTheme(!isDarkTheme);
	};

	const toggleSidebar = () => {
		setShowSidebar(!showSidebar);
	};

	const logoutUser = async () => {
		navigate('/');
		await api.get('/auth/logout');
		toast.success('Logged out');
	};

	return (
		<DashboardContext.Provider
			value={{
				user,
				showSidebar,
				isDarkTheme,
				toggleTheme,
				toggleSidebar,
				logoutUser,
			}}
		>
			<div className='flex flex-col h-screen'>
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
							{isPageLoading ? <Loading /> : <Outlet context={{ user }} />}
						</div>
					</div>
				</div>
			</div>
		</DashboardContext.Provider>
	);
};

export const useDashboardContext = () => useContext(DashboardContext);

export default DashboardLayout;
