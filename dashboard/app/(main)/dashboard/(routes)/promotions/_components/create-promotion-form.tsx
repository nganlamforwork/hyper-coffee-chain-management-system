'use client';

import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Loader } from '@/components/global/loader';
import { Promotion } from '@/types/product';
import { addDays, format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import { DateRange } from 'react-day-picker';
import { cn } from '@/lib/utils';
import { Calendar } from '@/components/ui/calendar';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';
import { useState } from 'react';
import { Label } from '@/components/ui/label';
import {
	useCreatePromotion,
	useUpdatePromotion,
} from '@/server/promotion/mutations';

const formSchema = z.object({
	name: z.string().min(2, {
		message: 'Promotion name must be at least 2 characters.',
	}),
	description: z.string(),
	promotionRate: z.string(),
	maxQuantity: z.string(),
});

interface CreatePromotionFormProps {
	update?: boolean;
	promotion?: Promotion;
}

const CreatePromotionForm = ({
	update,
	promotion,
}: CreatePromotionFormProps) => {
	const [date, setDate] = useState<DateRange | undefined>(
		promotion
			? {
					from: promotion.startDate,
					to: promotion.endDate,
			  }
			: {
					from: new Date(),
					to: addDays(new Date(), 20),
			  }
	);
	const createPromotion = useCreatePromotion();
	const updatePromotion = useUpdatePromotion();
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: promotion?.name ?? '',
			description: promotion?.description ?? '',
			promotionRate: promotion?.promotionRate.toString() ?? '0',
			maxQuantity: promotion?.maxQuantity.toString() ?? '0',
		},
	});
	const isLoading = form.formState.isLoading;
	function onSubmit(data: z.infer<typeof formSchema>) {
		if (update) {
			const updatedData = {
				...promotion,
				...data,
				startDate: date && date.from,
				endDate: date && date.to,
			};
			updatePromotion.mutate(updatedData);
			form.setValue('name', '');
			form.setValue('description', '');
			form.setValue('promotionRate', '');
			setDate(undefined);
		} else {
			const promotionData = {
				...data,
				startDate: date && date.from,
				endDate: date && date.to,
			};
			createPromotion.mutate(promotionData);
			form.reset();
		}
	}
	return (
		<div className='py-4'>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className='space-y-8'
				>
					<FormField
						control={form.control}
						name='name'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Promotion Name</FormLabel>
								<FormControl>
									<Input
										placeholder='Flash Sale 1/1'
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='description'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Description</FormLabel>
								<FormControl>
									<Input
										placeholder='Description of the campaign'
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<div className='grid w-full gap-3'>
						<Label htmlFor='file'>Select Date Range</Label>
						<Popover>
							<PopoverTrigger asChild>
								<Button
									id='date'
									variant={'outline'}
									className={cn(
										'w-full justify-start text-left font-normal',
										!date && 'text-muted-foreground'
									)}
								>
									<CalendarIcon className='mr-2 h-4 w-4' />
									{date?.from ? (
										date.to ? (
											<>
												{format(date.from, 'LLL dd, y')}{' '}
												- {format(date.to, 'LLL dd, y')}
											</>
										) : (
											format(date.from, 'LLL dd, y')
										)
									) : (
										<span>Pick a date</span>
									)}
								</Button>
							</PopoverTrigger>
							<PopoverContent
								className='w-auto p-0'
								align='start'
							>
								<Calendar
									initialFocus
									mode='range'
									defaultMonth={date?.from}
									selected={date}
									onSelect={setDate}
									numberOfMonths={2}
								/>
							</PopoverContent>
						</Popover>
					</div>
					<FormField
						control={form.control}
						name='promotionRate'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Promotion Rate (%)</FormLabel>
								<FormControl>
									<Input type='number' {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='maxQuantity'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Max Quantity</FormLabel>
								<FormControl>
									<Input type='number' {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button type='submit' disabled={createPromotion.isPending}>
						{(isLoading || createPromotion.isPending) && (
							<Loader className='h-4 w-4 mr-2' />
						)}
						{update ? 'Update' : 'Create'}
					</Button>
				</form>
			</Form>
		</div>
	);
};

export default CreatePromotionForm;
