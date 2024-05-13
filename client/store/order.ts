import { Extra, Product } from "@/type";
import create from "zustand";
interface CartItem {
  product: Product;
  price: number;
  extras: Extra[];
  quantity: number;
  note?: string;
}
interface OrderState {
  items: CartItem[];
  total: number;
  updateItems: (newItems: CartItem[], total: number) => void;
  cancelOrder: () => void;
}

export const useOrderStore = create<OrderState>((set) => ({
  items: [],
  total: 0,
  updateItems: (newItems, total) =>
    set((state) => ({
      items: newItems,
      total: total,
    })),
  cancelOrder: () =>
    set((state) => ({
      items: [],
    })),
}));
