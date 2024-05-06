import { Button } from '@/components/ui/button';
import { MailIcon } from 'lucide-react';
import Link from 'next/link';

export const Heroes = () => {
	return (
		<div className='max-w-3xl space-y-8'>
			<div className='flex flex-col gap-4'>
				<h1 className='text-3xl sm:text-5xl md:text-6xl font-bold'>
					Your Shop and Managements here. Welcome to{' '}
					<span className='underline'>HyperCoffee</span>
				</h1>
				<h3 className='text-base sm:text-xl md:text-2xl font-medium'>
					HyperCoffee is the dashboard where <br />
					better, faster work happens.
				</h3>
			</div>
			<div className='space-y-4 md:space-y-0 md:space-x-4'>
				<Button className='w-full md:w-1/3' asChild>
					<Link href='/auth/login'>Get Started</Link>
				</Button>
				<Button className='w-full md:w-1/3' variant='secondary'>
					Contact us
					<MailIcon className='h-4 w-4 ml-2' />
				</Button>
			</div>
		</div>
	);
};
