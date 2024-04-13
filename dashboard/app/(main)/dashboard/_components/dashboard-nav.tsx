'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Icons } from '@/components/global/icons';
import { cn } from '@/lib/utils';
import { NavItem } from '@/types';
import { Dispatch, SetStateAction } from 'react';
import { Hint } from '@/components/global/hint';

interface DashboardNavProps {
	items: NavItem[];
	setOpen?: Dispatch<SetStateAction<boolean>>;
	isShowIconOnly?: boolean;
}

export function DashboardNav({
	items,
	setOpen,
	isShowIconOnly,
}: DashboardNavProps) {
	const pathname = usePathname();

	if (!items?.length) {
		return null;
	}
	return (
		<nav className='relative'>
			{items.map((item) => {
				const Icon = Icons[item.icon || 'arrowRight'];
				const isActive = item.href === pathname;
				return (
					<div
						className={cn(
							'relative flex cursor-default select-none items-center rounded-sm my-2 px-2 py-1.5 text-sm outline-none hover:bg-primary hover:text-white hover:font-bold',
							isActive && 'bg-primary text-white font-bold'
						)}
						key={item.label}
						onClick={() => {
							if (setOpen) setOpen(false);
						}}
					>
						<Hint label={item.label} side='right' sideOffset={15}>
							<Link
								href={item.href}
								className={cn(
									'flex items-center gap-2 hover:bg-transparent rounded-md transition-all md:w-full',
									isShowIconOnly && 'justify-center w-20 h-9'
								)}
							>
								<Icon
									className={cn(
										'h-4 w-4',
										!isShowIconOnly && 'mr-2'
									)}
								/>
								{!isShowIconOnly && <span>{item.label}</span>}
							</Link>
						</Hint>
					</div>
				);
			})}
		</nav>
	);
}
