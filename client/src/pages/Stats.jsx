import { StatsContainer, ChartContainer } from '../components';
import { Loading, ErrorComponent } from '../components';
import useStats from '../hooks/useStats';

const Stats = () => {
	const { data, isError, isLoading } = useStats();
	if (isLoading) return <Loading />;
	if (isError) return <ErrorComponent />;

	return (
		<div className='flex justify-center w-full mt-5'>
			<div className='w-[90%] flex flex-col gap-16'>
				<StatsContainer defaultStats={data?.defaultStats} />
				<ChartContainer data={data?.monthlyApplications} />
			</div>
		</div>
	);
};

export default Stats;
