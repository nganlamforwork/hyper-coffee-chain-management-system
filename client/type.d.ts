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
