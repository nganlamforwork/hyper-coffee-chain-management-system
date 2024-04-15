import Credentials from 'next-auth/providers/credentials';
import type { NextAuthConfig } from 'next-auth';
import { AuthFormSchema } from '@/schemas';
import { getUserByEmail } from '@/server/data/user';
import bcrypt from 'bcryptjs';

export default {
	providers: [
		Credentials({
			async authorize(credentials) {
				const validatedFields = AuthFormSchema.safeParse(credentials);

				if (validatedFields.success) {
					const { email, password } = validatedFields.data;

					const user = await getUserByEmail(email);
					if (!user || !user.password) return null;

					const passwordsMatch = await bcrypt.compare(
						password,
						user.password
					);

					if (passwordsMatch) return user;
				}
				return null;
			},
		}),
	],
} satisfies NextAuthConfig;
