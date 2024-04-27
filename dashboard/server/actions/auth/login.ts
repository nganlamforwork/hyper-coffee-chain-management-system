'use server';

import * as z from 'zod';

import { signIn } from '@/auth';
import { DEFAULT_LOGIN_REDIRECT } from '@/route';
import { AuthError } from 'next-auth';
import { getUserByEmail } from '../../data/user';
import { AuthSchema } from '@/schemas/auth';

export const login = async (values: z.infer<typeof AuthSchema>) => {
	const validatedFields = AuthSchema.safeParse(values);

	if (!validatedFields.success) {
		return { error: 'Invalid fields' };
	}

	const { email, password } = validatedFields.data;

	const existingUser = await getUserByEmail(email);
	if (!existingUser || !existingUser.email) {
		return { error: 'Email does not exist!' };
	}
	try {
		await signIn('credentials', {
			email,
			password,
			redirectTo: DEFAULT_LOGIN_REDIRECT,
		});
		return { success: 'Login successfully!' };
	} catch (error) {
		if (error instanceof AuthError) {
			switch (error.type) {
				case 'CredentialsSignin':
					return { error: 'Invalid credentials!' };
				default:
					return { error: 'Something went wrong!' };
			}
		}

		throw error;
	}
};
