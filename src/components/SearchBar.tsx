"use client";
type Props = {
    value: string;
    onChange: (v: string) => void;
    placeholder?: string;
};
export default function SearchBar({ value, onChange, placeholder = "Search products..." }: Props) {
 return (
    <input 
    value={value}
    onChange={(e) => onChange(e.target.value)}
    placeholder={placeholder}
    className="w-full max-w-xl px-4 py-2 focus:ring-cyan-200"
    aria-label="Search products"
    />
 );
}
