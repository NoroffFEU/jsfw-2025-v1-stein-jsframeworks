import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-16 text-center">
      <h1 className="mb-2 text-2xl font-bold">Product not found</h1>
      <p className="mb-6">Could not find product, please try again.</p>
      <Link href="/" className="rounded border px-4 py-2 hover:bg-neutral-50">
        To homepage
      </Link>
    </main>
  );
}