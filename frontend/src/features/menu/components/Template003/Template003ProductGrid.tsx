"use client";

import type { MenuCategory, MenuProduct } from "@/features/menu/types/menu.types";
import Template003ProductCard from "./Template003ProductCard";

type Props = {
  category: MenuCategory;
  quantities: Record<string, number>;
  onAdd: (product: MenuProduct) => void;
  onIncrease: (product: MenuProduct) => void;
  onDecrease: (product: MenuProduct) => void;
};

export default function Template003ProductGrid({
  category,
  quantities,
  onAdd,
  onIncrease,
  onDecrease,
}: Props) {
  return (
    <section className="pt-6">
      <p className="mb-3 text-sm font-black text-[#1A1A1A]">{category.name}</p>

      <div className="grid grid-cols-2 gap-3">
        {category.products.map((product) => (
          <Template003ProductCard
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
