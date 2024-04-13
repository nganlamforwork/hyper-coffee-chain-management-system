import { Button } from '@/components/ui/button';
import Link from 'next/link';

export const Footer = () => {
	return (
		<footer className='fixed bottom-0 left-0 right-0 supports-backdrop-blur:bg-background/60 bg-background/95 backdrop-blur z-20'>
			<div className='md:max-w-screen-2xl mx-auto flex md:flex-row flex-col items-center w-full md:justify-around md:p-6 p-4 justify-center gap-2'>
				<p className='md:text-sm text-xs text-center'>
					Copyright © {new Date().getFullYear()} HyperStack, Inc. All
					Rights Reserved.
				</p>
				<div className='space-x-4 md:w-auto flex items-center md:justify-between w-full justify-center'>
					<Button size='sm' variant='link' asChild>
						<Link href='/' className='md:text-sm text-xs'>
							Privacy Policy
						</Link>
					</Button>
					<Button size='sm' variant='link' asChild>
						<Link href='/' className='md:text-sm text-xs'>
							Terms of Service
						</Link>
					</Button>
				</div>
			</div>
		</footer>
	);
};
