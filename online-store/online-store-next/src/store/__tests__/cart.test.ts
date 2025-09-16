import { describe, it, expect, beforeEach } from "vitest";
import { useCart } from "@/store/cart";


beforeEach(() => {
 // Reset the cart state before each test
 useCart.setState({ items: [] });
 if (typeof localStorage !== "undefined") {
    localStorage.removeItem("cart");
 }  
});

describe("useCart Store", () => {
    it("adds a new item to the cart", () => {
    const { add } = useCart.getState();
    add({ id: "1", title: "Product 1", price: 100, imageUrl: "" }, 1); 
    
    const items = useCart.getState().items;
    expect(items).toHaveLength(1);
    expect(items[0].quantity).toBe(1);
});


 it("increments quantity when adding same item", () => {
    const { add } = useCart.getState();
    add({ id: "1", title: "A", price: 100, imageUrl: "" }, 1);
    add({ id: "1", title: "A", price: 100, imageUrl: "" }, 2);

    const item = useCart.getState().items[0];
    expect(item.quantity).toBe(3);
  });

  it("setQty respects minimum 1", () => {
    const { add, setQty } = useCart.getState();
    add({ id: "1", title: "A", price: 100, imageUrl: "" }, 1);
    setQty("1", 0);

    const item = useCart.getState().items[0];
    expect(item.quantity).toBe(1);
  });

  it("removes an item", () => {
    const { add, remove } = useCart.getState();
    add({ id: "1", title: "A", price: 100, imageUrl: "" }, 1);
    remove("1");

    expect(useCart.getState().items).toHaveLength(0);
  });

  it("calculates total correctly", () => {
    const { add, total } = useCart.getState();
    add({ id: "1", title: "A", price: 100, imageUrl: "" }, 2); // 200
    add({ id: "2", title: "B", price: 50, imageUrl: "" }, 3);  // 150
    expect(total()).toBe(350);
  });
});
