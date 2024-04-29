import { USER_ROLE } from '@/types/user';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function generateToken() {
	const array = new Uint8Array(12);
	crypto.getRandomValues(array);

	const token = Array.from(array, (byte) =>
		byte.toString(16).padStart(2, '0')
	).join('');

	return token;
}

export function parseCSV(csvContent: string) {
	const rows = csvContent.trim().split('\n').slice(1); // Skip header row
	return rows.map((row) => {
		const [id, name, dateOfBirth, gender, email, phone, address] =
			row.split(',');
		const role: USER_ROLE = 'STAFF';
		return {
			name,
			email,
			password: '123456',
			role,
			gender,
			dateOfBirth,
			phone,
			address,
		};
	});
}
