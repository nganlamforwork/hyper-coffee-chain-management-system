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

export type USER_ROLE = "CUSTOMER" | "ADMIN" | "STAFF" | "SWITCH_BOARD_STAFF";

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

export type Category = {
  id: string;
  name: string;
};
export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
  extraGroups: ExtraGroups[];
};

export type EXTRA_TYPE = "optional" | "must";
export type ExtraGroups = {
  id: string;
  name: string;
  type: EXTRA_TYPE;
  min: number;
  max: number;
  extras: Extra[];
};

export type Extra = {
  id: string;
  name: string;
  price: number;
  status: "out-of-stock" | "in-stock";
};

export type Promotion = {
  id: string;
  name: string;
  description: string;
};
