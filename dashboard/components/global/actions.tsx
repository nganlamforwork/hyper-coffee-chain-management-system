'use client';

import { DropdownMenuContentProps } from '@radix-ui/react-dropdown-menu';
import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuItem,
} from '../ui/dropdown-menu';
import { Pencil, Trash2 } from 'lucide-react';
import { useRenameModal } from '@/hooks/use-rename-modal';
import { ConfirmModal } from '@/components/modals/confirm-modal';

interface ActionsProps {
	children: React.ReactNode;
	side?: DropdownMenuContentProps['side'];
	sideOffset?: DropdownMenuContentProps['sideOffset'];
	align?: DropdownMenuContentProps['align'];
	id: string;
	title: string;
	onDelete: () => void;
	deleteTitle: string;
	pending: boolean;
	width: string;
	renameType: string;
}

export const Actions = ({
	children,
	align,
	side,
	sideOffset,
	id,
	title,
	onDelete,
	deleteTitle,
	pending,
	width,
	renameType,
}: ActionsProps) => {
	const { onOpen } = useRenameModal();

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
			<DropdownMenuContent
				align={align}
				side={side}
				sideOffset={sideOffset}
				className={width}
				onClick={(e) => e.stopPropagation()}
			>
				<DropdownMenuItem
					className='p-3 cursor-pointer'
					onClick={() => onOpen(id, title, renameType)}
				>
					<Pencil className='h-4 w-4 mr-2' />
					Rename
				</DropdownMenuItem>
				<ConfirmModal
					header='Remove chat?'
					description='This will delete all conversations inside completely.'
					disabled={pending}
					onConfirm={onDelete}
				>
					<DropdownMenuItem
						className='p-3 cursor-pointer text-sm w-full justify-start font-normal'
						onSelect={(e) => e.preventDefault()}
					>
						<Trash2 className='h-4 w-4 mr-2' />
						Remove {deleteTitle}
					</DropdownMenuItem>
				</ConfirmModal>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};
