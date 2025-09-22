import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import React from "react";

vi.mock("next/link", () => ({
  default: (
    props: React.AnchorHTMLAttributes<HTMLAnchorElement> & {
      href: string;
      children: React.ReactNode;
    }
  ) => {
    const { href, children, ...rest } = props;
    return (
      <a href={href} {...rest}>
        {children}
      </a>
    );
  },
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

    expect(screen.getByText("Test Product")).toBeInTheDocument();
    expect(screen.getByText(/80\.00 kr/)).toBeInTheDocument();
    expect(screen.getByText(/100\.00 kr/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Discount 20%/i)).toBeInTheDocument();
  });

  it("does not show sticker when no discount", () => {
    const p: Product = { ...base, discountedPrice: 100 };
    render(<ProductCard product={p} />);
    expect(screen.queryByText(/-20/)).not.toBeInTheDocument();
  });
});
