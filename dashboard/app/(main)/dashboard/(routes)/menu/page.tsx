import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ProductLayout from './layouts/product-layout';
import ExtrasLayout from './layouts/extras-layout';

const MenuPage = () => {
	return (
		<div className='flex-1 space-y-4 p-4 md:p-8 pt-6'>
			<Tabs defaultValue='products' className='space-y-4'>
				<TabsList className='grid w-[400px] grid-cols-2 justify-start rounded-none border-b bg-transparent p-0'>
					<TabsTrigger
						value='products'
						className='relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none'
					>
						MENU OVERVIEW
					</TabsTrigger>
					<TabsTrigger
						value='options'
						className='relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none'
					>
						OPTION GROUPS
					</TabsTrigger>
				</TabsList>
				<TabsContent value='products'>
					<ProductLayout />
				</TabsContent>
				<TabsContent value='options'>
					<ExtrasLayout />
				</TabsContent>
			</Tabs>
		</div>
	);
};

export default MenuPage;
