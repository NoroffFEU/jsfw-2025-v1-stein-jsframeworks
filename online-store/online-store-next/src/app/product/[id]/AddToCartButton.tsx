
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
        className="rounded-xl bg-black px-5 py-3 text-white transition hover:bg-neutral-800"
        >
            Add to cart
        </button>
    );
  }