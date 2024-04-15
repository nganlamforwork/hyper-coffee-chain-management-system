import { Icons } from '@/components/global/icons';

export interface NavItem {
	href: string;
	icon: keyof typeof Icons;
	label: string;
	description?: string;
}

export interface NavItemWithChildren extends NavItem {
	items: NavItemWithChildren[];
}

export interface NavItemWithOptionalChildren extends NavItem {
	items?: NavItemWithChildren[];
}

export interface FooterItem {
	title: string;
	items: {
		title: string;
		href: string;
		external?: boolean;
	}[];
}

export type MainNavItem = NavItemWithOptionalChildren;

export type SidebarNavItem = NavItemWithChildren;
