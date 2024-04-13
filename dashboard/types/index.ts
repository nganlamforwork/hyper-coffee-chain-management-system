import { Icons } from '@/components/global/icons';
import { z } from 'zod';

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

export const AuthFormSchema = z.object({
	email: z.string().describe('Email').email({ message: 'Invalid Email' }),
	password: z.string().describe('Password').min(1, 'Password is required'),
});
