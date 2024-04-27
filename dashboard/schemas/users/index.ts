import { z } from 'zod';

export const CreateAccountSchema = z.object({
	name: z.string().describe('Name').min(1),
	email: z.string().describe('Email').email({ message: 'Invalid Email' }),
	password: z.string().describe('Password').min(1, 'Password is required'),
	role: z.enum(['USER', 'ADMIN', 'STAFF', 'SWITCH_BOARD_STAFF']),
	gender: z.string().describe('Gender'),
	dateOfBirth: z.string().describe('Date of Birth'),
	phone: z.string().describe('Phone').min(10),
	address: z.string().describe('Address').min(1),
});
