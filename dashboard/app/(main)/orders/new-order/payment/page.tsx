'use client';

import { Loader } from '@/components/global/loader';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useCreateOrder } from '@/server/order/mutations';
import { usePromotions } from '@/server/promotion/queries';
import { Promotion, Order } from '@/types/product';
import { TabsContent } from '@radix-ui/react-tabs';
import { ChevronLeft, Plus, PlusCircle, XCircle } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const OrderPaymentPage = () => {
	const createNewOrder = useCreateOrder();
	const [orderData, setOrderData] = useState<Order | undefined>(undefined);
	useEffect(() => {
		const currentOrder = localStorage.getItem('currentOrder') || '';
		setOrderData(JSON.parse(currentOrder));
	}, []);

	const [finalPrice, setFinalPrice] = useState(0);
	const [discount, setDiscount] = useState(0);
	const { data: promotions } = usePromotions();
	const [selectedCoupon, setSelectedCoupon] = useState<
		Promotion | undefined
	>();

	const [customerMoney, setCustomerMoney] = useState('');
	const [change, setChange] = useState('');
	useEffect(() => {
		if (selectedCoupon) {
			const totalDiscount =
				(orderData?.total || 0) *
				(parseFloat(selectedCoupon.promotionRate) / 100);
			setDiscount(totalDiscount);
			setFinalPrice((orderData?.total || 0) - totalDiscount);
		} else {
			setDiscount(0);
			setFinalPrice(orderData?.total || 0);
		}
		calculateChange();
	}, [selectedCoupon, orderData, customerMoney]);

	const router = useRouter();

	const handleAddNewCoupon = (promotion: Promotion) => {
		setSelectedCoupon(promotion);
	};

	const handleRemoveCoupon = () => {
		setSelectedCoupon(undefined);
	};

	const calculateChange = () => {
		const money = parseFloat(customerMoney);
		if (!isNaN(money)) {
			const changeAmount = money - finalPrice;
			setChange(changeAmount.toFixed(2));
		} else {
			setChange('0');
		}
	};

	const createOrder = () => {
		const data = {
			...orderData!,
			promotionId: selectedCoupon?.id!,
			total: finalPrice,
		};
		createNewOrder.mutate(data);
		localStorage.removeItem('currentOrder');
		router.push('/dashboard/orders');
	};

	return (
		<Dialog>
			<div className='h-full flex flex-col'>
				<nav className='border-b flex items-center p-4 gap-2'>
					<Button
						onClick={() => router.back()}
						size='icon'
						variant='outline'
					>
						<ChevronLeft className='w-6 h-6 cursor-pointer hover:opacity-75 opacity-100 transition-opacity' />
					</Button>
					<span className='text-lg font-bold'>PAYMENT</span>
				</nav>
				<main className='p-4 h-full w-[800px] mx-auto mt-4'>
					<Label className='text-lg font-bold'>Coupons</Label>
					{selectedCoupon ? (
						<div className='flex flex-col gap-4'>
							<div className='border rounded-xl p-2 flex justify-between items-center'>
								<div>
									<p className='text-lg'>
										{selectedCoupon.name}
									</p>
									<p className='text-sm text-gray-500'>
										{selectedCoupon.promotionRate}% sale
									</p>
								</div>
								<XCircle
									className='h-5 w-5 cursor-pointer hover:text-red-500 transition-colors'
									onClick={handleRemoveCoupon}
								/>
							</div>
						</div>
					) : (
						<p className='text-sm text-muted-foreground mt-2'>
							No coupon selected
						</p>
					)}
					<div className='flex flex-col gap-4 mt-2'>
						<DialogTrigger asChild>
							<Button
								type='button'
								variant='link'
								className='justify-start p-0'
							>
								<Plus className='h-4 w-4 mr-2' />
								Add coupon
							</Button>
						</DialogTrigger>
						<DialogContent className='max-h-[800px] max-w-2xl'>
							<div className='p-4 flex flex-col gap-4 overflow-auto'>
								{promotions && promotions.length !== 0 ? (
									promotions.map(
										(
											promotion: Promotion,
											index: number
										) => (
											<div
												key={index}
												className='border rounded-lg p-2 flex justify-between items-center'
											>
												<div>
													<p className='text-lg'>
														{promotion.name}
													</p>
													<p className='text-sm text-gray-500'>
														{
															promotion.promotionRate
														}
														% sale
													</p>
												</div>
												<PlusCircle
													className='h-5 w-5 cursor-pointer hover:text-blue-500 transition-colors'
													onClick={() =>
														handleAddNewCoupon(
															promotion
														)
													}
												/>
											</div>
										)
									)
								) : (
									<p className='text-sm text-muted-foreground'>
										No promotions available
									</p>
								)}
							</div>
						</DialogContent>
					</div>
					<div className='mt-4'>
						<Label className='text-lg font-bold'>
							Total ({orderData?.items.length} items)
						</Label>
						<p className='text-3xl font-bold text-yellow-900 float-end'>
							${finalPrice.toFixed(2)}
						</p>
						<div className='flex justify-between mt-4'>
							<p>Subtotal</p>
							<p className='text-yellow-900 font-bold'>
								${orderData?.total.toFixed(2)}
							</p>
						</div>
						<div className='flex justify-between mt-4'>
							<div>
								<p>Coupon</p>
								{selectedCoupon && (
									<p className='text-sm text-gray-500'>
										{selectedCoupon?.name} (-
										{selectedCoupon?.promotionRate}%)
									</p>
								)}
							</div>
							<p className='text-yellow-900 font-bold'>
								- ${discount.toFixed(2)}
							</p>
						</div>
					</div>
					<Tabs defaultValue='cash' className='space-y-4'>
						<TabsList className='grid w-full mt-4 grid-cols-2 justify-start rounded-xl bg-transparent p-0 border'>
							<TabsTrigger
								value='cash'
								className='data-[state=active]:bg-yellow-900 data-[state=active]:text-white data-[state=active]:shadow-none h-10 rounded-xl'
							>
								Cash
							</TabsTrigger>
							<TabsTrigger
								value='non-cash'
								className='data-[state=active]:bg-yellow-900 data-[state=active]:text-white data-[state=active]:shadow-none h-10 rounded-xl'
							>
								Non-Cash
							</TabsTrigger>
						</TabsList>
						<TabsContent value='cash'>
							<div className='border rounded-xl p-4 flex flex-col gap-2'>
								<p className='font-bold'>Customer payment</p>
								<Input
									placeholder='Enter customer money'
									type='number'
									value={customerMoney}
									onChange={(e) =>
										setCustomerMoney(e.target.value)
									}
									onBlur={calculateChange}
								/>
								<p className='font-bold'>Change</p>
								<p className='text-3xl font-bold text-yellow-900 float-end'>
									${change || '0'}
								</p>
							</div>
						</TabsContent>
						<TabsContent value='non-cash'>
							<div className='border rounded-xl p-4 flex justify-center'>
								<Image
									alt='momo qr code'
									src='/qr-code.png'
									width={200}
									height={200}
								/>
							</div>
							<div className='border rounded-xl p-4 flex flex-col justify-center mt-4 gap-2'>
								<p className='text-xl font-bold'>
									Banking Information
								</p>
								<p>0043578943759834 - Vietcombank</p>
								<p>0309285029385320 - MB Bank</p>
							</div>
						</TabsContent>
					</Tabs>
					<Button
						className='w-full bg-yellow-900 hover:bg-yellow-800 rounded-2xl mt-10'
						onClick={createOrder}
						disabled={createNewOrder.isPending}
					>
						{createNewOrder.isPending && (
							<Loader className='h-4 w-4 mr-2' />
						)}
						Place Order & Print Bill
					</Button>
				</main>
			</div>
		</Dialog>
	);
};

export default OrderPaymentPage;
