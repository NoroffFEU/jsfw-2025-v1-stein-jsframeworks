import Image from "next/image";
import { notFound } from "next/navigation";
import { fetchProduct } from "@/lib/api";
import type { Product } from "@/types/product";
import AddToCartButton from "./AddToCartButton";

export const revalidate = 0;

type PageProps = { params: Promise<{ id: string }> };

export default async function ProductPage({ params }: PageProps) {
  const { id } = await params;

  let product: Product | null = null;

  try {
    product = await fetchProduct(id);
  } catch {
    notFound();
  }

  if (!product) {
    return (
      <main className="mx-auto max-w-4xl px-4 py-10">
        <h1 className="mb-4 text-xl font-bold">
          Could not retrieve product
        </h1>
        <p className="mb-4">
          ID: <code>{id}</code>
        </p>
        <p className="mb-2">Raw response:</p>
        <pre className="overflow-auto rounded bg-gray-100 p-3 text-xs">
          {JSON.stringify(product, null, 2)}
        </pre>
      </main>
    );
  }

  const hasDiscount =
    typeof product.discountedPrice === "number" &&
    product.discountedPrice < product.price;

  const priceToUse = hasDiscount
    ? product.discountedPrice!
    : product.price;

  return (
    <main className="mx-auto max-w-5xl px-4 py-8">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <div className="relative aspect-square w-full overflow-hidden border bg-gray-50">
          <Image
            src={product.image?.url ?? "/placeholder.png"}
            alt={product.image?.alt ?? product.title}
            fill
            className="object-cover"
            sizes="(min-width: 768px) 50vw, 100vw"
            priority={false}
          />
        </div>
        <section className="space-y-4">
          <header>
            <h1 className="text-2xl font-bold">{product.title}</h1>
          </header>
          <div className="flex items-baseline gap-3">
            {hasDiscount && (
              <>
                <span className="text-2xl font-semibold text-emerald-600">
                  {product.discountedPrice!.toFixed(2)} kr
                </span>
                <span className="rounded bg-emerald-100 px-2 py-0.5 text-xs font-semibold text-emerald-700">
                  On sale
                </span>
              </>
            )}
            <span
              className={
                hasDiscount
                  ? "text-sm text-gray-500 line-through"
                  : "text-2xl font-semibold"
              }
            >
              {product.price !== undefined
                ? `${product.price.toFixed(2)} kr`
                : "N/A"}
            </span>
          </div>
          {product.tags?.length ? (
            <div className="flex flex-wrap gap-2">
              {product.tags.map((t) => (
                <span
                  key={t}
                  className="rounded-full border px-3 py-1 text-xs text-foreground"
                >
                  {t}
                </span>
              ))}
            </div>
          ) : null}
          <AddToCartButton
            id={product.id}
            title={product.title}
            imageUrl={product.image?.url ?? ""}
            price={priceToUse}
          />
          <article className="prose max-w-none">
            <h2 className="mt-6 text-lg font-semibold">Description</h2>
            <p className="whitespace-pre-wrap">
              {product.description ?? "No description."}
            </p>

            {product.reviews?.length ? (
              <>
                <h3 className="mt-6 font-semibold">Reviews</h3>
                <ul className="list-disc pl-6">
                  {product.reviews.map((r, i) => (
                    <li key={r.id ?? i}>
                      <strong>{r.username}</strong> — {r.rating}/5
                      {r.description ? `: ${r.description}` : ""}
                    </li>
                  ))}
                </ul>
              </>
            ) : null}
          </article>
        </section>
      </div>
    </main>
  );
}