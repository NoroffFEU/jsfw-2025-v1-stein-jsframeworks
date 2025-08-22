import type { Product } from "@/types/product";

const BASE = "https://v2.api.noroff.dev/online-shop";


export async function fetchProducts(): Promise<Product[]> {
    const response = await fetch(BASE, { cache: "no-store"});
    if(!response.ok) throw new Error("Failed to fetch products");
    const json = await response.json();
    return json.data as Product[];
}

export async function fetchProduct(id: string): Promise<Product> {
    const response = await fetch(`${BASE}/${id}`, { cache: "no-store" });
    if (!response.ok) throw new Error("Failed to fetch product");
    const json = await response.json();
    return json as Product;
}