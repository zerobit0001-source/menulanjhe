"use client";

import { motion } from "framer-motion";
import { Minus, Plus } from "lucide-react";

import type { MenuProduct } from "@/features/menu/types/menu.types";
import { E017, formatNumber } from "./utils";

type Props = {
  product: MenuProduct;
  quantity: number;
  onAdd: (product: MenuProduct) => void;
  onDecrease: (product: MenuProduct) => void;
};

export default function Template017AddControl({
  product,
  quantity,
  onAdd,
  onDecrease,
}: Props) {
  if (!product.available) {
    return (
      <span className="text-xs font-bold" style={{ color: E017.muted }}>
        ناموجود
      </span>
    );
  }

  if (quantity > 0) {
    return (
      <div
        className="inline-flex h-10 items-center rounded-full"
        style={{ backgroundColor: E017.accent, color: E017.surface }}
      >
        <button
          type="button"
          onClick={() => onDecrease(product)}
          aria-label={`کم کردن ${product.name}`}
          className="flex h-10 w-10 items-center justify-center"
        >
          <Minus size={15} />
        </button>

        <motion.span
          key={quantity}
          initial={{ scale: 1.3 }}
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
          aria-label={`اضافه کردن ${product.name}`}
          className="flex h-10 w-10 items-center justify-center"
        >
          <Plus size={15} />
        </button>
      </div>
    );
  }

  return (
    <motion.button
      type="button"
      onClick={() => onAdd(product)}
      whileTap={{ scale: 0.93 }}
      aria-label={`افزودن ${product.name} به سفارش`}
      className="inline-flex h-10 items-center gap-1.5 rounded-full px-4 text-xs font-bold transition-colors hover:bg-[#24221F] hover:text-[#FFFDF8]"
      style={{ border: `1px solid ${E017.text}`, color: E017.text }}
    >
      <Plus size={14} />
      افزودن
    </motion.button>
  );
}
