import logo from '../assets/images/logo.png';

const Logo = () => {
	return (
		<div className='flex gap-1 items-center h-20'>
			<img src={logo} alt='kerja-id-logo' className='w-12 rounded-lg' />
			<h1 className='text-[--primary-color] font-bold ABeeZee m-0'>Kerja.id</h1>
		</div>
	);
};

export default Logo;
