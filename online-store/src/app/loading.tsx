import Skeleton from "@/components/Skeleton";

export default function LoadingHome() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      <Skeleton className="mb-6 h-7 w-48" />
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="space-y-3 rounded-2xl border border-white/10 p-3">
            <Skeleton className="aspect-[4/5] w-full rounded-xl" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/3" />
          </div>
        ))}
      </div>
    </main>
  );
}