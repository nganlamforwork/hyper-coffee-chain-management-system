export type USER_ROLE = 'USER' | 'ADMIN' | 'STAFF' | 'SWITCH_BOARD_STAFF';

export type Employee = {
	id: string;
	name: string;
	email: string;
	image: string | null;
	phone: string;
	gender: string;
	dateOfBirth: string;
	address: string;
	role: USER_ROLE;
};
