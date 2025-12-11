import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useCart } from "@/store/cart";
import CartPage from "../page";

beforeEach(() => {
  useCart.setState({ items: [] });
});

describe("CartPage", () => {
  it("renders cart items and total", () => {
    useCart.getState().add({ id: "1", title: "Apple", price: 10, imageUrl: "" }, 2);
    useCart.getState().add({ id: "2", title: "Banana", price: 5, imageUrl: "" }, 3);

    render(<CartPage />);

    expect(screen.getByText("Apple")).toBeInTheDocument();
    expect(screen.getByText("Banana")).toBeInTheDocument();
    expect(screen.getByText(/35/)).toBeInTheDocument();
  });

  it("removes an item when remove button is clicked", async () => {
    const user = userEvent.setup();
    useCart.getState().add({ id: "1", title: "Apple", price: 10, imageUrl: "" }, 1);

    render(<CartPage />);

    await user.click(screen.getByRole("button", { name: /remove/i }));

    expect(screen.queryByText("Apple")).not.toBeInTheDocument();
  });
});