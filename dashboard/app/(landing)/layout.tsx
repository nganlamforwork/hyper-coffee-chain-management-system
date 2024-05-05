import type { Metadata } from 'next';
import { Navbar } from './_components/navbar';

export const metadata: Metadata = {
	title: 'ZapyAI - ZapyGames',
	description: 'Landing page of ZapyAI',
};

interface LandingPageLayoutProps {
	children: React.ReactNode;
}

export default function LandingPageLayout({
	children,
}: LandingPageLayoutProps) {
	return (
		<div className='h-full'>
			<Navbar />
			<main className='h-full pt-40'>{children}</main>
		</div>
	);
}
