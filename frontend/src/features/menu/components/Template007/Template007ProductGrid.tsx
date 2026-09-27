"use client";

import type { MenuCategory, MenuProduct } from "@/features/menu/types/menu.types";
import Template006ProductCard from "./Template007ProductCard";

type Props = {
  category: MenuCategory;
  quantities: Record<string, number>;
  onAdd: (product: MenuProduct) => void;
  onIncrease: (product: MenuProduct) => void;
  onDecrease: (product: MenuProduct) => void;
};

export default function Template007ProductGrid({
  category,
  quantities,
  onAdd,
  onIncrease,
  onDecrease,
}: Props) {
  return (
    <section className="pb-8 pt-2">
      <div className="mb-4 flex items-center gap-3">
        <h2 className="text-lg font-bold text-[#F5EBDD]">{category.name}</h2>
        <div className="h-px flex-1 bg-[#F5EBDD]/[0.08]" />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {category.products.map((product, index) => (
          <Template006ProductCard
            key={product.id}
            product={product}
            index={index}
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
