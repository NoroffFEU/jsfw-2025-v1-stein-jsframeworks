import Skeleton from "@/components/Skeleton";

export default function LoadingContact() {
  return (
    <main className="mx-auto max-w-xl px-4 py-10">
      <Skeleton className="mb-6 h-7 w-40" />
      <div className="space-y-4">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-32 w-full" />
        <Skeleton className="h-10 w-40 rounded-xl" />
      </div>
    </main>
  );
}