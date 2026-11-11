"use client";

import { motion, useReducedMotion } from "framer-motion";

import type { MenuCategory } from "@/features/menu/types/menu.types";
import Template017ProductItem from "./Template017ProductItem";
import {
  E017,
  folio,
  formatNumber,
  sectionId,
  type CartControls,
} from "./utils";

type Props = {
  category: MenuCategory;
  index: number;
  controls: CartControls;
};

/**
 * Each category is a spread: a sticky heading column and a product grid.
 * Odd sections flip sides on desktop, so the page
 * doesn't read as one repeated block.
 */
export default function Template017CategorySection({
  category,
  index,
  controls,
}: Props) {
  const reduce = useReducedMotion();
  const flipped = index % 2 === 1;

  return (
    <motion.section
      id={sectionId(category.id)}
      data-category-id={category.id}
      aria-labelledby={`${sectionId(category.id)}-title`}
      initial={{ opacity: 0, y: reduce ? 0 : 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="grid gap-5 py-8 lg:grid-cols-12 lg:gap-12 lg:py-14"
    >
      <header
        className={`lg:col-span-4 ${flipped ? "lg:order-2" : ""}`}
      >
        <div className="lg:sticky lg:top-20">
          <span
            aria-hidden
            className="block text-6xl font-black leading-none lg:text-8xl"
            style={{ color: E017.soft }}
          >
            {folio(index)}
          </span>

          <h2
            id={`${sectionId(category.id)}-title`}
            className="-mt-3 text-3xl font-black leading-tight lg:-mt-5 lg:text-5xl"
          >
            {category.name}
          </h2>

          <p className="mt-3 flex items-center gap-3 text-xs font-bold" style={{ color: E017.accent }}>
            <span aria-hidden className="h-px w-6" style={{ backgroundColor: E017.accent }} />
            {formatNumber(category.products.length)} محصول
          </p>
        </div>
      </header>

      <ul
        className={`grid gap-x-10 sm:grid-cols-2 lg:col-span-8 ${flipped ? "lg:order-1" : ""}`}
        style={{ alignContent: "start" }}
      >
        {category.products.map((product) => (
          <Template017ProductItem
            key={product.id}
            product={product}
            controls={controls}
          />
        ))}
      </ul>
    </motion.section>
  );
}
