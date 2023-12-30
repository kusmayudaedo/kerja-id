import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import {
	HomeLayout,
	Landing,
	Register,
	Login,
	Error,
	DashboardLayout,
	AddJob,
	AllJobs,
	Stats,
	Profile,
	Admin,
	EditJob,
} from './pages';

import { action as registerAction } from './pages/Register';
import { action as loginAction } from './pages/Login';
import { action as createJobAction } from './pages/AddJob';
import { action as editJobAction } from './pages/EditJob';
import { action as deleteJobAction } from './pages/DeleteJob';
import { action as updateProfileAction } from './pages/Profile';

import { loader as dashboardLoader } from './pages/DashboardLayout';
import { loader as jobsLoader } from './pages/AllJobs';
import { loader as editJobLoader } from './pages/EditJob';
import { loader as adminLoader } from './pages/Admin';
import { loader as statsLoader } from './pages/Stats';

const router = createBrowserRouter([
	{
		path: '/',
		element: <HomeLayout />,
		errorElement: <Error />,
		children: [
			{
				index: true,
				element: <Landing />,
			},
			{
				path: 'login',
				element: <Login />,
				action: loginAction,
			},
			{
				path: 'register',
				element: <Register />,
				action: registerAction,
			},
			{
				path: 'dashboard',
				element: <DashboardLayout />,
				loader: dashboardLoader,
				children: [
					{
						index: true,
						element: <AddJob />,
						action: createJobAction,
					},
					{
						path: 'all-jobs',
						element: <AllJobs />,
						loader: jobsLoader,
					},
					{
						path: 'stats',
						element: <Stats />,
						loader: statsLoader,
					},
					{
						path: 'profile',
						element: <Profile />,
						action: updateProfileAction,
					},
					{
						path: 'admin',
						element: <Admin />,
						loader: adminLoader,
					},
					{
						path: 'edit-job/:id',
						element: <EditJob />,
						action: editJobAction,
						loader: editJobLoader,
					},
					{
						path: 'delete-job/:id',
						action: deleteJobAction,
					},
				],
			},
		],
	},
]);

const App = () => {
	return <RouterProvider router={router} />;
};

export default App;
