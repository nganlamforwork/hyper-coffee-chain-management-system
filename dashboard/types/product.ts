export type Product = {
	id: string;
	name: string;
	description?: string;
	price: number;
	imageUrl?: string;
	category?: Category;
	extras?: Extras[];
	promotion?: Promotion;
};

export type Category = {
	id?: string;
	name: string;
};

export type Extras = {
	name: string;
	type: string;
	min: string;
	max: string;
};

export type Promotion = {
	id: string;
	description: string;
	startDate: string;
	endDate: string;
	promotionRate: number;
};
