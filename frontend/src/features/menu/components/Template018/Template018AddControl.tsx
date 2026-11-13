"use client";

import { motion } from "framer-motion";
import { Minus, Plus } from "lucide-react";

import type { MenuProduct } from "@/features/menu/types/menu.types";
import { N018, formatNumber } from "./utils";

type Props = {
  product: MenuProduct;
  quantity: number;
  onAdd: (product: MenuProduct) => void;
  onDecrease: (product: MenuProduct) => void;
};

export default function Template018AddControl({
  product,
  quantity,
  onAdd,
  onDecrease,
}: Props) {
  if (!product.available) {
    return (
      <span
        className="rounded-md px-2.5 py-1.5 text-xs font-bold"
        style={{ border: `1px solid ${N018.lineStrong}`, color: N018.muted }}
      >
        ناموجود
      </span>
    );
  }

  if (quantity > 0) {
    return (
      <div
        className="inline-flex h-10 items-center rounded-xl"
        style={{ border: `1px solid ${N018.accent}`, color: N018.accent }}
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
      whileTap={{ scale: 0.94 }}
      aria-label={`افزودن ${product.name} به سفارش`}
      className="inline-flex h-10 items-center gap-1.5 rounded-xl px-4 text-xs font-black"
      style={{ backgroundColor: N018.accent, color: N018.bg }}
    >
      <Plus size={15} />
      افزودن
    </motion.button>
  );
}
