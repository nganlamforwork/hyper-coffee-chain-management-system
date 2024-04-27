import { z } from 'zod';

export const AuthSchema = z.object({
	email: z.string().describe('Email').email({ message: 'Invalid Email' }),
	password: z.string().describe('Password').min(1, 'Password is required'),
});
