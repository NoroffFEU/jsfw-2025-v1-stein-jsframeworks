"use client";

import { SortKey } from "@/types/sort";

type Props = {
    value: SortKey;
    onChange: (v: SortKey) => void;
};

export default function SortSelect({ value, onChange }: Props) {
return (
    <select
    value={value}
    onChange={(e) => onChange(e.target.value as SortKey)}
    className="rounded border px-3 py-2 bg-neutral-800 hover:bg-neutral-600"
    aria-label="Sort products"
    >
        <option value="price-asc">Price: Low to High</option>
        <option value="price-desc">Price: High to Low</option>
        <option value="name-asc">Name: A to Z</option>
    </select>
);
}