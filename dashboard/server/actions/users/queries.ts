'use server';

import * as z from 'zod';
import bcrypt from 'bcryptjs';
import { AuthFormSchema } from '@/schemas';
import { db } from '@/lib/db';
import { getUserByEmail } from '@/server/data/user';
import { generateVerificationToken } from '@/lib/tokens';
import { sendVerificationEmail } from '@/lib/mail';

export const createUserAccount = async (
	values: z.infer<typeof AuthFormSchema>
) => {
	const validateFields = AuthFormSchema.safeParse(values);

	if (!validateFields.success) {
		return { error: 'Invalid fields!' };
	}

	const { email, password, name } = validateFields.data;
	const hashedPassword = await bcrypt.hash(password, 10);

	const existingUser = await getUserByEmail(email);

	if (existingUser) {
		return { error: 'Email already in use!' };
	}

	await db.user.create({
		data: {
			name,
			email,
			password: hashedPassword,
		},
	});

	// TODO: Send verification token email
	const verificationToken = await generateVerificationToken(email);
	await sendVerificationEmail(
		verificationToken.email,
		verificationToken.token
	);

	return { success: 'Confirmation email sent!' };
};
