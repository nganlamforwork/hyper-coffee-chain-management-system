import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import {
	FormField,
	FormLabel,
	FormControl,
	FormMessage,
	FormItem,
	Form,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Extra, OrderDetails, Product } from '@/types/product';
import { Minus, Plus } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Checkbox } from '@/components/ui/checkbox';

const formSchema = z.object({
	quantity: z.number().min(1, {
		message: 'Quantity must be at least 1.',
	}),
	note: z.string().optional(),
	extras: z.array(z.string()).optional(),
});

interface OrderDetailsFormProps {
	product: Product;
	setOrderDetails: Dispatch<SetStateAction<OrderDetails[]>>;
	orderDetails: OrderDetails[];
}

const OrderDetailsForm = ({
	product,
	orderDetails,
	setOrderDetails,
}: OrderDetailsFormProps) => {
	const [subTotal, setSubTotal] = useState<number>(parseFloat(product.price));
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			quantity: 1,
			extras: [],
		},
	});
	const isLoading = form.formState.isLoading;
	const checkedextras = form.watch('extras');
	const quantity = form.watch('quantity');

	useEffect(() => {
		let total = parseFloat(product.price) * form.getValues().quantity;
		if (checkedextras) {
			checkedextras.forEach((itemId: string) => {
				const extra = product?.extraGroups
					?.flatMap((group) => group.extras)
					.find((extra) => extra.id === itemId);
				if (extra) {
					total += parseFloat(extra.price);
				}
			});
			setSubTotal(total);
		}
	}, [checkedextras, product.price, product.extraGroups, quantity]);

	function onSubmit(data: z.infer<typeof formSchema>) {
		const selectedExtras = data.extras ?? [];
		const extras: Extra[] = [];

		// Iterate through each selected extra ID
		selectedExtras.forEach((extraId) => {
			// Find the extra object corresponding to the extraId
			const extraGroup = product.extraGroups?.find((group) =>
				group.extras.find((extra) => extra.id === extraId)
			);
			if (extraGroup) {
				const extra = extraGroup.extras.find(
					(extra) => extra.id === extraId
				);
				if (extra) {
					extras.push(extra);
				}
			}
		});

		// Construct order details data
		const orderDetailsData: OrderDetails = {
			...data,
			product: product,
			productId: product.id!,
			subTotal: subTotal,
			extras: extras,
		};

		// Check if the same product already exists in orderDetails
		const existingProductIndex = orderDetails.findIndex(
			(item) => item.product.id === product.id
		);

		if (existingProductIndex !== -1) {
			// If the product already exists, update its quantity and extras
			const updatedOrderDetails = [...orderDetails];
			const existingExtras =
				updatedOrderDetails[existingProductIndex].extras ?? [];
			updatedOrderDetails[existingProductIndex] = {
				...updatedOrderDetails[existingProductIndex],
				quantity:
					updatedOrderDetails[existingProductIndex].quantity +
					data.quantity,
				extras: [...existingExtras, ...extras],
			};
			setOrderDetails(updatedOrderDetails);
		} else {
			// If the product doesn't exist, add it to the order details
			setOrderDetails([...orderDetails, orderDetailsData]);
		}
		form.reset();
	}
	return (
		<div className='mt-44'>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className='space-y-4'
				>
					<div className='flex flex-col gap-2 mb-4'>
						<div className='flex extras-center justify-between'>
							<p className='font-bold text-xl'>{product.name}</p>
							<p className='font-bold text-xl'>
								$ {product.price}
							</p>
						</div>
						<p className='text-xs mt-4'>{product.description}</p>
					</div>
					<Separator />
					{/* Render extra groups and extras */}
					{product.extraGroups &&
						product.extraGroups.map((extraGroup) => (
							<div key={extraGroup.id} className='space-y-4'>
								<div className='flex extras-center gap-2'>
									<p className='text-lg font-semibold'>
										{extraGroup.name} -{' '}
									</p>
									<span className='text-sm text-gray-400'>
										Choose from {extraGroup.min} to{' '}
										{extraGroup.max}
									</span>
								</div>
								<div className='grid grid-cols-2 gap-4 mt-2'>
									<FormField
										control={form.control}
										name='extras'
										render={() => (
											<FormItem>
												{extraGroup.extras &&
													extraGroup.extras.map(
														(extra) => (
															<FormField
																key={extra.id}
																control={
																	form.control
																}
																name='extras'
																render={({
																	field,
																}) => {
																	return (
																		<FormItem
																			key={
																				extra.id
																			}
																			className='flex flex-row extras-start space-x-3 space-y-0'
																		>
																			<FormControl>
																				<Checkbox
																					disabled={
																						extra.status ===
																						'out-of-stock'
																					}
																					checked={field.value?.includes(
																						extra.id!
																					)}
																					onCheckedChange={(
																						checked
																					) => {
																						return checked
																							? field.onChange(
																									[
																										...field.value!,
																										extra.id,
																									]
																							  )
																							: field.onChange(
																									field.value?.filter(
																										(
																											value
																										) =>
																											value !==
																											extra.id
																									)
																							  );
																					}}
																				/>
																			</FormControl>
																			<FormLabel
																				className={`font-normal ${
																					extra.status ===
																						'out-of-stock' &&
																					'line-through'
																				}`}
																			>
																				{
																					extra.name
																				}{' '}
																				-
																				${' '}
																				{
																					extra.price
																				}
																			</FormLabel>
																		</FormItem>
																	);
																}}
															/>
														)
													)}
												<FormMessage />
											</FormItem>
										)}
									/>
								</div>
								<Separator />
							</div>
						))}
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
										className='bg-orange-100'
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</div>
						)}
					/>
					<Separator />
					<FormField
						control={form.control}
						name='quantity'
						render={({ field }) => (
							<div className='flex extras-center justify-center'>
								<Button
									type='button'
									variant={'outline'}
									onClick={() => {
										const currentValue = parseInt(
											String(field.value)
										);
										const newValue = isNaN(currentValue)
											? 1
											: currentValue + 1;
										form.setValue('quantity', newValue);
									}}
								>
									<Plus className='h-5 w-5 text-green-700' />
								</Button>
								<Input
									className='w-12 text-center outline-none border-none'
									{...field}
								/>
								<Button
									type='button'
									variant={'outline'}
									onClick={() => {
										const currentValue = parseInt(
											String(field.value)
										);
										const newValue = isNaN(currentValue)
											? 1
											: Math.max(1, currentValue - 1);
										form.setValue('quantity', newValue);
									}}
								>
									<Minus className='h-5 w-5 text-green-700' />
								</Button>
							</div>
						)}
					/>
					<Button
						type='submit'
						disabled={isLoading}
						className='w-full'
					>
						{isLoading
							? 'Submitting...'
							: `Add order details - ${subTotal.toFixed(2)} $`}
					</Button>
				</form>
			</Form>
		</div>
	);
};

export default OrderDetailsForm;
