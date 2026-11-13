"use client";

import { motion, useReducedMotion } from "framer-motion";

import type { MenuCategory } from "@/features/menu/types/menu.types";
import Template018ProductCard from "./Template018ProductCard";
import { TechLabel } from "./TechDetails";
import { N018, pad, sectionId, type CartControls } from "./utils";

type Props = {
  category: MenuCategory;
  index: number;
  controls: CartControls;
};

export default function Template018CategorySection({
  category,
  index,
  controls,
}: Props) {
  const reduce = useReducedMotion();
  const titleId = `${sectionId(category.id)}-title`;

  return (
    <motion.section
      id={sectionId(category.id)}
      data-category-id={category.id}
      aria-labelledby={titleId}
      initial={{ opacity: 0, y: reduce ? 0 : 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="pt-8 first:pt-6 lg:pt-10 lg:first:pt-0"
    >
      <header className="mb-4 flex items-center gap-3">
        <span
          className="flex h-9 min-w-9 items-center justify-center rounded-lg px-2"
          style={{ border: `1px solid ${N018.accent}` }}
        >
          <TechLabel accent>{pad(index + 1)}</TechLabel>
        </span>

        <h2 id={titleId} className="text-2xl font-black leading-tight lg:text-3xl">
          {category.name}
        </h2>

        <span aria-hidden className="h-px flex-1" style={{ backgroundColor: N018.line }} />

        <TechLabel>{pad(category.products.length)} items</TechLabel>
      </header>

      <ul className="grid gap-3 sm:grid-cols-2">
        {category.products.map((product) => (
          <Template018ProductCard
            key={product.id}
            product={product}
            controls={controls}
          />
        ))}
      </ul>
    </motion.section>
  );
}
