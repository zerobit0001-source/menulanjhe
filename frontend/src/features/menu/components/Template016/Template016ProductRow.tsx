"use client";

import { motion } from "framer-motion";

import type { MenuProduct } from "@/features/menu/types/menu.types";
import Template016AddControl from "./Template016AddControl";
import Template016PriceTag, { type PriceShape } from "./Template016PriceTag";
import { V016, type CartControls } from "./utils";

type Props = {
  product: MenuProduct;
  controls: CartControls;
  shape: PriceShape;
  /** `inline` = compact drink row: name ···· price, tiny description under it. */
  layout?: "stacked" | "inline";
  onDark?: boolean;
};

export default function Template016ProductRow({
  product,
  controls,
  shape,
  layout = "stacked",
  onDark = false,
}: Props) {
  const quantity = controls.quantities[product.id] ?? 0;
  const unavailable = !product.available;

  const nameColor = onDark ? V016.bg : V016.dark;
  const descColor = onDark ? `${V016.cream}CC` : V016.muted;

  const availability = unavailable && (
    <span
      className="rounded-sm px-1.5 py-0.5 text-[10px] font-bold"
      style={{
        border: `1px solid ${onDark ? V016.cream : V016.border}`,
        color: onDark ? V016.cream : V016.muted,
      }}
    >
      ناموجود
    </span>
  );

  if (layout === "inline") {
    return (
      <motion.li
        whileHover={{ x: -2 }}
        transition={{ duration: 0.15 }}
        className="py-2.5"
        style={{ opacity: unavailable ? 0.65 : 1 }}
      >
        <div className="flex items-baseline gap-2">
          <h4 className="text-sm font-black" style={{ color: nameColor }}>
            {product.name}
          </h4>

          {availability}

          <span
            aria-hidden
            className="flex-1 translate-y-[-3px] border-b border-dotted"
            style={{ borderColor: `${onDark ? V016.cream : V016.border}99` }}
          />

          <Template016PriceTag price={product.price} shape="plain" onDark={onDark} />
        </div>

        <div className="mt-1 flex items-center justify-between gap-3">
          {product.description ? (
            <p
              className="line-clamp-1 text-[11px] leading-5"
              style={{ color: descColor }}
            >
              {product.description}
            </p>
          ) : (
            <span />
          )}

          <Template016AddControl
            product={product}
            quantity={quantity}
            onAdd={controls.onAdd}
            onDecrease={controls.onDecrease}
            onDark={onDark}
          />
        </div>
      </motion.li>
    );
  }

  return (
    <motion.li
      whileHover={{ backgroundColor: `${V016.cream}88` }}
      transition={{ duration: 0.18 }}
      className="flex items-center justify-between gap-3 rounded-sm px-1.5 py-3"
      style={{
        borderBottom: `1px dotted ${V016.border}`,
        opacity: unavailable ? 0.65 : 1,
      }}
    >
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <h4 className="text-[15px] font-black leading-6" style={{ color: nameColor }}>
            {product.name}
          </h4>

          {availability}
        </div>

        {product.description && (
          <p
            className="mt-0.5 line-clamp-2 text-[11px] leading-5"
            style={{ color: descColor }}
          >
            {product.description}
          </p>
        )}

        <div className="mt-2">
          <Template016AddControl
            product={product}
            quantity={quantity}
            onAdd={controls.onAdd}
            onDecrease={controls.onDecrease}
          />
        </div>
      </div>

      <Template016PriceTag price={product.price} shape={shape} />
    </motion.li>
  );
}
