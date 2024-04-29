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
import { Category } from '@/types/product';
import { SingleImageDropzone } from '@/components/global/single-image-dropzone';
import { useCreateProduct } from '@/server/product/mutations';
import { Loader } from '@/components/global/loader';

const formSchema = z.object({
	name: z.string().min(2, {
		message: 'Product Name must be at least 2 characters.',
	}),
	description: z.string().optional(),
	price: z.string(),
	categoryId: z.string().optional(),
	promotionId: z.string().optional(),
});

const CreateProductForm = () => {
	const [uploadedFile, setUploadedFile] = useState<File | null>(null);
	const { data: categories } = useCategories();
	const createProduct = useCreateProduct();
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: '',
			description: '',
			price: '0',
			categoryId: '',
			promotionId: '',
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

		const reader = new FileReader();
		reader.onload = async function (event) {
			if (event.target) {
				const productData = { ...data, image: reader.result };

				createProduct.mutate(productData);
			}
		};
		reader.readAsDataURL(uploadedFile);
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
								<FormLabel>Product Name</FormLabel>
								<FormControl>
									<Input
										placeholder='Cappuchino, Latte,...'
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
								<FormLabel>Price</FormLabel>
								<FormControl>
									<Input
										type='number'
										placeholder='Price'
										{...field}
									/>
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
								<FormLabel>Category</FormLabel>
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
					<div className='grid w-full gap-3'>
						<Label htmlFor='idea'>Product Image</Label>
						<SingleImageDropzone
							value={uploadedFile}
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
						disabled={isLoading || createProduct.isPending}
					>
						{(isLoading || createProduct.isPending) && (
							<Loader className='h-4 w-4 mr-2' />
						)}
						Add product
					</Button>
				</form>
			</Form>
		</div>
	);
};

export default CreateProductForm;