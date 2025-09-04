
"use client";
import { useEffect } from "react";
import Link from "next/link";
import { useCart } from "@/store/cart";
import { toast } from "sonner";

export default function successPage() {
    const clear = useCart((s) => s.clear);

    useEffect(() => {
        clear();
        toast.success("Checkout successful! Cart is cleared.");

    }, [clear]);

    return (
        <main className="mx-auto max-w-3xl px-4 py-16 text-center">
             <h1 className="mb-2 text-3xl font-bold">Thanks for the order!</h1>
        <p className="opacity-80">
        Order confirmed. You will recieve an email confirmation shortly.
        </p>

      <div className="mt-8 flex items-center justify-center gap-3">
        <Link href="/" className="rounded-xl border px-5 py-3 hover:bg-neutral-50">
          Continue shopping
        </Link>
        <Link
          href="/cart"
          className="rounded-xl bg-black px-5 py-3 text-white hover:bg-neutral-800"
        >
          View Cart
        </Link>
      </div>

        </main>
    )
}