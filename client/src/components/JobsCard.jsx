import { FaLocationArrow, FaBriefcase, FaCalendarAlt } from 'react-icons/fa';
import day from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
day.extend(advancedFormat);
import { Form, Link } from 'react-router-dom';

const JobsCard = ({
	_id,
	position,
	company,
	jobLocation,
	jobType,
	jobStatus,
	createdAt,
}) => {
	const date = day(createdAt).format('DD MMM YYYY');
	return (
		<div className='bg-white m-3 px-8 py-6 rounded shadow-lg'>
			<div className='flex gap-6 mb-8 border-b-2 border-solid border-[--primary-color]/.50 pb-4'>
				<div className='bg-[--primary-color] w-14 h-14 rounded flex justify-center items-center'>
					<h4 className='capitalize m-0 p-0 text-2xl font-bold text-white'>
						{company.charAt(0)}
					</h4>
				</div>
				<div>
					<h4 className='text-xl font-semibold mb-[2px] capitalize m-0 p-0'>
						{position}
					</h4>
					<h3 className='text-base font-normal opacity-80 capitalize m-0 p-0'>
						{company}
					</h3>
				</div>
			</div>
			<div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
				<div className='flex gap-3 items-center'>
					<div className='text-sm'>
						<FaLocationArrow />
					</div>
					<h5 className='capitalize'>{jobLocation}</h5>
				</div>

				<div className='flex gap-3 items-center'>
					<div className='text-sm'>
						<FaCalendarAlt />
					</div>
					<h5 className=''>{date}</h5>
				</div>

				<div className='flex gap-3 items-center'>
					<div className='text-sm'>
						<FaBriefcase />
					</div>
					<h5 className='capitalize'>{jobType}</h5>
				</div>

				<div
					className={`job-status-${jobStatus} w-fit px-3 py-1 capitalize rounded`}
				>
					{jobStatus}
				</div>
				<div className='flex flex-col items-start md:flex-row md:justify-center gap-3 md:col-span-2 max-w-fit'>
					<Link to={`../edit-job/${_id}`}>
						<button className='bg-[--primary-color] text-white px-4 py-1 rounded w-full'>
							Edit
						</button>
					</Link>
					<Form method='post' action={`../delete-job/${_id}`}>
						<button
							type='submit'
							className='bg-[--primary-color] text-white px-4 py-1 rounded w-full'
						>
							Delete
						</button>
					</Form>
				</div>
			</div>
		</div>
	);
};

export default JobsCard;
