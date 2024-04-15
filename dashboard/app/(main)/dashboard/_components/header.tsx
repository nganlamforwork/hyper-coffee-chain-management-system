'use client';

import { cn } from '@/lib/utils';
import { MobileSidebar } from './mobile-sidebar';
import { ModeToggle } from '@/components/global/mode-toggle';
import UserButton from './user-button';

export default async function Header() {
	return (
		<div className='supports-backdrop-blur:bg-background/60 border-b bg-background/95 backdrop-blur p-5'>
			<nav className='flex items-center justify-between md:justify-end'>
				<div className={cn('block md:!hidden')}>
					<MobileSidebar />
				</div>
				<div className='flex items-center gap-4'>
					<ModeToggle />
					<UserButton />
				</div>
			</nav>
		</div>
	);
}
