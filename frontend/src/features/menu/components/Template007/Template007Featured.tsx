"use client";

import { motion } from "framer-motion";
import { Plus, UtensilsCrossed } from "lucide-react";
import type { MenuProduct } from "@/features/menu/types/menu.types";

type Props = {
  products: MenuProduct[];
  onAdd: (product: MenuProduct) => void;
};

export default function Template007Featured({ products, onAdd }: Props) {
  return (
    <section className="mb-8">
      <p className="mb-3 text-sm font-bold tracking-wide text-[#B98252]">
        پیشنهاد ویژه
      </p>

      <div className="flex gap-4 overflow-x-auto pb-2 [scrollbar-width:none]">
        {products.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            whileHover={{ y: -3 }}
            className="group relative w-56 shrink-0 overflow-hidden rounded-2xl border border-[#F5EBDD]/[0.08] bg-[#241811] transition-colors duration-300 hover:border-[#B98252]/40"
          >
            <div className="h-32 w-full overflow-hidden bg-[#2B1C13]">
              {product.image ? (
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.05]"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center">
                  <UtensilsCrossed size={24} className="text-[#5A4B3D]" />
                </div>
              )}
            </div>

            <div className="p-3">
              <p className="line-clamp-1 text-sm font-bold text-[#F5EBDD]">
                {product.name}
              </p>
              <div className="mt-2 flex items-center justify-between">
                <span className="text-xs font-bold text-[#B98252]">
                  {product.price.toLocaleString("fa-IR")} تومان
                </span>

                <button
                  type="button"
                  onClick={() => onAdd(product)}
                  disabled={!product.available}
                  className="flex h-7 w-7 items-center justify-center rounded-full bg-[#B98252] text-[#18110C] disabled:opacity-40"
                >
                  <Plus size={14} />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
