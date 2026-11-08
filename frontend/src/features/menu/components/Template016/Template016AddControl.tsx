"use client";

import { motion } from "framer-motion";
import { Minus, Plus } from "lucide-react";

import type { MenuProduct } from "@/features/menu/types/menu.types";
import { V016, formatNumber } from "./utils";

type Props = {
  product: MenuProduct;
  quantity: number;
  onAdd: (product: MenuProduct) => void;
  onDecrease: (product: MenuProduct) => void;
  onDark?: boolean;
};

/** Small "+ افزودن" pill that becomes a stepper once the item is in the cart. */
export default function Template016AddControl({
  product,
  quantity,
  onAdd,
  onDecrease,
  onDark = false,
}: Props) {
  const ink = onDark ? V016.bg : V016.brown;
  const line = onDark ? `${V016.cream}99` : V016.border;
  const disabled = !product.available;

  if (quantity > 0) {
    return (
      <div
        className="inline-flex h-8 items-center rounded-full"
        style={{ border: `1px solid ${line}`, color: ink }}
      >
        <button
          type="button"
          onClick={() => onDecrease(product)}
          aria-label={`کم کردن ${product.name}`}
          className="flex h-8 w-8 items-center justify-center rounded-full"
        >
          <Minus size={14} />
        </button>

        <motion.span
          key={quantity}
          initial={{ scale: 1.35 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 500, damping: 16 }}
          className="w-6 text-center text-sm font-black tabular-nums"
          aria-live="polite"
        >
          {formatNumber(quantity)}
        </motion.span>

        <button
          type="button"
          onClick={() => onAdd(product)}
          disabled={disabled}
          aria-label={`اضافه کردن ${product.name}`}
          className="flex h-8 w-8 items-center justify-center rounded-full"
        >
          <Plus size={14} />
        </button>
      </div>
    );
  }

  return (
    <motion.button
      type="button"
      onClick={() => onAdd(product)}
      disabled={disabled}
      whileTap={{ scale: 0.92 }}
      aria-label={`افزودن ${product.name} به سفارش`}
      className="inline-flex h-8 items-center gap-1 rounded-full px-3 text-[11px] font-bold transition-colors disabled:cursor-not-allowed disabled:opacity-40"
      style={{ border: `1px solid ${line}`, color: ink }}
    >
      <Plus size={13} />
      افزودن
    </motion.button>
  );
}
