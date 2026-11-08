"use client";

import { motion } from "framer-motion";

import type { MenuProduct } from "@/features/menu/types/menu.types";
import { DotRow } from "./Ornaments";
import Template016ProductRow from "./Template016ProductRow";
import { DoubleRuleHeading, RectHeader } from "./Template016SectionHeader";
import type { Template016Block as BlockModel } from "./layout";
import { V016, formatNumber, type CartControls } from "./utils";

type Props = {
  block: BlockModel;
  controls: CartControls;
  /** Entrance-animation order. */
  index: number;
};

const enter = (index: number) => ({
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, delay: 0.08 + index * 0.07, ease: "easeOut" as const },
});

function Products({
  products,
  controls,
  shape,
}: {
  products: MenuProduct[];
  controls: CartControls;
  shape: "circle" | "block" | "plain";
}) {
  return (
    <ul>
      {products.map((product) => (
        <Template016ProductRow
          key={product.id}
          product={product}
          controls={controls}
          shape={shape}
        />
      ))}
    </ul>
  );
}

/** Renders one block of the printed-menu composition. */
export default function Template016Block({ block, controls, index }: Props) {
  if (block.kind === "special") {
    return (
      <motion.section {...enter(index)} aria-label="منوی ویژه">
        <DoubleRuleHeading title="منوی ویژه" />

        <div className="pt-1">
          <Products products={block.products} controls={controls} shape="block" />
        </div>
      </motion.section>
    );
  }

  const { category, variant } = block;
  const count = `${formatNumber(category.products.length)} محصول`;

  if (variant === "drink") {
    return (
      <motion.section
        {...enter(index)}
        aria-label={category.name}
        className="px-4 pb-4 pt-5"
        style={{
          backgroundColor: V016.brown,
          color: V016.bg,
          boxShadow: `inset 0 0 0 3px ${V016.brown}, inset 0 0 0 4px ${V016.cream}77`,
        }}
      >
        <h3 className="text-center text-3xl font-black leading-10">
          {category.name}
        </h3>

        <DotRow className="my-2 opacity-70" />

        <ul>
          {category.products.map((product) => (
            <Template016ProductRow
              key={product.id}
              product={product}
              controls={controls}
              shape="plain"
              layout="inline"
              onDark
            />
          ))}
        </ul>
      </motion.section>
    );
  }

  const shape = variant === "list" ? "plain" : "circle";

  return (
    <motion.section {...enter(index)} aria-label={category.name}>
      <RectHeader title={category.name} count={count} />

      <div className="pt-1">
        <Products products={category.products} controls={controls} shape={shape} />
      </div>
    </motion.section>
  );
}
