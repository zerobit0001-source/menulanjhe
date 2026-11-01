"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus } from "lucide-react";

import type { MenuProduct } from "../../types/menu.types";
import { T012, formatPrice, toFa } from "./utils";

type Props = {
  product: MenuProduct;
  quantity: number;
  index: number;
  onAdd: (product: MenuProduct) => void;
  onDecrease: (product: MenuProduct) => void;
};

export default function Template012ProductCard({
  product,
  quantity,
  index,
  onAdd,
  onDecrease,
}: Props) {
  const [imageFailed, setImageFailed] = useState(false);
  const showImage = Boolean(product.image) && !imageFailed;
  const disabled = !product.available;

  return (
    <motion.article
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: Math.min(index, 12) * 0.03 }}
      className={`flex flex-col overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-black/5 ${
        disabled ? "opacity-60" : ""
      }`}
    >
      <div className="relative aspect-square w-full overflow-hidden bg-[#EFE9DE]">
        {showImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            draggable={false}
            onError={() => setImageFailed(true)}
            className="h-full w-full object-cover"
          />
        ) : (
          <div
            aria-hidden
            className="flex h-full w-full items-center justify-center text-5xl font-black text-[#1F2A24]/15"
          >
            {product.name.trim().charAt(0)}
          </div>
        )}

        {disabled && (
          <span className="absolute right-2 top-2 rounded-full bg-black/60 px-2.5 py-1 text-[10px] font-bold text-white backdrop-blur-md">
            ناموجود
          </span>
        )}

        {/* Plus / stepper */}
        <div className="absolute bottom-2 left-2">
          <AnimatePresence mode="wait" initial={false}>
            {quantity > 0 ? (
              <motion.div
                key="stepper"
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.85 }}
                transition={{ duration: 0.15 }}
                className="flex items-center gap-0.5 rounded-full bg-white p-1 shadow-md ring-1 ring-black/5"
              >
                <button
                  type="button"
                  onClick={() => onDecrease(product)}
                  aria-label={`کم کردن ${product.name}`}
                  className="flex h-8 w-8 items-center justify-center rounded-full text-[#1F2A24] hover:bg-black/5"
                >
                  <Minus size={15} />
                </button>

                <span
                  className="w-6 text-center text-sm font-black tabular-nums"
                  aria-live="polite"
                >
                  {toFa(quantity)}
                </span>

                <button
                  type="button"
                  onClick={() => onAdd(product)}
                  disabled={disabled}
                  aria-label={`اضافه کردن ${product.name}`}
                  className="flex h-8 w-8 items-center justify-center rounded-full text-white disabled:opacity-40"
                  style={{ backgroundColor: T012.accent }}
                >
                  <Plus size={15} />
                </button>
              </motion.div>
            ) : (
              <motion.button
                key="plus"
                type="button"
                onClick={() => onAdd(product)}
                disabled={disabled}
                aria-label={`افزودن ${product.name} به سفارش`}
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.85 }}
                whileTap={{ scale: 0.88 }}
                transition={{ duration: 0.15 }}
                className="flex h-10 w-10 items-center justify-center rounded-full text-white shadow-lg disabled:cursor-not-allowed disabled:opacity-40"
                style={{ backgroundColor: T012.accent }}
              >
                <Plus size={20} />
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-1 p-3">
        <h3 className="line-clamp-2 text-sm font-black leading-6 text-[#1F2A24]">
          {product.name}
        </h3>

        {product.description && (
          <p className="line-clamp-1 text-[11px] text-[#1F2A24]/50">
            {product.description}
          </p>
        )}

        <p
          className="mt-auto pt-1 text-sm font-black"
          style={{ color: T012.accent }}
        >
          {formatPrice(product.price)}
        </p>
      </div>
    </motion.article>
  );
}
