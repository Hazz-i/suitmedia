import { useState } from 'react';
import type { Post } from '../utils/types';
import { getAssetUrl } from '../utils/api';

// Post Card Component
const PostCard = ({ post }: { post: Post }) => {
	const [imageLoaded, setImageLoaded] = useState(false);
	const [imageError, setImageError] = useState(false);

	const getImageUrl = () => {
		// Check if small_image exists and has items
		if (post.small_image && post.small_image.length > 0) {
			const url = post.small_image[0].url;
			// Extract path and use getAssetUrl helper
			const path = url.replace('https://assets.suitdev.com', '');
			return getAssetUrl(path);
		}
		// Check if medium_image exists and has items
		if (post.medium_image && post.medium_image.length > 0) {
			const url = post.medium_image[0].url;
			// Extract path and use getAssetUrl helper
			const path = url.replace('https://assets.suitdev.com', '');
			return getAssetUrl(path);
		}
		return null;
	};

	const imageUrl = getImageUrl();

	return (
		<div className='bg-white rounded-lg shadow-md overflow-hidden'>
			<div className='aspect-[4/3] bg-gray-200 relative overflow-hidden'>
				{!imageError && imageUrl && (
					<img
						src={imageUrl}
						alt={post.title}
						className={`w-full h-full object-cover transition-opacity duration-300 ${
							imageLoaded ? 'opacity-100' : 'opacity-0'
						}`}
						onLoad={() => setImageLoaded(true)}
						onError={() => setImageError(true)}
						loading='lazy'
					/>
				)}
				{(imageError || !imageUrl) && (
					<div className='w-full h-full flex items-center justify-center bg-gray-300'>
						<span className='text-gray-500'>Image not available</span>
					</div>
				)}
			</div>
			<div className='p-4'>
				<time className='text-sm text-gray-500'>
					{new Date(post.published_at).toLocaleDateString('en-US', {
						year: 'numeric',
						month: 'long',
						day: 'numeric',
					})}
				</time>
				<h3 className='mt-2 font-semibold text-gray-900 line-clamp-3'>{post.title}</h3>
			</div>
		</div>
	);
};

export default PostCard;
