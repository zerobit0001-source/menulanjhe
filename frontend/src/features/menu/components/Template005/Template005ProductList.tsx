"use client";

import type {
  MenuCategory,
  MenuProduct,
} from "@/features/menu/types/menu.types";
import Template005ProductCard from "./Template005ProductCard";


type Props = {
  category: MenuCategory;
  quantities: Record<string, number>;
  onAdd: (product: MenuProduct) => void;
  onIncrease: (product: MenuProduct) => void;
  onDecrease: (product: MenuProduct) => void;
};

export default function Template005ProductList({
  category,
  quantities,
  onAdd,
  onIncrease,
  onDecrease,
}: Props) {
  return (
    <section className="mx-auto max-w-5xl px-4 pb-8">
      <div className="mb-4">
        <h2 className="text-xl font-black text-slate-950">{category.name}</h2>

        {category.description && (
          <p className="mt-1 text-xs leading-6 text-slate-400">
            {category.description}
          </p>
        )}
      </div>

      <div className="space-y-3">
        {category.products.map((product) => (
          <Template005ProductCard
            key={product.id}
            product={product}
            quantity={quantities[product.id] ?? 0}
            onAdd={onAdd}
            onIncrease={onIncrease}
            onDecrease={onDecrease}
          />
        ))}
      </div>
    </section>
  );
}
