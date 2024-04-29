'use client';

import { Button } from '@/components/ui/button';
import { Heading } from '@/components/global/heading';
import { Separator } from '@/components/ui/separator';
import { Package, Plus } from 'lucide-react';
import { columns } from '@/components/tables/employee-tables/column';
import { OrderTable } from '@/components/tables/order-tables/order-table';
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@/components/ui/sheet';
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const formSchema = z.object({
	username: z.string().min(2, {
		message: 'Username must be at least 2 characters.',
	}),
});

const OrdersPage = () => {
	const orders: any = [];
	const totalOrders = 10;

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			username: '',
		},
	});
	function onSubmit(values: z.infer<typeof formSchema>) {
		console.log(values);
	}

	return (
		<div>
			<Sheet>
				<div className='flex-1 space-y-4  p-4 md:p-8 pt-6'>
					<div className='flex items-start justify-between'>
						<Heading
							title={`Orders (${totalOrders})`}
							description='Manage all customer orders.'
							icon={Package}
						/>
						<SheetTrigger asChild>
							<Button>
								<Plus className='mr-2 h-4 w-4' /> Add New
							</Button>
						</SheetTrigger>
						<SheetContent className='sm:max-w-2xl'>
							<SheetHeader>
								<SheetTitle>Create new order</SheetTitle>
								<SheetDescription>
									Fill all information below.
								</SheetDescription>
							</SheetHeader>
							<div className='py-4'>
								<Form {...form}>
									<form
										onSubmit={form.handleSubmit(onSubmit)}
										className='space-y-8'
									>
										<FormField
											control={form.control}
											name='username'
											render={({ field }) => (
												<FormItem>
													<FormLabel>
														Username
													</FormLabel>
													<FormControl>
														<Input
															placeholder='shadcn'
															{...field}
														/>
													</FormControl>
													<FormDescription>
														This is your public
														display name.
													</FormDescription>
													<FormMessage />
												</FormItem>
											)}
										/>
										<Button type='submit'>Submit</Button>
									</form>
								</Form>
							</div>
						</SheetContent>
					</div>
					<Separator />

					<OrderTable columns={columns} data={orders || []} />
				</div>
			</Sheet>
		</div>
	);
};

export default OrdersPage;
