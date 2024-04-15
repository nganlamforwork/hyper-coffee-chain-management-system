'use client';
import { Button } from '@/components/ui/button';
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import clsx from 'clsx';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { AuthFormSchema } from '@/schemas';
import React, { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { MailCheck } from 'lucide-react';
import { Logo } from '@/app/(landing)/_components/logo';
import { Loader } from '@/components/global/loader';
import { createUserAccount } from '@/server/actions/users/queries';
import { toast } from 'sonner';

const SignUpFormSchema = z
	.object({
		name: z.string().describe('Name').min(1, 'Name is required'),
		email: z.string().describe('Email').email({ message: 'Invalid Email' }),
		password: z
			.string()
			.describe('Password')
			.min(6, 'Password must be minimum 6 characters'),
		confirmPassword: z
			.string()
			.describe('Confirm Password')
			.min(6, 'Password must be minimum 6 characters'),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords don't match.",
		path: ['confirmPassword'],
	});

const Signup = () => {
	const searchParams = useSearchParams();
	const [submitError, setSubmitError] = useState<string | undefined>('');
	const [confirmation, setConfirmation] = useState(false);

	const codeExchangeError = useMemo(() => {
		if (!searchParams) return '';
		return searchParams.get('error_description');
	}, [searchParams]);

	const confirmationAndErrorStyles = useMemo(
		() =>
			clsx('bg-primary', {
				'bg-red-500/10': codeExchangeError,
				'border-red-500/50': codeExchangeError,
				'text-red-700': codeExchangeError,
			}),
		[codeExchangeError]
	);

	const form = useForm<z.infer<typeof SignUpFormSchema>>({
		mode: 'onChange',
		resolver: zodResolver(SignUpFormSchema),
		defaultValues: { email: '', password: '', confirmPassword: '' },
	});

	const isLoading = form.formState.isSubmitting;
	const onSubmit = async (values: z.infer<typeof AuthFormSchema>) => {
		createUserAccount(values).then((data) => {
			if (data.error) {
				toast.error(data.error);
				setSubmitError(data.error);
				form.reset();
				return;
			}
			toast.success(data.success);
		});
		setConfirmation(true);
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
				{!confirmation && !codeExchangeError && (
					<>
						<FormField
							disabled={isLoading}
							control={form.control}
							name='name'
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<Input
											type='name'
											placeholder='Name'
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
						<FormField
							disabled={isLoading}
							control={form.control}
							name='confirmPassword'
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<Input
											type='password'
											placeholder='Confirm Password'
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<Button
							type='submit'
							className='w-full p-6'
							disabled={isLoading}
						>
							{isLoading && <Loader className='h-4 w-4 mr-2' />}
							Create Account
						</Button>
					</>
				)}

				{submitError && <FormMessage>{submitError}</FormMessage>}
				<div className='flex items-center gap-2'>
					<span>Already have an account?</span>
					<Link
						href='/auth/login'
						className='text-primary'
						prefetch={false}
					>
						Login
					</Link>
				</div>
				{(confirmation || codeExchangeError) && (
					<>
						<Alert className={confirmationAndErrorStyles}>
							{!codeExchangeError && (
								<MailCheck className='h-4 w-4' />
							)}
							<AlertTitle>
								{codeExchangeError
									? 'Invalid Link'
									: 'Check your email.'}
							</AlertTitle>
							<AlertDescription>
								{codeExchangeError ||
									'An email confirmation has been sent.'}
							</AlertDescription>
						</Alert>
					</>
				)}
			</form>
		</Form>
	);
};

export default Signup;
