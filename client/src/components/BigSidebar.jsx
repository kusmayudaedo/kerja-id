import React from 'react';
import { useDashboardContext } from '../pages/DashboardLayout';
import Logo from './Logo';
import NavLinks from './NavLinks';

const BigSidebar = () => {
	const { showSidebar } = useDashboardContext();

	return (
		<div
			className={showSidebar ? 'hidden lg:block w-60 px-5 bg-white' : 'hidden'}
		>
			<Logo />
			<NavLinks isBigSidebar />
		</div>
	);
};

export default BigSidebar;
