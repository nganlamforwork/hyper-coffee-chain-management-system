import Header from './_components/header';
import Sidebar from './_components/sidebar';

interface DashboardLayoutProps {
	children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
	return (
		<main className='flex overflow-hidden h-screen w-screen'>
			<div className='hidden h-full md:flex md:w-[320px] md:flex-col'>
				<Sidebar />
			</div>
			<div className='dark:boder-Neutrals-12/70 border-l-[1px] w-full relative overflow-auto'>
				<Header />
				{children}
			</div>
		</main>
	);
}
