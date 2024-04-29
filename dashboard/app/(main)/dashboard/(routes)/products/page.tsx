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
import { ProductTable } from '@/components/tables/product-tables/product-table';
import { columns } from '@/components/tables/product-tables/column';
import CreateProductForm from './_components/create-product-form';

const ProductsPage = () => {
	const products: any = [];
	const totalProducts = 10;

	return (
		<div>
			<Sheet>
				<div className='flex-1 space-y-4  p-4 md:p-8 pt-6'>
					<div className='flex items-start justify-between'>
						<Heading
							title={`Products (${totalProducts})`}
							description='Manage all products.'
							icon={Coffee}
						/>
						<SheetTrigger asChild>
							<Button>
								<Plus className='mr-2 h-4 w-4' /> Add Product
							</Button>
						</SheetTrigger>
						<SheetContent className='sm:max-w-2xl'>
							<SheetHeader>
								<SheetTitle>Create new product</SheetTitle>
								<SheetDescription>
									Fill in all the information below.
								</SheetDescription>
							</SheetHeader>
							<CreateProductForm />
						</SheetContent>
					</div>
					<Separator />

					<ProductTable columns={columns} data={products || []} />
				</div>
			</Sheet>
		</div>
	);
};

export default ProductsPage;
