import axios from 'axios';
import { useState, useEffect } from 'react';
import type { Post, ApiResponse } from './utils/types';
import { getApiUrl } from './utils/api';
import PostCard from './components/PostCard';
import Header from './components/Header';
import Banner from './components/Banner';
import Pagination from './components/Paginations';

// Main App Component
function App() {
	const [posts, setPosts] = useState<Post[]>([]);
	const [loading, setLoading] = useState(true);
	const [initialized, setInitialized] = useState(false);

	// Initialize state from URL params
	const urlParams = new URLSearchParams(window.location.search);
	const [currentPage, setCurrentPage] = useState(() => parseInt(urlParams.get('page') || '1'));
	const [pageSize, setPageSize] = useState(() => parseInt(urlParams.get('size') || '10'));
	const [sortOrder, setSortOrder] = useState(() => urlParams.get('sort') || '-published_at');
	const [totalPages, setTotalPages] = useState(1);
	const [totalItems, setTotalItems] = useState(0);

	// Mark as initialized after component mounts
	useEffect(() => {
		setInitialized(true);
	}, []);

	// Update URL when state changes
	useEffect(() => {
		const urlParams = new URLSearchParams();
		urlParams.set('page', currentPage.toString());
		urlParams.set('size', pageSize.toString());
		urlParams.set('sort', sortOrder);

		const newUrl = `${window.location.pathname}?${urlParams.toString()}`;
		window.history.replaceState({}, '', newUrl);
	}, [currentPage, pageSize, sortOrder]);

	// Fetch posts
	const fetchPosts = async () => {
		try {
			setLoading(true);
			const response = await axios.get<ApiResponse>(getApiUrl('/api/ideas'), {
				params: {
					'page[number]': currentPage,
					'page[size]': pageSize,
					'append[]': ['small_image', 'medium_image'],
					sort: sortOrder,
				},
			});

			setPosts(response.data.data);
			setTotalPages(response.data.meta.last_page);
			setTotalItems(response.data.meta.total);
		} catch (error) {
			console.error('Error fetching posts:', error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		// Only fetch posts after initialization is complete
		if (initialized) {
			fetchPosts();
		}
	}, [initialized, currentPage, pageSize, sortOrder]);

	const handleSortChange = (newSortOrder: string) => {
		setSortOrder(newSortOrder);
		setCurrentPage(1);
	};

	const handlePageSizeChange = (newPageSize: number) => {
		setPageSize(newPageSize);
		setCurrentPage(1);
	};

	const handlePageChange = (page: number) => {
		setCurrentPage(page);
		window.scrollTo({ top: 0, behavior: 'smooth' });
	};

	const startItem = (currentPage - 1) * pageSize + 1;
	const endItem = Math.min(currentPage * pageSize, totalItems);

	return (
		<div className='min-h-screen bg-gray-50'>
			<Header />
			<main>
				<Banner />

				<section className='container mx-auto px-4 py-12'>
					{/* Controls */}
					<div className='flex flex-col md:flex-row justify-between items-start md:items-center mb-8 space-y-4 md:space-y-0'>
						<div className='text-sm text-gray-600'>
							Showing {startItem} - {endItem} of {totalItems}
						</div>

						<div className='flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4'>
							<div className='flex items-center space-x-2'>
								<label className='text-sm text-gray-600'>Show per page:</label>
								<select
									value={pageSize}
									onChange={(e) => handlePageSizeChange(Number(e.target.value))}
									className='border border-gray-300 cursor-pointer rounded-full w-[6rem] px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500'
								>
									<option value={10}>10</option>
									<option value={20}>20</option>
									<option value={50}>50</option>
								</select>
							</div>

							<div className='flex items-center space-x-2'>
								<label className='text-sm text-gray-600'>Sort by:</label>
								<select
									value={sortOrder}
									onChange={(e) => handleSortChange(e.target.value)}
									className='border border-gray-300 cursor-pointer rounded-full w-[8rem] px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500'
								>
									<option value='-published_at'>Newest</option>
									<option value='published_at'>Oldest</option>
								</select>
							</div>
						</div>
					</div>

					{/* Posts Grid */}
					{loading ? (
						<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
							{Array.from({ length: pageSize }).map((_, index) => (
								<div
									key={index}
									className='bg-white rounded-lg shadow-md overflow-hidden animate-pulse'
								>
									<div className='aspect-[4/3] bg-gray-300'></div>
									<div className='p-4'>
										<div className='h-4 bg-gray-300 rounded mb-2'></div>
										<div className='h-4 bg-gray-300 rounded w-3/4'></div>
									</div>
								</div>
							))}
						</div>
					) : (
						<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
							{posts.map((post) => (
								<PostCard key={post.id} post={post} />
							))}
						</div>
					)}

					{/* Pagination */}
					{!loading && totalPages > 1 && (
						<Pagination
							currentPage={currentPage}
							totalPages={totalPages}
							onPageChange={handlePageChange}
						/>
					)}
				</section>
			</main>
		</div>
	);
}

export default App;
