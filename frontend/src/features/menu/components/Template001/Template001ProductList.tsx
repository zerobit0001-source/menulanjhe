"use client";

import type { MenuCategory, MenuProduct } from "../../types/menu.types";
import Template001ProductCard from "./Template001ProductCard";

type Props = {
  category: MenuCategory;
  quantities: Record<string, number>;
  onAdd: (product: MenuProduct) => void;
  onIncrease: (product: MenuProduct) => void;
  onDecrease: (product: MenuProduct) => void;
};

export default function Template001ProductList({
  category,
  quantities,
  onAdd,
  onIncrease,
  onDecrease,
}: Props) {
  return (
    <section className="mx-auto max-w-2xl px-4">
      <div className="py-5">
        <h2 className="text-lg font-black text-gray-900">{category.name}</h2>

        <p className="mt-1 text-[11px] text-gray-400">
          {category.products.length} محصول
        </p>
      </div>

      <div>
        {category.products.map((product) => (
          <Template001ProductCard
            key={product.id}
            product={product}
            quantity={quantities[product.id] ?? 0}
            onAdd={() => onAdd(product)}
            onIncrease={() => onIncrease(product)}
            onDecrease={() => onDecrease(product)}
          />
        ))}
      </div>
    </section>
  );
}
