import React from 'react';

const FormRowSelection = ({
	name,
	labelText,
	list,
	defaultValue = '',
	onChange,
}) => {
	return (
		<div className='mb-4'>
			<label className='block text-gray-700 text-sm mb-2' htmlFor={name}>
				{labelText}
			</label>
			<select
				name={name}
				id={name}
				defaultValue={defaultValue}
				className='shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-[--primary-color] focus:shadow-outline capitalize'
				onChange={onChange}
			>
				{Object.values(list).map((listItem) => (
					<option key={listItem} value={listItem} className='capitalize'>
						{listItem}
					</option>
				))}
			</select>
		</div>
	);
};

export default FormRowSelection;
