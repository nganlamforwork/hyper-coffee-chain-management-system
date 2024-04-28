'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Poppins } from 'next/font/google';
import { useTheme } from 'next-themes'; // Assuming you're using next-themes for theme management

import { cn } from '@/lib/utils';
import Link from 'next/link';

const font = Poppins({
	subsets: ['latin'],
	weight: ['400', '600'],
});

export const Logo = () => {
	const { theme } = useTheme();
	const [logoSrc, setLogoSrc] = useState('/logo-light.svg');
	const [logoAlt, setLogoAlt] = useState('ZapyAI Logo');

	useEffect(() => {
		if (theme === 'dark') {
			setLogoSrc('/logo-dark.svg');
			setLogoAlt('Dark Logo');
		} else {
			setLogoSrc('/logo-light.svg');
			setLogoAlt('Light Logo');
		}
	}, [theme]);

	return (
		<Link className='flex items-center gap-2' href='/' passHref>
			<Image src={logoSrc} height={40} width={40} alt={logoAlt} />
			<p className={cn('font-semibold text-2xl', font.className)}>
				HyperCoffee.
			</p>
		</Link>
	);
};
