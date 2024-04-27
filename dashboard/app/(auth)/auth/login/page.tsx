'use client';

import { useRouter } from 'next/navigation';
import React, { useState, useTransition } from 'react';
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
import { login } from '@/server/actions/auth/login';
import { AuthSchema } from '@/schemas/auth';

const LoginPage = () => {
	const router = useRouter();
	const [submitError, setSubmitError] = useState<string | undefined>('');
	const [isPending, startTransition] = useTransition();

	const form = useForm<z.infer<typeof AuthSchema>>({
		mode: 'onChange',
		resolver: zodResolver(AuthSchema),
		defaultValues: { email: '', password: '' },
	});

	const isLoading = form.formState.isSubmitting;

	const onSubmit: SubmitHandler<z.infer<typeof AuthSchema>> = async (
		values
	) => {
		startTransition(() => {
			login(values).then((data) => {
				if (data?.error) {
					toast.error(data?.error);
					form.reset();
					setSubmitError(data?.error);
					return;
				}
				toast.success('Login successfully!');
				router.replace('/dashboard');
			});
		});
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
					disabled={isLoading || isPending}
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
					disabled={isLoading || isPending}
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
					disabled={isLoading || isPending}
				>
					{(isLoading || isPending) && (
						<Loader className='h-4 w-4 mr-2' />
					)}
					Login
				</Button>
				<div className='flex items-center gap-2'>
					<span>Dont have an account?</span>
					<Link
						href='/auth/signup'
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
