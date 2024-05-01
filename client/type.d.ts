export type Beverage = {
  id: string;
  img: string;
  name: string;
  description: string;
  price: number;
  rating: number;
  size?: OrderOption[];
  sugar?: OrderOption[];
  temperature?: string[];
  ice?: OrderOption[];
};

type OrderOption = {
  option: string;
  value: string;
};

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
