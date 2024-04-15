'use client';

import { useScrollTop } from '@/hooks/use-scroll-top';
import { Logo } from './logo';
import { useState } from 'react';
import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuList,
} from '@/components/ui/navigation-menu';
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@/components/ui/sheet';

import { buttonVariants } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import { ModeToggle } from '@/components/global/mode-toggle';
import { cn } from '@/lib/utils';
import Link from 'next/link';

interface RouteProps {
	href: string;
	label: string;
}

const routeList: RouteProps[] = [
	{
		href: '#features',
		label: 'Features',
	},
	{
		href: '#testimonials',
		label: 'Testimonials',
	},
	{
		href: '#pricing',
		label: 'Pricing',
	},
	{
		href: '#faq',
		label: 'FAQ',
	},
];
export const Navbar = () => {
	const scrolled = useScrollTop();
	const [isOpen, setIsOpen] = useState<boolean>(false);

	return (
		<header
			className={cn(
				'top-0 z-40 w-full p-2 sticky',
				scrolled && 'border-b shadow-sm'
			)}
		>
			<NavigationMenu className='mx-auto'>
				<NavigationMenuList className='container h-14 px-4 w-screen flex justify-between '>
					<NavigationMenuItem className='font-bold flex'>
						<Logo />
					</NavigationMenuItem>

					{/* mobile */}
					<div className='flex md:hidden'>
						<ModeToggle />

						<Sheet open={isOpen} onOpenChange={setIsOpen}>
							<SheetTrigger className='px-2'>
								<Menu
									className='flex md:hidden h-5 w-5'
									onClick={() => setIsOpen(true)}
								/>
							</SheetTrigger>

							<SheetContent side={'left'}>
								<SheetHeader>
									<SheetTitle className='font-bold text-xl'>
										HydraAI
									</SheetTitle>
								</SheetHeader>
								<nav className='flex flex-col justify-center items-center gap-2 mt-4'>
									{routeList.map(
										({ href, label }: RouteProps) => (
											<a
												key={label}
												href={href}
												onClick={() => setIsOpen(false)}
												className={buttonVariants({
													variant: 'ghost',
												})}
											>
												{label}
											</a>
										)
									)}
								</nav>
							</SheetContent>
						</Sheet>
					</div>

					{/* desktop */}
					<nav className='hidden md:flex gap-2'>
						{routeList.map((route: RouteProps, i) => (
							<a
								href={route.href}
								key={i}
								className={`text-[17px] ${buttonVariants({
									variant: 'ghost',
								})}`}
							>
								{route.label}
							</a>
						))}
					</nav>
					<div className='hidden md:flex gap-4'>
						<ModeToggle />
						<Link
							href='/auth/login'
							className='bg-primary p-2 px-4 rounded-md hover:bg-primary/80 text-white'
						>
							Login
						</Link>
					</div>
				</NavigationMenuList>
			</NavigationMenu>
		</header>
	);
};
