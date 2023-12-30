import { StatItem } from '../components';
import { FaBriefcase, FaBug, FaCalendarCheck } from 'react-icons/fa';

const StatsContainer = ({ defaultStats }) => {
	return (
		<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3'>
			<StatItem
				count={defaultStats.pending}
				title={`${
					defaultStats.pending > 1
						? 'Pending Applications'
						: 'Pending Application'
				} `}
				icon={<FaBriefcase />}
				textColor='text-color-pending'
				bgColor='bg-color-pending'
				borderColor='border-color-pending'
			/>
			<StatItem
				count={defaultStats.interview}
				title={`${
					defaultStats.interview > 1
						? 'Interviews Scheduled'
						: 'Interview Scheduled'
				} `}
				icon={<FaCalendarCheck />}
				textColor='text-color-interview'
				bgColor='bg-color-interview'
				borderColor='border-color-interview'
			/>
			<StatItem
				count={defaultStats.decline}
				title={`${
					defaultStats.decline > 1 ? 'Jobs Declined' : 'Job Declined'
				} `}
				icon={<FaBug />}
				textColor='text-color-decline'
				bgColor='bg-color-decline'
				borderColor='border-color-decline'
			/>
		</div>
	);
};

export default StatsContainer;
