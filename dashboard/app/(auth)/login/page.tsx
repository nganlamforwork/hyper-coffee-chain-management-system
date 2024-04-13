'use client';

import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormMessage,
} from '@/components/ui/form';
import Link from 'next/link';
import { Logo } from '@/app/(landing)/_components/logo';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Loader } from '@/components/global/loader';
import { toast } from 'sonner';
import { AuthFormSchema } from '@/types';

const LoginPage = () => {
	const router = useRouter();
	const [submitError, setSubmitError] = useState('');

	const form = useForm<z.infer<typeof AuthFormSchema>>({
		mode: 'onChange',
		resolver: zodResolver(AuthFormSchema),
		defaultValues: { email: '', password: '' },
	});

	const isLoading = form.formState.isSubmitting;

	const onSubmit: SubmitHandler<z.infer<typeof AuthFormSchema>> = async (
		formData
	) => {
		// handle login here
		// const { error } = await actionLoginUser(formData);
		// if (error) {
		// 	form.reset();
		// 	setSubmitError(error.message);
		// 	toast(error.message, {
		// 		description: 'Please try the correct email / password',
		// 	});
		// 	return;
		// }
		toast.success('Login successfully');
		router.replace('/dashboard');
	};

	return (
		<Form {...form}>
			<form
				onChange={() => {
					if (submitError) setSubmitError('');
				}}
				onSubmit={form.handleSubmit(onSubmit)}
				className='w-full sm:w-[500px] space-y-6 flex flex-col border p-14 rounded-md'
			>
				<Logo />
				<FormDescription className='text-foreground/60'>
					An all-In-One Collaboration and Productivity Platform
				</FormDescription>
				<FormField
					disabled={isLoading}
					control={form.control}
					name='email'
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<Input
									type='email'
									placeholder='Email'
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					disabled={isLoading}
					control={form.control}
					name='password'
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<Input
									type='password'
									placeholder='Password'
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				{submitError && <FormMessage>{submitError}</FormMessage>}
				<Button
					type='submit'
					className='w-full p-6'
					size='lg'
					disabled={isLoading}
				>
					{isLoading && <Loader className='h-4 w-4 mr-2' />}
					Login
				</Button>
				<div className='flex items-center gap-2'>
					<span>Dont have an account?</span>
					<Link
						href='/signup'
						className='text-primary'
						prefetch={false}
					>
						Sign Up
					</Link>
				</div>
			</form>
		</Form>
	);
};

export default LoginPage;
