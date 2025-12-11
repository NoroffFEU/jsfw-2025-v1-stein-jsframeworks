import { it, expect } from "vitest";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ProductsBrowser from "@/components/ProductsBrowser";
import type { Product } from "@/types/product";

const products: Product[] = [
  { id: "1", title: "Alpha", price: 100, discountedPrice: 90, rating: 4, image: { url: "", alt: "" } },
  { id: "2", title: "Bravo", price: 50,  discountedPrice: 50, rating: 3, image: { url: "", alt: "" } },
  { id: "3", title: "Charlie", price: 200, discountedPrice: 150, rating: 5, image: { url: "", alt: "" } },
];

function firstCardTitle() {
  const titles = screen.getAllByRole("heading", { level: 3 });
  return titles[0]?.textContent?.trim() ?? "";
}

it("sorts by price asc/desc and name", async () => {
  render(<ProductsBrowser products={products} />);
  const select = screen.getByLabelText(/sort products/i);

  await userEvent.selectOptions(select, "price-asc");
  expect(firstCardTitle()).toBe("Bravo");   // billigst først

  await userEvent.selectOptions(select, "price-desc");
  expect(firstCardTitle()).toBe("Charlie"); // dyrest først

  await userEvent.selectOptions(select, "name-asc");
  expect(firstCardTitle()).toBe("Alpha");   // A→Å
});


  it("shows suggestions under search", async () => {
  render(<ProductsBrowser products={products} />);

  const input = screen.getByLabelText(/search products/i);
  await userEvent.type(input, "a");
  await new Promise((r) => setTimeout(r, 450)); // debounce

  const box = screen.getByTestId("suggestions");
  expect(within(box).getByText("Alpha")).toBeInTheDocument();
  expect(within(box).getAllByText("Alpha")).toHaveLength(1);
});
