'use client';

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { newVerification } from '@/server/actions/auth/new-verification';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { BeatLoader } from 'react-spinners';
import { toast } from 'sonner';

const NewVerificationPage = () => {
	const searchParams = useSearchParams();
	const token = searchParams.get('token');
	const [success, setSuccess] = useState<string | undefined>();
	const [error, setError] = useState<string | undefined>();

	const onSubmit = useCallback(() => {
		if (success || error) return;

		if (!token) {
			toast.error('Missing token!');
			setError('Missing token!');
			return;
		}
		newVerification(token)
			.then((data) => {
				if (data?.error) {
					setError(data?.error);
					toast.error(data?.error);
					return;
				}
				setSuccess(data?.success);
				toast.success(data?.success);
			})
			.catch(() => {
				toast.error('Something went wrong');
			});
	}, [token, success, error]);

	useEffect(() => {
		onSubmit();
	}, [onSubmit]);

	return (
		<Card className='bg-white rounded-md shadow-md w-[425px] p-10'>
			<CardHeader className='text-center'>
				<CardTitle>HyperCoffee Confirmation</CardTitle>
				<CardDescription>
					We are confirming your verification
				</CardDescription>
			</CardHeader>
			<CardContent className='h-full flex items-center w-full justify-between flex-col'>
				{!success && !error ? <BeatLoader /> : <div />}
				<Link
					href='/auth/login'
					className='hover:text-primary transition-colors'
				>
					Back to login
				</Link>
			</CardContent>
		</Card>
	);
};

export default NewVerificationPage;
