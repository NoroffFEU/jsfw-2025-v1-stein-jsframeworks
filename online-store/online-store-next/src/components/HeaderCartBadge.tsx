
"use client";

import Link from "next/link";
import { useCart } from "@/store/cart";

export default function HeaderCartBadge() {
    const count = useCart((s) => s.count());

    return (
        <Link href="/cart" className="relative inline-flex items-center gap-2">
            <span className="underline hover:no-underline">Cart</span>
            <span className="grid h-6 min-w-6 place-items-center rounded-full border px-1 text-sm" aria-label={`Items in cart`}>
                {count}
            </span>
        </Link>
    );
}