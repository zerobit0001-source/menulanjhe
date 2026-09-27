"use client";

import { motion } from "framer-motion";
import { Minus, Plus, UtensilsCrossed } from "lucide-react";
import type { MenuProduct } from "@/features/menu/types/menu.types";

type Props = {
  product: MenuProduct;
  index: number;
  quantity: number;
  onAdd: () => void;
  onIncrease: () => void;
  onDecrease: () => void;
};

export default function Template006ProductCard({
  product,
  index,
  quantity,
  onAdd,
  onIncrease,
  onDecrease,
}: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.35, delay: Math.min(index * 0.04, 0.3) }}
      whileHover={{ y: -2 }}
      className={`
        group flex gap-3 overflow-hidden rounded-2xl border border-[#F5EBDD]/[0.08] bg-[#241811] p-3
        transition-colors duration-300 hover:border-[#B98252]/40
        ${!product.available ? "opacity-40" : ""}
      `}
    >
      <div className="h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-[#2B1C13]">
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <UtensilsCrossed size={22} className="text-[#5A4B3D]" />
          </div>
        )}
      </div>

      <div className="flex min-w-0 flex-1 flex-col">
        <p className="text-sm font-bold text-[#F5EBDD]">{product.name}</p>

        {product.description && (
          <p className="mt-1 line-clamp-2 text-xs leading-5 text-[#CDBEAE]">
            {product.description}
          </p>
        )}

        <div className="mt-auto flex items-center justify-between pt-2">
          {!product.available ? (
            <span className="text-[11px] font-semibold text-[#CDBEAE]">
              ناموجود
            </span>
          ) : (
            <span className="text-sm font-bold text-[#B98252]">
              {product.price.toLocaleString("fa-IR")} تومان
            </span>
          )}

          {product.available &&
            (quantity === 0 ? (
              <button
                type="button"
                onClick={onAdd}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-[#B98252] text-[#18110C] transition-colors hover:bg-[#CDA173]"
              >
                <Plus size={15} />
              </button>
            ) : (
              <div className="flex items-center gap-2 rounded-full border border-[#F5EBDD]/[0.1] bg-[#18110C] px-1.5 py-1">
                <button
                  type="button"
                  onClick={onIncrease}
                  className="flex h-6 w-6 items-center justify-center text-[#F5EBDD]"
                >
                  <Plus size={13} />
                </button>

                <motion.span
                  key={quantity}
                  initial={{ scale: 0.6 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 500, damping: 20 }}
                  className="w-4 text-center text-xs font-bold text-[#F5EBDD]"
                >
                  {quantity}
                </motion.span>

                <button
                  type="button"
                  onClick={onDecrease}
                  className="flex h-6 w-6 items-center justify-center text-[#F5EBDD]"
                >
                  <Minus size={13} />
                </button>
              </div>
            ))}
        </div>
      </div>
    </motion.div>
  );
}
