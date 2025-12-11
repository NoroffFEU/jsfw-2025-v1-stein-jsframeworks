
"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/store/cart";
import { useMemo } from "react"


export interface CartItem {
  id: string
  title?: string
  imageUrl?: string
  price: number | string
  quantity?: number
}

type CartSlice = { items: CartItem[] }

export default function HeaderCartBadge() {

  const items = useCart((s: CartSlice) => s.items)

  const { count, total } = useMemo(() => {
    const c = items.reduce<number>((acc, it) => acc + (it.quantity ?? 1), 0)
    const t = items.reduce<number>(
      (acc, it) => acc + Number(it.price ?? 0) * (it.quantity ?? 1),
      0
    )
    return { count: c, total: t }
  }, [items])

  const fmt = useMemo(
    () => new Intl.NumberFormat("nb-NO", { style: "currency", currency: "NOK" }),
    []
  )

  return (
    <Link href="/cart" className="relative inline-flex items-center" prefetch aria-label="Open cart">
      <ShoppingCart className="h-6 w-6 text-foreground hover:text-cyan-200" aria-hidden />
      {count > 0 && (
        <span
          className="absolute -right-2 -top-2 min-w-5 h-5 px-1 rounded-full bg-white text-green-800
                     text-[11px] font-bold leading-none flex items-center justify-center shadow"
          aria-label={`${count} items in cart`}
        >
          {count}
        </span>
      )}
      {count > 0 && (
        <span
          className="absolute left-1/2 top-7 -translate-x-1/2 text-[10px] leading-none
                     text-foreground/80 whitespace-nowrap"
        >
          {fmt.format(total)}
        </span>
      )}
    </Link>
  )
}