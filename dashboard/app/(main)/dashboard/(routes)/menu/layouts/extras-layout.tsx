'use client';

import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@/components/ui/sheet';
import CreateExtraForm from '../_components/create-extra-form';
import ExtrasTable from '../_components/extras-table';
import { useExtraGroups } from '@/server/extra/queries';

const ExtrasLayout = () => {
	const { data: extraGroups } = useExtraGroups();
	return (
		<Sheet>
			<div className='flex-1 space-y-4  p-4 md:p-8 pt-6'>
				<SheetTrigger asChild>
					<Button
						variant='outline'
						className='rounded-full border-blue-500 border-2'
					>
						<PlusCircle className='h-4 w-4 mr-2' />
						Create New Extra Group
					</Button>
				</SheetTrigger>
				<SheetContent className='sm:max-w-lg overflow-auto'>
					<SheetHeader>
						<SheetTitle>Create new extra group</SheetTitle>
						<SheetDescription>
							Fill in all the information below.
						</SheetDescription>
					</SheetHeader>
					<CreateExtraForm />
				</SheetContent>
			</div>
			<ExtrasTable extraGroups={extraGroups} />
		</Sheet>
	);
};

export default ExtrasLayout;
