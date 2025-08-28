import { fetchProduct } from '@/lib/api';
import type { Product } from '@/types/product';
import { notFound } from 'next/navigation';
import AddToCartButton from './AddToCartButton';

export const revalidate = 0;

type PageProps = { params: Promise<{ id: string }> };


export default async function ProductPage({ params }: PageProps) {
const { id } = await params;
let product: Product | null = null;

try {
  product = await fetchProduct(id);
} catch (e) {
    notFound();
}
if (!product) {
    // notFound();
 return (
      <main className="mx-auto max-w-4xl px-4 py-10">
        <h1 className="mb-4 text-xl font-bold">Kunne ikke hente produkt</h1>
        <p className="mb-4">ID: <code>{id}</code></p>
        <p className="mb-2">Rå-respons:</p>
        <pre className="rounded bg-gray-100 p-3 text-xs overflow-auto">
{JSON.stringify(product, null, 2)}
        </pre>
      </main>
    );

}


const hasDiscount =
  typeof product.discountedPrice === "number" &&
  product.discountedPrice < product.price;

const priceToUse = hasDiscount ? product.discountedPrice! : product.price;

return ( 
    <main className="mx-auto max-w-5xl px-4 py-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
                src={product.image?.url} 
                alt={product.image?.alt ?? product.title} 
                className="w-full rounded border object-cover" 
                />

            <section className="space-y-4">
                <h1 className="text-2xl font-bold">{product.title}</h1>

                <div className="flex items-baseline gap-3">
                    {hasDiscount && (<span className="text-2xl font-semibold">
                        {product.discountedPrice!.toFixed(2)} kr
                    </span>
                )}
                <span 
                className={
                    hasDiscount ? "line-through opacity-60" : "text-2xl font-semibold"
                }
                >
                         {product.price !== undefined ? `${product.price.toFixed(2)} kr` : "N/A"}
                    </span>
                </div>

                {product.tags?.length ? (
                    <div className="flex flex-wrap gap-2">
                        {product.tags.map((t) => (
                            <span key={t} className="rouned-full border px-3 py-1 text-xs">
                                {t}
                                </span>
                        ))}
                    </div>
                ) : null}

                {/* Add to Cart – placeholder */}
                <AddToCartButton 
                id={product.id}
                title={product.title}
                imageUrl={product.image?.url ?? ""}
                price={priceToUse} />

{/* Description & Reviews */}
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