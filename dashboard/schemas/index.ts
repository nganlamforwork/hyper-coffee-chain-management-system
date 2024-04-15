import { z } from 'zod';

export const AuthFormSchema = z.object({
	name: z.optional(z.string().describe('Name').min(1)),
	email: z.string().describe('Email').email({ message: 'Invalid Email' }),
	password: z.string().describe('Password').min(1, 'Password is required'),
});
