import { HiChevronDoubleLeft, HiChevronDoubleRight } from 'react-icons/hi';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAllJobsContext } from '../pages/AllJobs';

const PaginationContainer = () => {
	const {
		data: { numberOfPages, currentPage },
	} = useAllJobsContext();

	const { search, pathname } = useLocation();
	const navigate = useNavigate();

	const handlePageChange = (pageNumber) => {
		const searchParams = new URLSearchParams(search);
		searchParams.set('page', pageNumber);
		navigate(`${pathname}?${searchParams.toString()}`);
	};

	const addPageButton = ({ pageNumber, activeClass }) => {
		return (
			<button
				key={pageNumber}
				className={`bg-white text-[--primary-color] rounded px-[14px] py-1 ${
					activeClass && 'active-button'
				}`}
				onClick={() => handlePageChange(pageNumber)}
			>
				{pageNumber}
			</button>
		);
	};

	const renderPageButtons = () => {
		const pageButtons = [];
		//first page
		pageButtons.push(
			addPageButton({ pageNumber: 1, activeClass: currentPage === 1 })
		);
		// Dots before
		if (currentPage > 3) {
			pageButtons.push(
				<span
					className='bg-white text-[--primary-color] rounded px-[14px] py-1'
					key={`dots-before-${currentPage}`}
				>
					...
				</span>
			);
		}
		//One page before
		if (currentPage !== 1 && currentPage !== 2) {
			pageButtons.push(
				addPageButton({ pageNumber: currentPage - 1, activeClass: false })
			);
		}

		//Current page
		if (currentPage !== 1 && currentPage !== numberOfPages) {
			pageButtons.push(
				addPageButton({ pageNumber: currentPage, activeClass: true })
			);
		}

		//One page after
		if (currentPage !== numberOfPages && currentPage !== numberOfPages - 1) {
			pageButtons.push(
				addPageButton({ pageNumber: currentPage + 1, activeClass: false })
			);
		}

		// Dots after
		if (currentPage < numberOfPages - 2) {
			pageButtons.push(
				<span
					className='bg-white text-[--primary-color] rounded px-[14px] py-1'
					key={`dots-after-${currentPage}`}
				>
					...
				</span>
			);
		}

		//last page
		pageButtons.push(
			addPageButton({
				pageNumber: numberOfPages,
				activeClass: currentPage === numberOfPages,
			})
		);

		return pageButtons;
	};

	return (
		<div className='flex gap-3 justify-between w-full md:w-auto md:justify-evenly '>
			<button
				className='flex gap-1 items-center bg-[--primary-color] text-white rounded px-3 py-1'
				onClick={() => {
					let prevPage = currentPage - 1;
					if (prevPage < 1) prevPage = numberOfPages;
					handlePageChange(prevPage);
				}}
			>
				<HiChevronDoubleLeft />
				Prev
			</button>
			<div className='hidden md:flex md:gap-1 '>{renderPageButtons()}</div>
			<button
				className='flex gap-1 items-center bg-[--primary-color] text-white rounded px-3 py-1'
				onClick={() => {
					let nextPage = currentPage + 1;
					if (nextPage > numberOfPages) nextPage = 1;
					handlePageChange(nextPage);
				}}
			>
				Next
				<HiChevronDoubleRight />
			</button>
		</div>
	);
};

export default PaginationContainer;
