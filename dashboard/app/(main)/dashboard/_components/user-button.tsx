import { Spinner } from '@/components/global/spinner';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useCurrentUser } from '@/hooks/use-current-user';
import { logout } from '@/server/actions/auth/logout';

const UserButton = () => {
	const user = useCurrentUser();
	const onClick = () => {
		logout();
	};

	return (
		<div>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					{user === undefined ? (
						<Spinner className='h-4 w-4' />
					) : (
						<Button
							variant='ghost'
							size='icon'
							className='overflow-hidden rounded-full'
						>
							<Avatar>
								<AvatarImage
									src={user?.image!}
									alt='User Image'
								/>
								<AvatarFallback>
									{user?.name?.slice(0, 2)}
								</AvatarFallback>
							</Avatar>
						</Button>
					)}
				</DropdownMenuTrigger>
				<DropdownMenuContent align='end' forceMount className='w-56'>
					<DropdownMenuLabel className='font-normal'>
						<div className='flex flex-col space-y-1'>
							<p className='text-sm font-medium leading-none'>
								{user?.name}
							</p>
							<p className='text-xs leading-none text-muted-foreground'>
								{user?.email}
							</p>
						</div>
					</DropdownMenuLabel>
					<DropdownMenuSeparator />
					<DropdownMenuItem>Settings</DropdownMenuItem>
					<DropdownMenuItem>Support</DropdownMenuItem>
					<DropdownMenuSeparator />
					<DropdownMenuItem onClick={onClick}>
						Logout
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	);
};

export default UserButton;
