'use client';

import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useCategories } from '@/server/category/queries';
import { Category } from '@/types/product';
import { Dispatch, SetStateAction } from 'react';

interface CategoryListProps {
	setSelectedCategory: Dispatch<SetStateAction<string>>;
}

export const CategoryList = ({ setSelectedCategory }: CategoryListProps) => {
	const { data: categories } = useCategories();

	if (categories === undefined) {
		return (
			<div className='flex flex-col gap-4'>
				<Skeleton className='bg-yellow-900/20 rounded-md w-full h-10' />
				<Skeleton className='bg-yellow-900/20 rounded-md w-full h-10' />
				<Skeleton className='bg-yellow-900/20 rounded-md w-full h-10' />
				<Skeleton className='bg-yellow-900/20 rounded-md w-full h-10' />
				<Skeleton className='bg-yellow-900/20 rounded-md w-full h-10' />
			</div>
		);
	}

	return (
		<Tabs
			defaultValue=''
			onValueChange={(value) => setSelectedCategory(value)}
		>
			<TabsList className='flex flex-col gap-4 w-full h-full items-start rounded-none bg-transparent p-0'>
				<TabsTrigger
					value=''
					className='p-3 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:bg-yellow-900/20 justify-start w-full rounded-md data-[state=active]:text-foreground data-[state=active]:shadow-none'
				>
					All
				</TabsTrigger>
				{categories.map((cate: Category) => (
					<TabsTrigger
						key={cate.id}
						value={cate.id as string}
						className='p-3 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:bg-yellow-900/20 justify-start w-full rounded-md data-[state=active]:text-foreground data-[state=active]:shadow-none'
					>
						{cate.name}
					</TabsTrigger>
				))}
			</TabsList>
		</Tabs>
	);
};
