
"use client";

import { useCart } from "@/store/cart";
import { toast } from "sonner";

type Props = {
    id: string;
    title: string;
    imageUrl: string;
    price: number;
};

export default function AddToCartButton({ id, title, imageUrl, price }: Props) {
    const add = useCart((s) => s.add);

    return ( 
      <button 
        onClick={() => {
          add({ id, title, imageUrl, price}, 1);
          toast.success(`Added ${title} to cart`);
        }}
        className="rounded-xl bg-neutral-800 px-5 py-3 text-foreground transition hover:bg-neutral-600"
        >
            Add to cart
        </button>
    );
  }