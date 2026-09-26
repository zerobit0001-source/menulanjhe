"use client";

import type { MenuCategory, MenuProduct } from "@/features/menu/types/menu.types";
import Template004ProductCard from "./Template004ProductCard";

type Props = {
  category: MenuCategory;
  quantities: Record<string, number>;
  onAdd: (product: MenuProduct) => void;
  onIncrease: (product: MenuProduct) => void;
  onDecrease: (product: MenuProduct) => void;
};

export default function Template004ProductGrid({
  category,
  quantities,
  onAdd,
  onIncrease,
  onDecrease,
}: Props) {
  return (
    <section className="pt-6">
      <p className="mb-3 text-sm font-black text-gray-900">{category.name}</p>

      <div className="grid grid-cols-2 gap-3">
        {category.products.map((product, index) => (
          <Template004ProductCard
            key={product.id}
            product={product}
            colorIndex={index}
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
