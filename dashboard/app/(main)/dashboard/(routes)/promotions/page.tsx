'use client';

import { Button } from '@/components/ui/button';
import { Heading } from '@/components/global/heading';
import { Separator } from '@/components/ui/separator';
import { Plus, Tag } from 'lucide-react';
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@/components/ui/sheet';
import CreatePromotionForm from './_components/create-promotion-form';
import { PromotionTable } from '@/components/tables/promotion-tables/promotion-table';
import { columns } from '@/components/tables/promotion-tables/column';
import { usePromotions } from '@/server/promotion/queries';

const PromotionsPage = () => {
	const { data: promotions } = usePromotions();
	const totalPromotions = promotions ? promotions.length : 0;
	return (
		<div>
			<Sheet>
				<div className='flex-1 space-y-4  p-4 md:p-8 pt-6'>
					<div className='flex items-start justify-between'>
						<Heading
							title={`Promotions (${totalPromotions})`}
							description='Manage all promotions campaigns.'
							icon={Tag}
						/>
						<SheetTrigger asChild>
							<Button>
								<Plus className='mr-2 h-4 w-4' /> Add Promotion
							</Button>
						</SheetTrigger>
						<SheetContent className='sm:max-w-2xl'>
							<SheetHeader>
								<SheetTitle>
									Create new promotion campaign
								</SheetTitle>
								<SheetDescription>
									Fill in all the information below.
								</SheetDescription>
							</SheetHeader>
							<CreatePromotionForm />
						</SheetContent>
					</div>
					<Separator />

					<PromotionTable columns={columns} data={promotions || []} />
				</div>
			</Sheet>
		</div>
	);
};

export default PromotionsPage;
