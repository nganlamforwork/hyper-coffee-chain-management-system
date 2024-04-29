export type Product = {
	id?: string;
	name: string;
	description?: string;
	price: string;
	image: string | ArrayBuffer | null;
	categoryId?: string;
	extras?: Extras[];
	promotionId?: string;
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
	id?: string;
	name: string;
	description: string;
	startDate?: Date;
	endDate?: Date;
	promotionRate: string;
	maxQuantity: string;
};
