'use client';

import { Button } from '@/components/ui/button';
import { Heading } from '@/components/global/heading';
import { Separator } from '@/components/ui/separator';
import { Coffee, Plus } from 'lucide-react';
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@/components/ui/sheet';
import { CategoryTable } from '@/components/tables/category-tables/category-table';
import { columns } from '@/components/tables/category-tables/column';
import CreateCategoryForm from './_components/create-category-form';
import { useCategories } from '@/server/category/queries';

const CategoriesPage = () => {
	const { data: categories } = useCategories();
	const totalCategories = categories ? categories.length : 0;
	return (
		<div>
			<Sheet>
				<div className='flex-1 space-y-4  p-4 md:p-8 pt-6'>
					<div className='flex items-start justify-between'>
						<Heading
							title={`Categories (${totalCategories})`}
							description='Manage all categories.'
							icon={Coffee}
						/>
						<SheetTrigger asChild>
							<Button>
								<Plus className='mr-2 h-4 w-4' /> Add Category
							</Button>
						</SheetTrigger>
						<SheetContent className='sm:max-w-2xl'>
							<SheetHeader>
								<SheetTitle>Create new category</SheetTitle>
								<SheetDescription>
									Fill in all the information below.
								</SheetDescription>
							</SheetHeader>
							<CreateCategoryForm />
						</SheetContent>
					</div>
					<Separator />

					<CategoryTable columns={columns} data={categories || []} />
				</div>
			</Sheet>
		</div>
	);
};

export default CategoriesPage;
