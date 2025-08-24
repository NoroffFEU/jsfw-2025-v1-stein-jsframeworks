"use client";

type Props = {
  title: string;
};

export default function AddToCartButton({ title }: Props) {
  return (
    <button
      onClick={() => alert(`"${title}" lagt i handlekurven (demo)`)}
      className="rounded-xl bg-black px-5 py-3 text-white transition hover:bg-neutral-800"
    >
      Add to Cart
    </button>
  );
}