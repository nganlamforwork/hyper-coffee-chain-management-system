import create from "zustand";
import { Extra, ExtraGroups, Product } from "@/type";

interface CartState {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  deleteItem: (productId: string) => void;
}

interface CartItem {
  product: Product;
  extras: Extra[];
  quantity: number;
  note?: string;
}

export const useCartStore = create<CartState>((set) => ({
  items: [],
  addItem: (item) =>
    set((state) => {
      const existingItemIndex = state.items.findIndex(
        (cartItem) => cartItem.product.id === item.product.id
      );

      if (existingItemIndex !== -1) {
        const updatedItems = [...state.items];
        updatedItems[existingItemIndex].quantity += item.quantity;
        return { items: updatedItems };
      } else {
        return { items: [...state.items, item] };
      }
    }),

  deleteItem: (productId) =>
    set((state) => ({
      items: state.items.filter((item) => item.product.id !== productId),
    })),
}));
