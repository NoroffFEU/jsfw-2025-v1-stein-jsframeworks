import Skeleton from "@/components/Skeleton";

export default function LoadingCart() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <div className="mb-6 flex items-center gap-3">
        <Skeleton className="h-5 w-5 rounded-full" />
        <h1 className="text-2xl font-bold">Loading cart…</h1>
      </div>

      <ul className="divide-y rounded-2xl border border-white/10">
        {[0, 1, 2].map((i) => (
          <li key={i} className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-12">
            <Skeleton className="h-20 w-20 rounded sm:col-span-2" />
            <div className="space-y-2 sm:col-span-5">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-24" />
            </div>
            <div className="flex items-center gap-2 sm:col-span-3">
              <Skeleton className="h-9 w-8" />
              <Skeleton className="h-9 w-16" />
              <Skeleton className="h-9 w-8" />
            </div>
            <div className="sm:col-span-2 text-right">
              <Skeleton className="ml-auto h-4 w-16" />
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="opacity-70">Total:</span>
          <Skeleton className="h-5 w-24" />
        </div>
        <Skeleton className="h-10 w-32 rounded-xl" />
      </div>
    </main>
  );
}