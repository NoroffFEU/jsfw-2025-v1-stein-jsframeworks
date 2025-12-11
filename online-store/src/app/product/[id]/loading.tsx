import Skeleton from "@/components/Skeleton";

export default function LoadingProduct() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-8">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <Skeleton className="aspect-square w-full rounded-2xl" />
        <section className="space-y-4">
          <Skeleton className="h-7 w-2/3" />
          <div className="flex gap-3">
            <Skeleton className="h-6 w-28" />
            <Skeleton className="h-6 w-20" />
          </div>
          <div className="flex gap-2">
            <Skeleton className="h-6 w-16 rounded-full" />
            <Skeleton className="h-6 w-16 rounded-full" />
          </div>
          <Skeleton className="h-10 w-40" />
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-5/6" />
          <Skeleton className="h-5 w-4/6" />
        </section>
      </div>
    </main>
  );
}
