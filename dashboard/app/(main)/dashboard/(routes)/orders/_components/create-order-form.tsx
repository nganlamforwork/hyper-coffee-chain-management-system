'use client';

import {
	Form,
	FormField,
	FormLabel,
	FormControl,
	FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Loader } from '@/components/global/loader';
import { zodResolver } from '@hookform/resolvers/zod';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Order, OrderDetails } from '@/types/product';
import { Trash2 } from 'lucide-react';
import { Dispatch, SetStateAction, useEffect } from 'react';
import { useRouter } from 'next/navigation';
// import { useCreateOrder } from '@/server/order/mutations';

const formSchema = z.object({
	name: z.string().min(2, {
		message: 'Customer name must be at least 2 characters.',
	}),
	address: z.string().optional(),
	phoneNumber: z.string().min(10, {
		message: 'Phone number must be at least 10 characters.',
	}),
	note: z.string().optional(),
});

interface CreateOrderFormProps {
	orderDetails: OrderDetails[];
	setOrderDetails: Dispatch<SetStateAction<OrderDetails[]>>;
}

const CreateOrderForm = ({
	orderDetails,
	setOrderDetails,
}: CreateOrderFormProps) => {
	// const createOrder = useCreateOrder();
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
	});

	useEffect(() => {
		const currentOrder = localStorage.getItem('currentOrder') || '';
		if (!currentOrder) return;
		const jsonOrder: Order = JSON.parse(currentOrder);
		form.setValue('name', jsonOrder.name!);
		form.setValue('address', jsonOrder.address!);
		form.setValue('phoneNumber', jsonOrder.phoneNumber!);
		form.setValue('note', jsonOrder.note!);
		setOrderDetails([...orderDetails, ...jsonOrder.items]);
	}, []);

	const isLoading = form.formState.isLoading;
	const router = useRouter();
	function onSubmit(data: z.infer<typeof formSchema>) {
		const createOrderData = {
			...data,
			items: orderDetails,
			total: orderDetails.reduce((acc, ord) => acc + ord.subTotal, 0),
		};
		localStorage.setItem('currentOrder', JSON.stringify(createOrderData));
		router.push('/orders/new-order/payment');
		form.reset();
	}

	const handleRemoveOrderDetail = (index: number) => {
		const newOrderDetails = [...orderDetails];
		newOrderDetails.splice(index, 1);
		setOrderDetails(newOrderDetails);
		localStorage.setItem('currentOrder', JSON.stringify(newOrderDetails));
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
				<div className='flex gap-4'>
					<Card className='w-full'>
						<CardHeader>
							<CardTitle>Customers</CardTitle>
							<CardDescription>
								Fill in customer information.
							</CardDescription>
						</CardHeader>
						<CardContent className='space-y-4'>
							<FormField
								control={form.control}
								name='name'
								render={({ field }) => (
									<div>
										<FormLabel>Customer Name</FormLabel>
										<FormControl>
											<Input
												placeholder='John Doe'
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</div>
								)}
							/>
							<FormField
								control={form.control}
								name='phoneNumber'
								render={({ field }) => (
									<div>
										<FormLabel>Phone Number</FormLabel>
										<FormControl>
											<Input
												maxLength={10}
												placeholder='123-456-7890'
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</div>
								)}
							/>
							<FormField
								control={form.control}
								name='address'
								render={({ field }) => (
									<div>
										<FormLabel>Address</FormLabel>
										<FormControl>
											<Input
												placeholder='123 Main St'
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</div>
								)}
							/>
							<FormField
								control={form.control}
								name='note'
								render={({ field }) => (
									<div>
										<FormLabel>Note</FormLabel>
										<FormControl>
											<Textarea
												rows={5}
												placeholder='Optional'
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</div>
								)}
							/>
						</CardContent>
					</Card>
				</div>
				<div className='mt-4'>
					<Label className='text-lg font-bold'>Order Details</Label>
					<div className='flex flex-col border rounded-lg p-4 gap-4'>
						{orderDetails.length !== 0 ? (
							orderDetails.map(
								(ordDetail: OrderDetails, index: number) => (
									<div className='flex justify-between items-center p-2'>
										<div className='flex gap-2'>
											<div className='bg-yellow-900 px-4 py-2 text-white rounded-md h-full'>
												{ordDetail.quantity}
											</div>
											<div className='prose-sm'>
												<p className='text-sm font-bold'>
													{ordDetail.product.name}
												</p>
												<ul className='list-disc'>
													{ordDetail.extras?.map(
														(ext) => (
															<li>
																{ext.name} - $
																{ext.price}
															</li>
														)
													)}
												</ul>
											</div>
										</div>
										<div className='flex items-center gap-2'>
											<span className='text-md font-bold'>
												${ordDetail.subTotal}
											</span>
											<Trash2
												className='h-4 w-4 text-red-500 cursor-pointer opacity-100 hover:opacity-75 transition-opacity'
												onClick={() =>
													handleRemoveOrderDetail(
														index
													)
												}
											/>
										</div>
									</div>
								)
							)
						) : (
							<span>No orders available.</span>
						)}
					</div>
				</div>
				<Button
					type='submit'
					disabled={isLoading}
					className='w-full bg-yellow-900 hover:bg-yellow-800 rounded-2xl'
				>
					{isLoading ? (
						<Loader className='h-4 w-4 mr-2' />
					) : (
						'Next to payment ->'
					)}
				</Button>
			</form>
		</Form>
	);
};

export default CreateOrderForm;
