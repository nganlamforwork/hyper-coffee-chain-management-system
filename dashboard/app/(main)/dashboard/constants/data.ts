import { NavItem } from '@/types';

export const navItems: NavItem[] = [
	{
		href: '/dashboard',
		icon: 'dashboard',
		label: 'Dashboard',
		permissions: ['ADMIN'],
	},
	{
		href: '/dashboard/categories',
		icon: 'list',
		label: 'Categories',
		permissions: ['ADMIN'],
	},
	{
		href: '/dashboard/products',
		icon: 'coffee',
		label: 'Products',
		permissions: ['ADMIN'],
	},
	{
		href: '/dashboard/orders',
		icon: 'package',
		label: 'Orders',
		permissions: ['ADMIN', 'STAFF', 'SWITCH_BOARD_STAFF'],
	},
	{
		href: '/dashboard/employee',
		icon: 'employee',
		label: 'Employee',
		permissions: ['ADMIN'],
	},
	{
		href: '/dashboard/customers',
		icon: 'user',
		label: 'Customers',
		permissions: ['ADMIN'],
	},
	{
		href: '/dashboard/promotions',
		icon: 'tag',
		label: 'Promotions',
		permissions: ['ADMIN'],
	},
	{
		href: '/dashboard/settings',
		icon: 'settings',
		label: 'Settings',
		permissions: ['ADMIN', 'STAFF', 'SWITCH_BOARD_STAFF'],
	},
];
