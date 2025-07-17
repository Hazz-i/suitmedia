import { useState, useEffect } from 'react';

// Header Component
const Header = () => {
	const [isVisible, setIsVisible] = useState(true);
	const [lastScrollY, setLastScrollY] = useState(0);
	const [activeMenu, setActiveMenu] = useState('Ideas');

	useEffect(() => {
		const handleScroll = () => {
			const currentScrollY = window.scrollY;

			if (currentScrollY > lastScrollY && currentScrollY > 100) {
				setIsVisible(false);
			} else {
				setIsVisible(true);
			}

			setLastScrollY(currentScrollY);
		};

		window.addEventListener('scroll', handleScroll, { passive: true });
		return () => window.removeEventListener('scroll', handleScroll);
	}, [lastScrollY]);

	const menuItems = ['Work', 'About', 'Services', 'Ideas', 'Careers', 'Contact'];

	return (
		<header
			className={`fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ${
				isVisible ? 'translate-y-0' : '-translate-y-full'
			} ${lastScrollY > 50 ? 'bg-orange-500/70 backdrop-blur-sm' : 'bg-orange-500'}`}
		>
			<div className='container mx-auto py-7 flex items-center justify-between'>
				<div className='flex items-center'>
					<span className='text-white font-semibold text-xl'>Suitmedia</span>
				</div>
				<nav className='hidden md:flex space-x-8'>
					{menuItems.map((item) => (
						<button
							key={item}
							onClick={() => setActiveMenu(item)}
							className={`text-white hover:text-orange-200 transition-colors ${
								activeMenu === item ? 'border-b-2 border-white pb-1' : ''
							}`}
						>
							{item}
						</button>
					))}
				</nav>
			</div>
		</header>
	);
};

export default Header;
