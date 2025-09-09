import Link from "next/link";
import type { Product } from "@/types/product";

function discountPercent(price: number, discounted?: number) {
  if (!discounted || discounted >= price) return null;
  return Math.round(((price - discounted) / price) * 100);
}

export default function ProductCard({ product }: { product: Product }) {
    const pct = discountPercent(product.price, product.discountedPrice);
    return (
        <Link href={`/product/${product.id}`} className="group relative rounded-2xl border p-4 shadow-sm hover:shadow-md transition">
        {pct !== null && (
            <span className="absolute left-3 top-3 z-10 rounded-full bg-rose-600 px-3 py-1 text-xs font-semibold text-white shadow"
            aria-label={`Discount ${pct}%`}>
                - {pct}%
            </span>
        )}
        {/* eslint-disable-next-line @next/next/no-img-element */}
     <img
        src={product.image?.url}
        alt={product.image?.alt ?? product.title}
        className="relative z-0 aspect-square w-full rounded-xl object-cover bg-gray-50 transition-transform duration-300 group-hover:scale-[1.03]"
        loading="lazy"
      />
      <div className="mt-3 space-y-1.5">
        <h3 className="line-clamp-2 text-base font-semibold">{product.title}</h3>
        <div className="flex items-baseline gap-2">
          {product.discountedPrice && product.discountedPrice < product.price && (
            <span className="text-lg font-semibold">{product.discountedPrice.toFixed(2)} kr</span>
          )}
          <span className={product.discountedPrice && product.discountedPrice < product.price ? "line-through opacity-60" : "text-lg font-semibold"}>
            {product.price.toFixed(2)} kr
          </span>
        </div>
        <div className="text-sm opacity-80">{"★".repeat(product.rating ?? 0) + "☆".repeat(5 - (product.rating ?? 0))}</div>
      </div>
    </Link>
  );
}