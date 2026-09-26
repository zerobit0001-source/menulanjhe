"use client";

import type {
  MenuCategory,
  MenuProduct,
} from "@/features/menu/types/menu.types";
import Template002ProductRow from "./Template002ProductRow";

type Props = {
  category: MenuCategory;
  quantities: Record<string, number>;
  onAdd: (product: MenuProduct) => void;
  onIncrease: (product: MenuProduct) => void;
  onDecrease: (product: MenuProduct) => void;
};

export default function Template002ProductList({
  category,
  quantities,
  onAdd,
  onIncrease,
  onDecrease,
}: Props) {
  return (
    <section className="pt-8">
      <div className="mb-4 flex items-center gap-3">
        <h2 className="whitespace-nowrap text-lg font-bold text-[#F2EDE4]">
          {category.name}
        </h2>
        <div className="h-px flex-1 bg-[#3A332C]" />
      </div>

      <div className="flex flex-col divide-y divide-[#2A241F]">
        {category.products.map((product) => (
          <Template002ProductRow
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
