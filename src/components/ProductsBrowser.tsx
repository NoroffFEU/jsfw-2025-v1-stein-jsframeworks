"use client";

import { useEffect, useMemo, useState } from "react";
import { useDebounce } from "@/hooks/useDebounce";
import type { Product } from "@/types/product";
import type { SortKey } from "@/types/sort";
import SearchBar from "@/components/SearchBar";
import SortSelect from "@/components/SortSelect";
import ProductCard from "@/components/ProductCard";
import Link from "next/link";
import { toast } from "sonner";

type Props = { products: Product[] };

function norm(str: string) {
    return (str ?? "").toLowerCase();
}

function getEffectivePrice(p: Product) {
    return typeof p.discountedPrice === "number" && p.discountedPrice < p.price
        ? p.discountedPrice
        : p.price; 
}

export default function ProductsBrowser({ products }: Props) {
    const [rawQuery, setRawQuery] = useState("");
    const query = useDebounce(rawQuery, 400);
    const [sort, setSort] = useState<SortKey>("price-asc");
    const [showSuggestions, setShowSuggestions] = useState(false);

    const filtered = useMemo(() => {
        const q = norm(query);
        if(!q) return products;
        return products.filter((p) => {
            const inTitle = norm(p.title).includes(q);
            const inTags  = (p.tags ?? []).some((t) => norm(t).includes(q));
            return inTitle || inTags;
        });
}, [products, query]);


  const sorted = useMemo(() => {
    const arr = [...filtered];
    switch (sort) {
      case "price-asc":
        return arr.sort((a, b) => getEffectivePrice(a) - getEffectivePrice(b));
      case "price-desc":
        return arr.sort((a, b) => getEffectivePrice(b) - getEffectivePrice(a));
      case "name-asc":
        return arr.sort((a, b) => norm(a.title).localeCompare(norm(b.title)));
      default:
        return arr;
    }
  }, [filtered, sort]);

  
  useEffect(() => {
    if (query && filtered.length === 0) {
      toast.info("No results on this search.");
    }
  }, [query, filtered.length]);

  
  const suggestions = useMemo(() => {
    if (!query) return [];
    return filtered.slice(0, 6);
  }, [filtered, query]);

  return (
    <section>
      <div className="sticky top-[56px] rounded z-30 mb-4 bg-neutral-800 backdrop-blur">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
          <SearchBar
            value={rawQuery}
            onChange={(v) => {
              setRawQuery(v);
              setShowSuggestions(true);
            }}
          />
          <SortSelect value={sort} onChange={setSort} />
        </div>

        {showSuggestions && query && (
          <div className="mx-auto max-w-6xl px-4">
            <div className="mb-3 rounded-xl border bg-neutral-800 p-2 shadow-sm"
            data-testid="suggestions"
            >
              {suggestions.length > 0 ? (
                <ul>
                  {suggestions.map((p) => (
                    <li key={p.id}>
                      <Link
                        href={`/product/${p.id}`}
                        className="block rounded-lg px-3 py-2 hover:bg-neutral-600"
                        onClick={() => setShowSuggestions(false)}
                      >
                        {p.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="px-3 py-2 text-sm opacity-70">
                  No suggestions - try another search.
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      <div className="mx-auto max-w-6xl px-4">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {sorted.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </section>
  );
}