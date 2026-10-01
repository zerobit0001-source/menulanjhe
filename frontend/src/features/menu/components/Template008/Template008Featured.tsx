"use client";
import type { T7Product } from "./bindings";
import { Template008ProductCard } from "./Template008ProductCard";

interface Props {
  products: T7Product[];
  quantityOf: (id: T7Product["id"]) => number;
  onAdd: (p: T7Product) => void;
  onIncrement: (id: T7Product["id"]) => void;
  onDecrement: (id: T7Product["id"]) => void;
}

export function Template008Featured({
  products,
  quantityOf,
  onAdd,
  onIncrement,
  onDecrement,
}: Props) {
  if (!products.length) return null;
  return (
    <section className="pt-5">
      <h2 className="mx-auto mb-3 max-w-5xl px-4 text-lg font-bold text-[#171717]">
        پرطرفدارها
      </h2>
      <div className="mx-auto flex max-w-5xl snap-x gap-3 overflow-x-auto px-4 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {products.map((p) => (
          <Template008ProductCard
            key={String(p.id)}
            variant="featured"
            product={p}
            quantity={quantityOf(p.id)}
            onAdd={() => onAdd(p)}
            onIncrement={() => onIncrement(p.id)}
            onDecrement={() => onDecrement(p.id)}
          />
        ))}
      </div>
    </section>
  );
}
