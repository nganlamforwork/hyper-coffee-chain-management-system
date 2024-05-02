import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User } from '@/types/user';

interface UserProfileProps {
	user: User;
}

const UserProfile = ({ user }: UserProfileProps) => {
	return (
		<div className='flex items-center gap-4'>
			<Avatar className='hidden h-9 w-9 sm:flex'>
				<AvatarImage src={user?.image!} alt='Avatar' />
				<AvatarFallback>{user?.name?.slice(0, 2)}</AvatarFallback>
			</Avatar>
			<div className='flex flex-col items-start'>
				<p className='text-sm font-medium leading-none'>{user?.name}</p>
				<p className='text-sm text-muted-foreground truncate'>
					{user?.phone}
				</p>
			</div>
		</div>
	);
};

export default UserProfile;
