'use client';

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
import { Logo } from '@/app/(landing)/_components/logo';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Loader } from '@/components/global/loader';
import { AuthSchema } from '@/schemas/auth';
import { useAuth } from '@/providers/auth-provider';

const LoginPage = () => {
	const [submitError, setSubmitError] = useState<string | undefined>('');

	const form = useForm<z.infer<typeof AuthSchema>>({
		mode: 'onChange',
		resolver: zodResolver(AuthSchema),
		defaultValues: { email: '', password: '' },
	});

	const isLoading = form.formState.isSubmitting;
	const { login } = useAuth();
	const onSubmit: SubmitHandler<z.infer<typeof AuthSchema>> = async ({
		email,
		password,
	}) => {
		await login(email, password);
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
			</form>
		</Form>
	);
};

export default LoginPage;
