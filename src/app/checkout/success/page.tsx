"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";
import { useCart } from "@/store/cart";
import { toast } from "sonner";

export default function SuccessPage() {
  const clear = useCart((s) => s.clear);
  const fired = useRef(false); // guard against Strict Mode double-invoke

  useEffect(() => {
    if (fired.current) return;
    fired.current = true;

    clear();
    // Use a stable id so duplicate calls update instead of stacking
    toast.success("Checkout successful! Cart is cleared.", { id: "checkout-success" });
  }, [clear]);

  return (
    <main className="mx-auto max-w-3xl px-4 py-16 text-center text-foreground">
      <h1 className="mb-2 text-3xl font-bold">Thanks for the order!</h1>
      <p className="opacity-80">Order confirmed. You will receive an email confirmation shortly.</p>

      <div className="mt-8 flex items-center justify-center gap-3">
        <Link
          href="/"
          className="rounded-xl border px-5 py-3 bg-neutral-800 text-foreground hover:bg-neutral-700"
        >
          Continue shopping
        </Link>
      </div>
    </main>
  );
}