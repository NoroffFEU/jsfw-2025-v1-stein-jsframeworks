import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";


type CartItem = { id: string; title: string; price: number; imageUrl: string };
type AddFn = (item: CartItem, qty: number) => void;
type CartState = { add: AddFn };

const addSpy = vi.fn<AddFn>();

vi.mock("@/store/cart", () => {

  const useCart = <T,>(selector?: (s: CartState) => T) => {
    const state: CartState = { add: addSpy };
    return selector ? selector(state) : (state as unknown as T);
  };
  return { useCart };
});

vi.mock("sonner", () => ({
  toast: { success: vi.fn(), info: vi.fn(), error: vi.fn() },
}));

import { toast } from "sonner";
import AddToCartButton from "../AddToCartButton";

describe("AddToCartButton", () => {
  beforeEach(() => {
    addSpy.mockClear();
    vi.mocked(toast.success).mockClear?.();
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

    expect(addSpy).toHaveBeenCalledWith(
      {
        id: "p1",
        title: "Cool Product",
        price: 123.45,
        imageUrl: "https://example.com/img.jpg",
      },
      1
    );
    expect(toast.success).toHaveBeenCalledWith(
      expect.stringContaining("Cool Product")
    );
  });

  it("renders the button", () => {
    render(
      <AddToCartButton id="p2" title="Another" imageUrl="" price={10} />
    );
    expect(
      screen.getByRole("button", { name: /add to cart/i })
    ).toBeInTheDocument();
  });
});