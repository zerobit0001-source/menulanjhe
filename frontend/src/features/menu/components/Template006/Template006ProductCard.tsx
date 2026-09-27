"use client";

import { motion } from "framer-motion";
import { Minus, Plus } from "lucide-react";

import type { MenuProduct } from "@/features/menu/types/menu.types";

type Props = {
  product: MenuProduct;
  quantity: number;
  index: number;
  onAdd: (product: MenuProduct) => void;
  onIncrease: (product: MenuProduct) => void;
  onDecrease: (product: MenuProduct) => void;
};

export default function Template006ProductCard({
  product,
  quantity,
  index,
  onAdd,
  onIncrease,
  onDecrease,
}: Props) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: 0.35,
        delay: Math.min(index * 0.04, 0.2),
      }}
      whileHover={{ y: -2 }}
      className="group flex gap-4 rounded-[1.5rem] border border-white/[0.07] bg-white/[0.035] p-3 transition-colors hover:border-white/[0.14]"
    >
      <div className="h-28 w-28 shrink-0 overflow-hidden rounded-2xl bg-white/[0.04]">
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-[10px] text-white/20">
            بدون تصویر
          </div>
        )}
      </div>

      <div className="flex min-w-0 flex-1 flex-col">
        <h3 className="font-black text-white">{product.name}</h3>

        {product.description && (
          <p className="mt-1 line-clamp-2 text-xs leading-6 text-white/30">
            {product.description}
          </p>
        )}

        <div className="mt-auto flex items-end justify-between gap-3 pt-3">
          <span className="text-xs font-black text-white/70">
            {product.price.toLocaleString("fa-IR")} تومان
          </span>

          {quantity === 0 ? (
            <motion.button
              whileTap={{ scale: 0.9 }}
              type="button"
              onClick={() => onAdd(product)}
              disabled={!product.available}
              className="rounded-xl bg-white px-4 py-2 text-xs font-black text-black disabled:cursor-not-allowed disabled:opacity-30"
            >
              افزودن
            </motion.button>
          ) : (
            <div className="flex items-center gap-1 rounded-xl border border-white/10 bg-white/[0.05] p-1">
              <motion.button
                whileTap={{ scale: 0.85 }}
                type="button"
                onClick={() => onIncrease(product)}
                className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-black"
              >
                <Plus size={14} />
              </motion.button>

              <motion.span
                key={quantity}
                initial={{ scale: 0.7 }}
                animate={{ scale: 1 }}
                className="min-w-6 text-center text-xs font-black"
              >
                {quantity}
              </motion.span>

              <motion.button
                whileTap={{ scale: 0.85 }}
                type="button"
                onClick={() => onDecrease(product)}
                className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/[0.08] text-white"
              >
                <Minus size={14} />
              </motion.button>
            </div>
          )}
        </div>
      </div>
    </motion.article>
  );
}
