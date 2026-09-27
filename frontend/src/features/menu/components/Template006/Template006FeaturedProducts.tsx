"use client";

import { motion } from "framer-motion";
import { Plus } from "lucide-react";

import type { MenuProduct } from "@/features/menu/types/menu.types";

type Props = {
  products: MenuProduct[];
  onAdd: (product: MenuProduct) => void;
};

export default function Template006FeaturedProducts({
  products,
  onAdd,
}: Props) {
  if (!products.length) return null;

  return (
    <section className="mx-auto max-w-5xl px-4 pb-8">
      <div className="mb-5">
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/25">
          Featured
        </p>

        <h2 className="mt-2 text-2xl font-black">محبوب‌ترین‌ها</h2>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {products.slice(0, 4).map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.4,
              delay: index * 0.08,
            }}
            className="group flex overflow-hidden rounded-[1.5rem] border border-white/[0.07] bg-white/[0.035]"
          >
            <div className="h-32 w-32 shrink-0 bg-white/[0.04]">
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

            <div className="flex min-w-0 flex-1 flex-col justify-between p-4">
              <div>
                <h3 className="font-black text-white">{product.name}</h3>

                {product.description && (
                  <p className="mt-1 line-clamp-2 text-xs leading-6 text-white/30">
                    {product.description}
                  </p>
                )}
              </div>

              <div className="mt-3 flex items-center justify-between gap-2">
                <span className="text-xs font-black text-white/70">
                  {product.price.toLocaleString("fa-IR")} تومان
                </span>

                <motion.button
                  whileTap={{ scale: 0.9 }}
                  type="button"
                  onClick={() => onAdd(product)}
                  disabled={!product.available}
                  className="flex h-8 w-8 items-center justify-center rounded-xl bg-white text-black disabled:opacity-30"
                >
                  <Plus size={15} />
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
