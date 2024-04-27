'use client';

import { Loader } from '@/components/global/loader';
import { Button } from '@/components/ui/button';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { useUpdateAccount } from '@/server/actions/users/mutations';
import { USER_ROLE, User } from '@/types/user';
import { useState } from 'react';
import { toast } from 'sonner';

interface RoleSelectionProps {
	account: User;
}

export const RoleSelection = ({ account }: RoleSelectionProps) => {
	const [newRole, setNewRole] = useState<string | undefined>(undefined);
	const updateRole = useUpdateAccount();
	const handleChangeRole = async () => {
		try {
			await updateRole.mutateAsync({
				...account,
				role: newRole as USER_ROLE,
			});
			toast.success('Update role successfully');
		} catch (error) {
			console.error('Error deleting account:', error);
			toast.error('Error deleting account:');
		}
	};
	return (
		<div className='flex gap-4 flex-col mt-4'>
			<Select
				defaultValue={account.role}
				onValueChange={(value: string) => setNewRole(value)}
			>
				<SelectTrigger className='w-full'>
					<SelectValue placeholder='Select a fruit' />
				</SelectTrigger>
				<SelectContent>
					<SelectItem value='ADMIN'>ADMIN</SelectItem>
					<SelectItem value='STAFF'>STAFF</SelectItem>
					<SelectItem value='SWITCH_BOARD_STAFF'>
						SWITCH_BOARD_STAFF
					</SelectItem>
					<SelectItem value='USER'>USER</SelectItem>
				</SelectContent>
			</Select>
			<div className='self-end'>
				<Button
					disabled={updateRole.isPending}
					onClick={handleChangeRole}
				>
					{updateRole.isPending && (
						<Loader className='h-4 w-4 mr-2' />
					)}
					Change role
				</Button>
			</div>
		</div>
	);
};
