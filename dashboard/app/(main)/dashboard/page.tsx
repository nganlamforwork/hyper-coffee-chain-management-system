'use client';

import { useAuth } from '@/providers/auth-provider';
import AdminDashboard from './admin-dashboard';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
	const { user } = useAuth();
	const router = useRouter();

	if (user && (user.role === 'SWITCH_BOARD_STAFF' || user.role === 'STAFF')) {
		router.push('/dashboard/orders');
		return null;
	}
	return (
		<div>{user && <>{user.role === 'ADMIN' && <AdminDashboard />}</>}</div>
	);
}
