'use client';

import { useAuth } from '@/providers/auth-provider';
import AdminDashboard from './admin-dashboard';
import StaffDashboard from './staff-dashboard';
import SwitchboardStaffDashboard from './sb-staff-dashboard';

export default function DashboardPage() {
	const { user } = useAuth();
	return (
		<div>
			{user && (
				<>
					{user.role === 'ADMIN' && <AdminDashboard />}
					{user.role === 'STAFF' && <StaffDashboard />}
					{user.role === 'SWITCH_BOARD_STAFF' && (
						<SwitchboardStaffDashboard />
					)}
				</>
			)}
		</div>
	);
}
