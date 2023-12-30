import { Link, useRouteError } from "react-router-dom";
import NotFound from "../assets/images/not-found.svg";

const Error = () => {
  const error = useRouteError();

  if (error.status === 404) {
    return (
      <div className='h-screen flex flex-col justify-center items-center gap-3'>
        <img src={NotFound} alt='' className='w-1/4' />
        <h3 className='text-3xl font-semibold'>Opss! Page Not Found</h3>
        <p className='text-lg text-gray-500'>
          we can't seem to find the page you are looking for
        </p>
        <Link to='/dashboard' className='text-lg text-[--primary-color]'>
          Back Home
        </Link>
      </div>
    );
  }

  return (
    <div className='h-screen flex flex-col justify-center items-center gap-3'>
      <h3 className='text-4xl font-semibold'>Something went wrong</h3>
    </div>
  );
};

export default Error;
