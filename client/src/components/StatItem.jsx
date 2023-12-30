const StatItem = ({ count, title, icon, textColor, bgColor, borderColor }) => {
	return (
		<div className='flex flex-col rounded-lg shadow-md bg-white'>
			<div className='flex w-full justify-between p-3'>
				<span className={`${textColor} text-5xl font-bold `}>{count}</span>
				<div
					className={`w-12 h-12 flex justify-center items-center text-2xl rounded-lg ${bgColor} ${textColor}`}
				>
					{icon}
				</div>
			</div>
			<div className='flex w-full p-3'>
				<h5>{title}</h5>
			</div>
			<div className={`${borderColor} h-1 rounded-b-lg`}></div>
		</div>
	);
};

export default StatItem;
