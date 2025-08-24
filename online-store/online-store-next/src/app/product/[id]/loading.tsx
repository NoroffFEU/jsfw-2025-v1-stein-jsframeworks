export default function LoadingProduct() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-8">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <div className="aspect-square w-full animate-pulse rounded-2xl bg-gray-100" />
        <section className="space-y-4">
          <div className="h-7 w-2/3 animate-pulse rounded bg-gray-100" />
          <div className="flex gap-3">
            <div className="h-6 w-28 animate-pulse rounded bg-gray-100" />
            <div className="h-6 w-20 animate-pulse rounded bg-gray-100" />
          </div>
          <div className="flex gap-2">
            <div className="h-6 w-16 animate-pulse rounded-full bg-gray-100" />
            <div className="h-6 w-16 animate-pulse rounded-full bg-gray-100" />
          </div>
          <div className="h-10 w-40 animate-pulse rounded bg-gray-100" />
          <div className="h-5 w-full animate-pulse rounded bg-gray-100" />
          <div className="h-5 w-5/6 animate-pulse rounded bg-gray-100" />
          <div className="h-5 w-4/6 animate-pulse rounded bg-gray-100" />
        </section>
      </div>
    </main>
  );
}