import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type CartItem = {
    id: string;
    title: string;
    price: number;
    imageUrl: string;
    quantity: number;
};

type CartState = {
    items: CartItem[];
    add: (item: Omit<CartItem, "quantity">, qty?: number) => void;
    remove: (id: string) => void;
    setQty: (id: string, qty: number) => void;
    clear: () => void;
    count: () => number;
    total: () => number;
};

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      add: (item, qty = 1) => {
        const items = [...get().items];
        const idx = items.findIndex((x) => x.id === item.id);
        if (idx >= 0) items[idx].quantity += qty;
        else items.push({ ...item, quantity: qty });
        set({ items });
      },
      remove: (id) => set({ items: get().items.filter((x) => x.id !== id) }),
      setQty: (id, qty) =>
        set({
          items: get().items.map((x) =>
            x.id === id ? { ...x, quantity: Math.max(1, qty) } : x
          ),
        }),
      clear: () => set({ items: [] }),
      count: () => get().items.reduce((s, x) => s + x.quantity, 0),
      total: () =>
        get().items.reduce((s, x) => s + x.price * x.quantity, 0),
    }),
    { name: "cart" }
  )
);