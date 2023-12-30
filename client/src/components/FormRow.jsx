const FormRow = ({ type, name, labelText, defaultValue, onChange }) => {
	return (
		<div className='mb-4'>
			<label className='block text-gray-700 text-sm mb-2' htmlFor={name}>
				{labelText || name}
			</label>
			<input
				className='shadow appearance-none border rounded w-full py-[10px] px-3 text-gray-700 leading-tight focus:outline-[--primary-color] focus:shadow-outline'
				id={name}
				name={name}
				type={type}
				defaultValue={defaultValue || ''}
				onChange={onChange}
				required
			/>
		</div>
	);
};

export default FormRow;
