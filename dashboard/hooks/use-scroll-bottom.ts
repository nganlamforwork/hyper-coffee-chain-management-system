import { useState, useEffect } from 'react';

export const useScrollBottom = (threshold = 100) => {
	const [scrolled, setScrolled] = useState(false);

	// Attach scroll event listener
	useEffect(() => {
		const handleScroll = () => {
			if (
				window.scrollY > threshold &&
				window.scrollY < document.body.scrollHeight - window.innerHeight
			) {
				setScrolled(true);
			} else {
				setScrolled(false);
			}
		};
		window.addEventListener('scroll', handleScroll);
		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, [threshold]);

	return scrolled;
};
