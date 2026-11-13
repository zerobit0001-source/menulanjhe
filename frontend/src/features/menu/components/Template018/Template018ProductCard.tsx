"use client";

import { motion } from "framer-motion";

import type { MenuProduct } from "@/features/menu/types/menu.types";
import Template018AddControl from "./Template018AddControl";
import { CornerTicks } from "./TechDetails";
import { N018, formatPrice, type CartControls } from "./utils";

type Props = {
  product: MenuProduct;
  controls: CartControls;
};

/**
 * Panel card. With a real image: framed image on top. Without one: a
 * typography-only card (no empty box, no placeholder).
 */
export default function Template018ProductCard({ product, controls }: Props) {
  const quantity = controls.quantities[product.id] ?? 0;
  const unavailable = !product.available;
  const inCart = quantity > 0;

  return (
    <motion.li
      layout="position"
      whileHover={unavailable ? undefined : { backgroundColor: N018.panelHover }}
      transition={{ duration: 0.18 }}
      className="relative flex flex-col rounded-2xl p-4"
      style={{
        border: `1px solid ${inCart ? N018.accent : N018.line}`,
        backgroundColor: N018.panel,
        opacity: unavailable ? 0.6 : 1,
      }}
    >
      {product.image && (
        <div className="relative mb-4 aspect-[16/10] overflow-hidden rounded-xl">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="h-full w-full object-cover"
            style={{ filter: unavailable ? "grayscale(1)" : undefined }}
          />

          <CornerTicks color="rgba(217,218,220,0.55)" />
        </div>
      )}

      <div className="flex items-start justify-between gap-3">
        <h3 className="text-base font-black leading-7">{product.name}</h3>

        <p
          className="shrink-0 text-base font-black tabular-nums"
          style={{ color: N018.accent }}
        >
          {formatPrice(product.price)}
        </p>
      </div>

      {product.description && (
        <p
          className="mt-1 line-clamp-3 text-[13px] leading-7"
          style={{ color: N018.muted }}
        >
          {product.description}
        </p>
      )}

      <div
        className="mt-4 flex items-center justify-end pt-3"
        style={{ borderTop: `1px dashed ${N018.line}` }}
      >
        <Template018AddControl
          product={product}
          quantity={quantity}
          onAdd={controls.onAdd}
          onDecrease={controls.onDecrease}
        />
      </div>
    </motion.li>
  );
}
