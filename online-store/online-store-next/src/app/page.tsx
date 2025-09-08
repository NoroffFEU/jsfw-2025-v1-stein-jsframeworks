import { fetchProducts } from "@/lib/api";
import ProductCard from "@/components/ProductCard";
import ProductsBrowser from "@/components/ProductsBrowser";

export const revalidate = 0;

export default async function HomePage() {
  const products = await fetchProducts();

  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="mb-6 text-2xl font-bold">Products</h1>
      <ProductsBrowser products={products} />
    </main>
  );
}