"use client";

import { useState } from "react";
import { IconButton } from "@mui/material";
import { Minus, Plus, ShoppingBag } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

import type { MenuProduct } from "../../types/menu.types";

type ModernProductCardProps = {
  product: MenuProduct;
};

export default function ModernProductCard({ product }: ModernProductCardProps) {
  const [quantity, setQuantity] = useState(0);

  const isAdded = quantity > 0;

  const addToCart = () => {
    setQuantity(1);
  };

  const increaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const decreaseQuantity = () => {
    setQuantity((prev) => Math.max(0, prev - 1));
  };

  return (
    <motion.article
      layout
      whileTap={{ scale: 0.985 }}
      transition={{
        duration: 0.2,
        ease: "easeOut",
      }}
      className="group overflow-hidden rounded-3xl border border-zinc-200/70 bg-white shadow-sm select-none"
    >
      <div className="flex gap-4 p-3">
        {/* Product Image */}
        <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-2xl bg-zinc-100">
          {product.image ? (
            <motion.img
              src={product.image}
              alt={product.name}
              className="h-full w-full object-cover"
              whileHover={{ scale: 1.06 }}
              transition={{ duration: 0.35 }}
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-zinc-300">
              <ShoppingBag size={28} strokeWidth={1.5} />
            </div>
          )}

          {/* Image overlay */}
          <div className="pointer-events-none absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/5" />
        </div>

        {/* Content */}
        <div className="flex min-w-0 flex-1 flex-col py-1">
          <div>
            <h3 className="truncate text-base font-bold text-zinc-900">
              {product.name}
            </h3>

            {product.description && (
              <p className="mt-1 line-clamp-2 text-xs leading-5 text-zinc-500">
                {product.description}
              </p>
            )}
          </div>

          {/* Bottom */}
          <div className="mt-auto flex items-center justify-between gap-3 pt-3">
            <span className="whitespace-nowrap text-sm font-bold text-zinc-900">
              {product.price.toLocaleString("fa-IR")}
              <span className="mr-1 text-[10px] font-medium text-zinc-400">
                تومان
              </span>
            </span>

            <AnimatePresence mode="wait" initial={false}>
              {!isAdded ? (
                <motion.div
                  key="add"
                  initial={{ scale: 0.7, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.7, opacity: 0 }}
                >
                  <IconButton
                    onClick={addToCart}
                    aria-label={`افزودن ${product.name} به سبد`}
                    sx={{
                      width: 38,
                      height: 38,
                      backgroundColor: "#18181b",
                      color: "#fff",

                      "&:hover": {
                        backgroundColor: "#27272a",
                      },

                      "&:active": {
                        transform: "scale(0.92)",
                      },
                    }}
                  >
                    <Plus size={19} strokeWidth={2.2} />
                  </IconButton>
                </motion.div>
              ) : (
                <motion.div
                  key="quantity"
                  initial={{ scale: 0.7, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.7, opacity: 0 }}
                  className="flex items-center gap-1 rounded-full bg-zinc-100 p-1"
                >
                  <IconButton
                    onClick={decreaseQuantity}
                    aria-label="کاهش تعداد"
                    sx={{
                      width: 30,
                      height: 30,
                      color: "#18181b",
                    }}
                  >
                    <Minus size={16} />
                  </IconButton>

                  <motion.span
                    key={quantity}
                    initial={{ y: -5, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="min-w-5 text-center text-sm font-bold text-zinc-900"
                  >
                    {quantity}
                  </motion.span>

                  <IconButton
                    onClick={increaseQuantity}
                    aria-label="افزایش تعداد"
                    sx={{
                      width: 30,
                      height: 30,
                      backgroundColor: "#18181b",
                      color: "#fff",

                      "&:hover": {
                        backgroundColor: "#27272a",
                      },
                    }}
                  >
                    <Plus size={16} />
                  </IconButton>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
