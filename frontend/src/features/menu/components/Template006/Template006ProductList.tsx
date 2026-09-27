"use client";

import { motion } from "framer-motion";

import type {
  MenuCategory,
  MenuProduct,
} from "@/features/menu/types/menu.types";

import Template006ProductCard from "./Template006ProductCard";

type Props = {
  category: MenuCategory;
  quantities: Record<string, number>;
  onAdd: (product: MenuProduct) => void;
  onIncrease: (product: MenuProduct) => void;
  onDecrease: (product: MenuProduct) => void;
};

export default function Template006ProductList({
  category,
  quantities,
  onAdd,
  onIncrease,
  onDecrease,
}: Props) {
  return (
    <section className="mx-auto max-w-5xl px-4 pb-9">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        className="mb-4"
      >
        <h2 className="text-2xl font-black">{category.name}</h2>

        {category.description && (
          <p className="mt-2 text-xs leading-6 text-white/30">
            {category.description}
          </p>
        )}
      </motion.div>

      <div className="space-y-3">
        {category.products.map((product, index) => (
          <Template006ProductCard
            key={product.id}
            product={product}
            quantity={quantities[product.id] ?? 0}
            index={index}
            onAdd={onAdd}
            onIncrease={onIncrease}
            onDecrease={onDecrease}
          />
        ))}
      </div>
    </section>
  );
}
