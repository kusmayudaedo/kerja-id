import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
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

const queryClient = new QueryClient();

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
				action: loginAction(queryClient),
			},
			{
				path: 'register',
				element: <Register />,
				action: registerAction,
			},
			{
				path: 'dashboard',
				element: <DashboardLayout />,
				children: [
					{
						index: true,
						element: <AddJob />,
						action: createJobAction(queryClient),
					},
					{
						path: 'all-jobs',
						element: <AllJobs />,
					},
					{
						path: 'stats',
						element: <Stats />,
					},
					{
						path: 'profile',
						element: <Profile />,
						action: updateProfileAction(queryClient),
					},
					{
						path: 'admin',
						element: <Admin />,
					},
					{
						path: 'edit-job/:id',
						element: <EditJob />,
						action: editJobAction(queryClient),
					},
					{
						path: 'delete-job/:id',
						action: deleteJobAction(queryClient),
					},
				],
			},
		],
	},
]);

const App = () => {
	return (
		<QueryClientProvider client={queryClient}>
			<RouterProvider router={router} />;
			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	);
};

export default App;
