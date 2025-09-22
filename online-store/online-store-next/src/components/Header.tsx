
import Link from 'next/link';
import HeaderCartBadge from "@/components/HeaderCartBadge";

export default function Header() {
  return (
    console.log("Header rendered"),
    <header className="sticky top-0 z-40 border-b bg-black/90 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="text-lg font-bold">
          Online Store
        </Link>

        <div className="flex items-center gap-6">
          <Link href="/contact" className="underline hover:no-underline">
            Contact
          </Link>
          <HeaderCartBadge />
        </div>
      </nav>
    </header>
  );
}