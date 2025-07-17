import { useEffect, useRef } from 'react';

// Banner Component
const Banner = () => {
	const bannerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleScroll = () => {
			if (bannerRef.current) {
				const scrolled = window.pageYOffset;
				const parallax = scrolled * 0.5;
				bannerRef.current.style.transform = `translateY(${parallax}px)`;
			}
		};

		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	return (
		<section className='relative h-[40rem] overflow-hidden'>
			<div
				ref={bannerRef}
				className='absolute inset-0 bg-cover bg-center bg-no-repeat'
				style={{
					backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url('https://images.unsplash.com/photo-1523800378286-dae1f0dae656?q=80&w=1376&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D;base64,${btoa(
						'<svg width="1200" height="400" xmlns="http://www.w3.org/2000/svg"><defs><pattern id="sketch" patternUnits="userSpaceOnUse" width="100" height="100"><path d="M10,10 Q50,5 90,10 Q85,50 90,90 Q50,95 10,90 Q15,50 10,10" fill="none" stroke="#666" stroke-width="1" opacity="0.3"/><circle cx="25" cy="25" r="3" fill="#666" opacity="0.2"/><path d="M70,20 L85,35 L70,50 L55,35 Z" fill="none" stroke="#666" stroke-width="1" opacity="0.3"/></pattern></defs><rect width="1200" height="400" fill="#f5f5f5"/><rect width="1200" height="400" fill="url(#sketch)"/></svg>'
					)}`,
				}}
			>
				<div className='absolute inset-0 flex items-center justify-center bg-gradient-to-b from-gray-400/20 to-gray-600/30'>
					<div className='text-center text-white'>
						<h1 className='text-6xl font-light mb-2 tracking-wide'>Ideas</h1>
						<p className='text-lg font-light tracking-wide opacity-80'>
							Where all our great things begin
						</p>
					</div>
				</div>
			</div>

			{/* Diagonal cut at the bottom */}
			<div className='absolute bottom-0 left-0 w-full h-[20rem] bg-white transform -skew-y-9 origin-bottom-left translate-y-80'></div>
		</section>
	);
};

export default Banner;
