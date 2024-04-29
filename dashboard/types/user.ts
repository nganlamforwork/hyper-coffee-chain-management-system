export type USER_ROLE = 'CUSTOMER' | 'ADMIN' | 'STAFF' | 'SWITCH_BOARD_STAFF';

export type User = {
	id?: string;
	name: string;
	email: string;
	image?: string | null;
	phone?: string;
	gender?: string;
	dateOfBirth?: string;
	role: USER_ROLE;
	createdAt?: string;
	updatedAt?: string;
};
export interface IEmployeeAccountsRequest {
	employees: User[];
	success: boolean;
}
