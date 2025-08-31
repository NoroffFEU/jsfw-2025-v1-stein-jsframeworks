
"use client";

import Link from "next/link";
import { useCart } from "@/store/cart";
import { toast } from "sonner";

function formatNOK(n: number) {
    return `${n.toFixed(2)} kr`;
}

export default function CartPage() {


    const { items, setQty, remove, total } = useCart();


    if (!items.length) {
        return (
            <main className="mx-auto max-w-5xl py-10">
                <h1 className="mb-4 text-2xl font-bold">Cart</h1>
                <p>Cart is empty.</p>
                <Link href="/" className="mt-4 inline-block underline">
                Go back to products
                </Link>
            </main>
        );
    }

    return (
        <main className="mx-auto max-w-5xl px-4 py-10">
            <h1 className="mb-6 text-2xl font-bold">Cart</h1>

            <ul className="divide-y rounded-2xl border">
                {items.map((item) => (
                    <li key={item.id} className="grid grid-cols-12 items-center gap-4 p-4">
                        <img
                        src={item.imageUrl}
                        alt={item.title}
                        className="col-span-2 h-20 w-20 rounded object-cover"
                        />

                        <div className="col-span-5">
                            <div className="font-semibold">{item.title}</div>
                            <div className="opacity-80">{formatNOK(item.price)}</div>
                        </div>

                        <div className="col-span-3 flex items-center gap-2">
                            <button
                            aria-label="decrease quantity"
                            className="rounded border px-2"
                            onClick={() => setQty(item.id, item.quantity - 1)}
                            >
                                -
                            </button>
                            <input 
                            className="w-16 rounded border p-1 text-center"
                            inputMode="numeric"
                            value={item.quantity}
                            onChange={(e) => {
                                const v = Math.max(1, Number(e.target.value) || 1);
                                setQty(item.id, v);
                            }}
                            />
                            <button 
                            aria-label="increase quantity"
                            className="rounded border px-2"
                            onClick={() => setQty(item.id, item.quantity + 1)}
                            >
                                +
                            </button>
                        </div>
                    <div className="col-span-2 text-right font-semibold">
              {formatNOK(item.price * item.quantity)}
            </div>

           
            <button
              className="col-span-12 mt-2 justify-self-start rounded border px-3 py-1 text-sm hover:bg-neutral-50 sm:col-span-0 sm:mt-0 sm:justify-self-end"
              onClick={() => {
                remove(item.id);
                toast.info(`Fjernet "${item.title}"`);
              }}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>

     
      <div className="mt-6 flex items-center justify-between">
        <div className="text-lg">
          <span className="opacity-70">Total:</span>{" "}
          <span className="font-semibold">{formatNOK(total())}</span>
        </div>
        <Link
          href="/checkout/success"
          className="rounded-xl bg-black px-5 py-3 text-white hover:bg-neutral-800"
        >
          Checkout
        </Link>
      </div>
    </main>
  );
}