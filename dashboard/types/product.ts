export type Product = {
  id?: string;
  name: string;
  description?: string;
  price: string;
  image: string | ArrayBuffer | null;
  imageUrl?: string;
  categoryId?: string;
  extraGroups?: ExtraGroup[];
  promotionId?: string;
};

export type Category = {
  id?: string;
  name: string;
};

export type ExtraGroup = {
  id?: string;
  name: string;
  min: string;
  max: string;
  extras: Extra[];
  products?: Product[];
};

export type Extra = {
  id?: string;
  name: string;
  price: string;
  status: string;
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

export type Order = {
  id?: string;
  items: OrderDetails[];
  name?: string;
  address?: string;
  phoneNumber?: string;
  note?: string;
  total: number;
  status?: string;
  feedback?: Feedback;
  paymentMethodId?: string;
  promotionId?: string;
};

export type OrderDetails = {
  id?: string;
  quantity: number;
  subTotal: number;
  note?: string;
  productId: string;
  product: Product;
  extras?: Extra[];
};

export type Feedback = {
  id?: string;
  rating: number;
  reply?: string;
};

export type PaymentMethod = {
  id?: string;
  type: string;
  cardNumber?: string;
  expiryDate?: string;
  cvv?: string;
};
