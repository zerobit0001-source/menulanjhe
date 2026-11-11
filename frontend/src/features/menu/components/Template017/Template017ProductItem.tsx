"use client";

import { motion } from "framer-motion";

import type { MenuProduct } from "@/features/menu/types/menu.types";
import Template017AddControl from "./Template017AddControl";
import { E017, formatPrice, type CartControls } from "./utils";

type Props = {
  product: MenuProduct;
  controls: CartControls;
};

/**
 * With a real image: image-led card. Without one: a typographic row
 * (no placeholder box is ever drawn).
 */
export default function Template017ProductItem({ product, controls }: Props) {
  const quantity = controls.quantities[product.id] ?? 0;
  const unavailable = !product.available;
  const hasDiscount =
    typeof product.originalPrice === "number" &&
    product.originalPrice > product.price;

  return (
    <motion.li
      layout="position"
      className="group flex flex-col pt-4"
      style={{ borderTop: `1px solid ${E017.border}`, opacity: unavailable ? 0.6 : 1 }}
    >
      {product.image && (
        <div
          className="mb-4 aspect-[4/3] overflow-hidden"
          style={{ backgroundColor: E017.soft }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            style={{ filter: unavailable ? "grayscale(1)" : undefined }}
          />
        </div>
      )}

      <div className="flex items-baseline justify-between gap-4">
        <h3 className="text-lg font-black leading-7">{product.name}</h3>

        <p className="shrink-0 text-base font-black tabular-nums" style={{ color: E017.accent }}>
          {formatPrice(product.price)}
        </p>
      </div>

      {hasDiscount && (
        <p
          className="mt-0.5 text-left text-xs tabular-nums line-through"
          style={{ color: E017.muted }}
        >
          {formatPrice(product.originalPrice as number)}
        </p>
      )}

      {product.description && (
        <p
          className="mt-1.5 line-clamp-3 max-w-md text-[13px] leading-7"
          style={{ color: E017.muted }}
        >
          {product.description}
        </p>
      )}

      <div className="mb-5 mt-3">
        <Template017AddControl
          product={product}
          quantity={quantity}
          onAdd={controls.onAdd}
          onDecrease={controls.onDecrease}
        />
      </div>
    </motion.li>
  );
}
