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
import { Label } from '@/components/ui/label';
import { useState } from 'react';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { useCategories } from '@/server/category/queries';
import { Category, Product, Promotion } from '@/types/product';
import { SingleImageDropzone } from '@/components/global/single-image-dropzone';
import { useCreateProduct, useUpdateProduct } from '@/server/product/mutations';
import { Loader } from '@/components/global/loader';
import { usePromotions } from '@/server/promotion/queries';

const formSchema = z.object({
	name: z.string().min(2, {
		message: 'Product Name must be at least 2 characters.',
	}),
	description: z.string().optional(),
	price: z.string(),
	categoryId: z.string().optional(),
	promotionId: z.string().optional(),
});

interface CreateProductFormProps {
	update?: boolean;
	product?: Product;
}

const CreateProductForm = ({ update, product }: CreateProductFormProps) => {
	const [uploadedFile, setUploadedFile] = useState<File | null>(null);
	const { data: categories } = useCategories();
	const { data: promotions } = usePromotions();
	const createProduct = useCreateProduct();
	const updateProduct = useUpdateProduct();
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: product?.name ?? '',
			description: product?.description ?? '',
			price: product?.price ?? '0',
			categoryId: product?.categoryId ?? '',
			promotionId: product?.promotionId ?? '',
		},
	});

	const handleFileChange = (file: File | null) => {
		setUploadedFile(file);
	};
	const isLoading = form.formState.isLoading;
	function onSubmit(data: z.infer<typeof formSchema>) {
		if (!uploadedFile) {
			console.error('No file uploaded');
			return;
		}
		if (update) {
			const reader = new FileReader();
			reader.onload = async function (event) {
				if (event.target) {
					const productData = { ...data, image: reader.result };

					updateProduct.mutate(productData);
				}
			};
		} else {
			const reader = new FileReader();
			reader.onload = async function (event) {
				if (event.target) {
					const productData = { ...data, image: reader.result };

					createProduct.mutate(productData);
				}
			};
			reader.readAsDataURL(uploadedFile);
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
								<FormLabel>Product Name *</FormLabel>
								<FormControl>
									<Input
										placeholder='Enter your product name, e.g. Cappuccino, Café Americano,...'
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
								<FormLabel>Description *</FormLabel>
								<FormControl>
									<Input
										placeholder='Description of the product'
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='price'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Price *</FormLabel>
								<FormControl>
									<div className='relative'>
										<span className='absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500'>
											$
										</span>
										<Input
											type='number'
											placeholder='Price'
											{...field}
											className='pl-8'
										/>
									</div>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='categoryId'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Category *</FormLabel>
								<FormControl>
									<Select
										onValueChange={field.onChange}
										defaultValue={field.value}
										value={field.value}
									>
										<SelectTrigger className='w-full'>
											<SelectValue placeholder='Select a category' />
										</SelectTrigger>
										<SelectContent>
											{categories &&
												categories.map(
													(cate: Category) => (
														<SelectItem
															value={
																cate.id || ''
															}
															key={cate.id}
														>
															{cate.name}
														</SelectItem>
													)
												)}
										</SelectContent>
									</Select>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='promotionId'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Promotion</FormLabel>
								<FormControl>
									<Select
										onValueChange={field.onChange}
										defaultValue={field.value}
										value={field.value}
									>
										<SelectTrigger className='w-full'>
											<SelectValue placeholder='Select a promotion campaign' />
										</SelectTrigger>
										<SelectContent>
											{promotions &&
												promotions.map(
													(promotion: Promotion) => (
														<SelectItem
															value={
																promotion.id ||
																''
															}
															key={promotion.id}
														>
															{promotion.name}
														</SelectItem>
													)
												)}
										</SelectContent>
									</Select>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<div className='grid w-full gap-3'>
						<Label htmlFor='idea'>Product Image *</Label>
						<SingleImageDropzone
							value={uploadedFile || product?.imageUrl!}
							onChange={handleFileChange}
							dropzoneOptions={{
								// Add dropzone options if necessary
								maxSize: 1024 * 1024 * 5, // 5 MB
								maxFiles: 1,
							}}
						/>
					</div>

					<Button
						type='submit'
						disabled={
							isLoading ||
							createProduct.isPending ||
							updateProduct.isPending
						}
					>
						{(isLoading ||
							createProduct.isPending ||
							updateProduct.isPending) && (
							<Loader className='h-4 w-4 mr-2' />
						)}
						{update ? 'Update product' : 'Create new product'}
					</Button>
				</form>
			</Form>
		</div>
	);
};

export default CreateProductForm;
