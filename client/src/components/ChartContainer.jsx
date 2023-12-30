import AreaChart from './AreaChartComponent';
import BarChart from './BarChartComponent';
import { useState } from 'react';

const ChartContainer = ({ data }) => {
	const [barChart, setBarChart] = useState(true);
	return (
		<div className='flex flex-col items-center '>
			<h2 className='m-0 p-0'>Monthly Applications</h2>
			<button
				className='text-[--primary-color] text-bold text-lg mt-2 rounded-lg border-b border-[--primary-color] px-5 shadow'
				onClick={() => setBarChart(!barChart)}
			>
				{barChart ? 'Area Chart' : 'Bar Chart'}
			</button>
			{barChart ? <BarChart data={data} /> : <AreaChart data={data} />}
		</div>
	);
};

export default ChartContainer;
