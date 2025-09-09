
import { describe, it, expect, vi, beforeEach, type Mock } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const addSpy = vi.fn();
vi.mock("@/store/cart", () => {
 const useCart = (selector?: (s: any) => any) => {
    const state = { add: addSpy };
    return selector ? selector(state) : state;
 };
    return { useCart };
});


// Mock sonner toast.
vi.mock("sonner", () => ({
  toast: {
    success: vi.fn(),
    info: vi.fn(),
    error: vi.fn(),
  },
}));


import { toast } from "sonner";
import AddToCartButton from "../AddToCartButton";

describe("AddToCartButton", () => {
  beforeEach(() => {
    addSpy.mockClear();
    (toast.success as unknown as Mock).mockClear?.();
  });

  it("calls cart.add with correct payload and shows success toast", async () => {
    const user = userEvent.setup();
    render(
      <AddToCartButton
        id="p1"
        title="Cool Product"
        imageUrl="https://example.com/img.jpg"
        price={123.45}
      />
    );

    await user.click(screen.getByRole("button", { name: /add to cart/i }));

    expect(addSpy).toHaveBeenCalledTimes(1);
    expect(addSpy).toHaveBeenCalledWith(
      { id: "p1", title: "Cool Product", price: 123.45, imageUrl: "https://example.com/img.jpg" },
      1
    );

    expect(toast.success).toHaveBeenCalledWith(expect.stringContaining("Cool Product"));
  });

  it("renders the button", () => {
    render(
      <AddToCartButton
        id="p2"
        title="Another"
        imageUrl=""
        price={10}
      />
    );
    expect(screen.getByRole("button", { name: /add to cart/i })).toBeInTheDocument();
  });
});