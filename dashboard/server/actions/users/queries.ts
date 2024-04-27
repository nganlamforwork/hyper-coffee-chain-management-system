'use server';

import * as z from 'zod';
import { AccountSchema } from '@/schemas';
import { db } from '@/lib/db';
import { getUserByEmail } from '@/server/data/user';

export const createUserAccount = async (
	values: z.infer<typeof AccountSchema>
) => {
	const validateFields = AccountSchema.safeParse(values);

	if (!validateFields.success) {
		return { error: 'Invalid fields!' };
	}

	const { email, password, name, role, gender, dateOfBirth, phone, address } =
		validateFields.data;

	const existingUser = await getUserByEmail(email);

	if (existingUser) {
		return { error: 'Email already in use!' };
	}

	await db.user.create({
		data: {
			name,
			email,
			password,
			role,
			gender,
			dateOfBirth,
			phone,
			address,
		},
	});

	return { success: 'All accounts created successful!' };
};

export const getAllAccounts = async () => {
	return await db.user.findMany();
};

export const deleteAccountById = async (accId: string) => {
	try {
		await db.user.delete({
			where: {
				id: accId,
			},
		});
		return { success: 'Account deleted successfully' };
	} catch (error) {
		console.error('Error deleting account:', error);
		return { error: 'Failed to delete account' };
	}
};
