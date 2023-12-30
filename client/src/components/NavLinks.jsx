import { useDashboardContext } from '../pages/DashboardLayout';
import links from '../utils/links';
import { NavLink } from 'react-router-dom';

const NavLinks = ({ isBigSidebar }) => {
	const { toggleSidebar, user } = useDashboardContext();
	return (
		<div className='px-4 py-8'>
			{links.map((item, index) => {
				if (item.path === 'admin' && user.role !== 'admin') return;
				return (
					<NavLink
						to={item.path}
						key={index}
						className='flex items-center gap-2 mb-3 text-slate-600 no-underline'
						end
						onClick={isBigSidebar ? null : toggleSidebar}
					>
						<div className='flex gap-2 items-center '>
							<div>{item.icon}</div>
							<div>{item.text}</div>
						</div>
					</NavLink>
				);
			})}
		</div>
	);
};

export default NavLinks;
