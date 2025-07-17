const Pagination = ({
	currentPage,
	totalPages,
	onPageChange,
}: {
	currentPage: number;
	totalPages: number;
	onPageChange: (page: number) => void;
}) => {
	const getVisiblePages = () => {
		const visiblePages = [];
		const maxVisible = 5;
		let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
		let end = Math.min(totalPages, start + maxVisible - 1);

		if (end - start + 1 < maxVisible) {
			start = Math.max(1, end - maxVisible + 1);
		}

		for (let i = start; i <= end; i++) {
			visiblePages.push(i);
		}

		return visiblePages;
	};

	return (
		<div className='flex justify-center items-center space-x-2 mt-8'>
			{/* First page button */}
			<button
				onClick={() => onPageChange(1)}
				disabled={currentPage === 1}
				className='px-3 py-2 text-sm rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-200 hover:scale-120 animate ease-in-out duration-300 cursor-pointer'
				title='First page'
			>
				‹‹
			</button>

			{/* Previous page button */}
			<button
				onClick={() => onPageChange(currentPage - 1)}
				disabled={currentPage === 1}
				className='px-3 py-2 text-sm rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-200 hover:scale-120 animate ease-in-out duration-300 cursor-pointer'
				title='Previous page'
			>
				‹
			</button>

			{getVisiblePages().map((page) => (
				<button
					key={page}
					onClick={() => onPageChange(page)}
					className={`px-3 py-2 text-sm rounded-md ${
						currentPage === page
							? 'bg-orange-500 text-white border-orange-500'
							: 'hover:bg-gray-200 hover:scale-120 animate ease-in-out duration-300 cursor-pointer'
					}`}
				>
					{page}
				</button>
			))}

			{/* Next page button */}
			<button
				onClick={() => onPageChange(currentPage + 1)}
				disabled={currentPage === totalPages}
				className='px-3 py-2 text-sm rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-200 hover:scale-120 animate ease-in-out duration-300 cursor-pointer'
				title='Next page'
			>
				›
			</button>

			{/* Last page button */}
			<button
				onClick={() => onPageChange(totalPages)}
				disabled={currentPage === totalPages}
				className='px-3 py-2 text-sm rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-200 hover:scale-120 animate ease-in-out duration-300 cursor-pointer'
				title='Last page'
			>
				››
			</button>
		</div>
	);
};

export default Pagination;
