import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
// 👇 mock next/link til et vanlig <a>-element
import { vi } from "vitest";
vi.mock("next/link", () => ({
  default: ({ href, children, ...props }: any) => (
    <a href={href} {...props}>{children}</a>
  ),
}));

import ProductCard from "@/components/ProductCard";
import type { Product } from "@/types/product";

const base: Product = {
  id: "p1",
  title: "Test Product",
  description: "desc",
  price: 100,
  discountedPrice: 80,
  rating: 4,
  image: { url: "https://example.com/img.jpg", alt: "alt" },
  tags: ["tag"],
  reviews: [],
};

describe("ProductCard", () => {
  it("renders title and prices with discount sticker", () => {
    render(<ProductCard product={base} />);

    // Tittel
    expect(screen.getByText("Test Product")).toBeInTheDocument();

    // Rabattert pris
    expect(screen.getByText(/80\.00 kr/)).toBeInTheDocument();

    // Originalpris
    expect(screen.getByText(/100\.00 kr/)).toBeInTheDocument();

    // Rabattmerke -20% (rundingen i din komponent gir 20)
    expect(screen.getByLabelText(/Discount 20%/i)).toBeInTheDocument();
  });

  it("does not show sticker when no discount", () => {
    const p: Product = { ...base, discountedPrice: 100 };
    render(<ProductCard product={p} />);
    // Ingen tekst som matcher %-merket
    expect(screen.queryByText(/-20/)).not.toBeInTheDocument();
  });
});
