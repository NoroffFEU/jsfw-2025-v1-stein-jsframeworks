import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ProductsBrowser from '@/components/ProductsBrowser';
import type { Product } from '@/types/product';

const products: Product[] = [
    { id: '1', title: 'Alpha', price: 100, discountedPrice: 90, image: { url: "", alt: "" }, tags: ["aa"] },
    { id: '2', title: 'Bravo', price: 50, discountedPrice: 50, image: { url: "", alt: "" }, tags: ["bb"] },
    { id: '3', title: 'Charlie', price: 200, discountedPrice: 150, image: { url: "", alt: "" }, tags: ["cc"] },
];

function getCardTitles() {
    return screen.getAllByRole("heading", { level: 3 }).map(n => n.textContent?.trim());
}

describe("ProductsBrowser", () => {
    it("filters by debounced search", async () => {   
        render(<ProductsBrowser products={products} />);

        const input = screen.getByLabelText(/search products/i);
        await userEvent.type(input, "br");

        // Wait for debounce.
        await new Promise(r => setTimeout(r, 450));

        expect(screen.getByText("Bravo")).toBeInTheDocument();
        expect(screen.queryByText("Alpha")).not.toBeInTheDocument();
        expect(screen.queryByText("Charlie")).not.toBeInTheDocument();
    });

    it("sorts by price ascending/descending and by name", async () => {
        render(<ProductsBrowser products={products} />);

        const select = screen.getByLabelText(/sort products/i);

        await userEvent.selectOptions(select, "price-asc");
        expect(getCardTitles()).toMatch(/Bravo/);

        await userEvent.selectOptions(select, "price-desc");
        expect(getCardTitles()).toMatch(/Charlie/);

        await userEvent.selectOptions(select, "name-asc");
        expect(getCardTitles()).toMatch(/Alpha/);
    });


    it("shows suggestions under search", async () => {
        render(<ProductsBrowser products={products} />);

        const input = screen.getByLabelText(/search products/i);
        await userEvent.type(input, "a");
        await new Promise(r => setTimeout(r, 450));

        expect(screen.getByText("Alpha")).toBeInTheDocument();     
});
});