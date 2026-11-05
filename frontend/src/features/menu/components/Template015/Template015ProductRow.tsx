"use client";

import { motion, type Variants } from "framer-motion";
import { Minus, Plus } from "lucide-react";

import type { MenuProduct } from "@/features/menu/types/menu.types";
import { P015, formatNumber, formatPrice } from "./utils";

type Props = {
  product: MenuProduct;
  quantity: number;
  onAdd: (product: MenuProduct) => void;
  onDecrease: (product: MenuProduct) => void;
};

/** Item variants; the staggering is driven by the parent list. */
export const rowVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.28, ease: "easeOut" } },
};

/** Text-only row: name, description, price, availability, add control. */
export default function Template015ProductRow({
  product,
  quantity,
  onAdd,
  onDecrease,
}: Props) {
  const unavailable = !product.available;

  return (
    <motion.li
      variants={rowVariants}
      whileHover={unavailable ? undefined : { backgroundColor: "rgba(242,229,220,0.45)" }}
      className="flex items-center justify-between gap-4 rounded-2xl px-3 py-3.5"
      style={{ opacity: unavailable ? 0.6 : 1 }}
    >
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="text-[15px] font-black leading-6">{product.name}</h3>

          {unavailable && (
            <span
              className="rounded-full px-2 py-0.5 text-[10px] font-bold"
              style={{ backgroundColor: P015.soft, color: P015.accentStrong }}
            >
              ناموجود
            </span>
          )}
        </div>

        {product.description && (
          <p
            className="mt-0.5 line-clamp-2 text-xs leading-6"
            style={{ color: P015.muted }}
          >
            {product.description}
          </p>
        )}

        <p
          className="mt-1.5 text-sm font-black"
          style={{ color: P015.accentStrong }}
        >
          {formatPrice(product.price)}
        </p>
      </div>

      {quantity > 0 ? (
        <div
          className="flex shrink-0 items-center rounded-full p-1"
          style={{ backgroundColor: P015.soft }}
        >
          <button
            type="button"
            onClick={() => onDecrease(product)}
            aria-label={`کم کردن ${product.name}`}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-white"
            style={{ color: P015.accentStrong }}
          >
            <Minus size={15} />
          </button>

          <span
            className="w-7 text-center text-sm font-black tabular-nums"
            aria-live="polite"
          >
            {formatNumber(quantity)}
          </span>

          <button
            type="button"
            onClick={() => onAdd(product)}
            disabled={unavailable}
            aria-label={`اضافه کردن ${product.name}`}
            className="flex h-8 w-8 items-center justify-center rounded-full text-white"
            style={{ backgroundColor: P015.accentStrong }}
          >
            <Plus size={15} />
          </button>
        </div>
      ) : (
        <motion.button
          type="button"
          onClick={() => onAdd(product)}
          disabled={unavailable}
          whileTap={{ scale: 0.94 }}
          aria-label={`افزودن ${product.name} به سفارش`}
          className="flex h-10 shrink-0 items-center gap-1.5 rounded-full px-4 text-xs font-black text-white disabled:cursor-not-allowed disabled:opacity-40"
          style={{ backgroundColor: P015.accentStrong }}
        >
          <Plus size={15} />
          افزودن
        </motion.button>
      )}
    </motion.li>
  );
}
