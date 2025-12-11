import { ShoppingCart, Store } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-10 border-t bg-background/70">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 px-4 py-6 text-sm text-foreground md:flex-row">
        
        <div className="flex items-center gap-2 font-medium text-foreground">
          <Store size={16} />
          <span>Online Store</span>
        </div>
        <nav className="flex items-center gap-6">
          <Link href="/" className="hover:text-cyan-200">
            Home
          </Link>
          <Link href="/products" className="hover:text-cyan-200">
            Products
          </Link>
          <Link href="/cart" className="flex items-center gap-1 hover:text-cyan-200">
            <ShoppingCart size={16} /> Cart
          </Link>
        </nav>
        <div className="text-xs opacity-70">
          © {new Date().getFullYear()} Online Store
        </div>
      </div>
    </footer>
  );
}