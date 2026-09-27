"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus, X } from "lucide-react";

import type { MenuProduct } from "@/features/menu/types/menu.types";

type CartItem = {
  product: MenuProduct;
  quantity: number;
};

type Props = {
  open: boolean;
  onClose: () => void;
  items: CartItem[];
  total: number;
  onIncrease: (product: MenuProduct) => void;
  onDecrease: (product: MenuProduct) => void;
  onRemove: (product: MenuProduct) => void;
  onCheckout: () => void;
};

export default function Template006CartDrawer({
  open,
  onClose,
  items,
  total,
  onIncrease,
  onDecrease,
  onRemove,
  onCheckout,
}: Props) {
  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[100]">
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            type="button"
            onClick={onClose}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          />

          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{
              type: "spring",
              damping: 28,
              stiffness: 260,
            }}
            className="absolute bottom-0 left-0 right-0 mx-auto max-h-[88vh] max-w-xl overflow-hidden rounded-t-[2rem] border border-white/10 bg-[#101114]"
          >
            <div className="flex items-center justify-between border-b border-white/[0.07] px-5 py-4">
              <div>
                <p className="text-[10px] uppercase tracking-[0.2em] text-white/25">
                  Order
                </p>

                <h2 className="mt-1 font-black">سبد خرید</h2>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/[0.06] text-white/50"
              >
                <X size={17} />
              </button>
            </div>

            <div className="max-h-[55vh] overflow-y-auto p-5">
              {items.length === 0 ? (
                <div className="py-16 text-center text-sm text-white/30">
                  سبد خرید خالی است.
                </div>
              ) : (
                <div className="space-y-3">
                  {items.map(({ product, quantity }) => (
                    <motion.div
                      layout
                      key={product.id}
                      className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-4"
                    >
                      <div className="flex justify-between gap-3">
                        <div>
                          <p className="text-sm font-bold">{product.name}</p>

                          <p className="mt-1 text-xs text-white/30">
                            {product.price.toLocaleString("fa-IR")} تومان
                          </p>
                        </div>

                        <button
                          type="button"
                          onClick={() => onRemove(product)}
                          className="text-xs text-red-400/70"
                        >
                          حذف
                        </button>
                      </div>

                      <div className="mt-3 flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => onIncrease(product)}
                          className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-black"
                        >
                          <Plus size={14} />
                        </button>

                        <span className="min-w-6 text-center text-xs font-black">
                          {quantity}
                        </span>

                        <button
                          type="button"
                          onClick={() => onDecrease(product)}
                          className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/[0.07] text-white"
                        >
                          <Minus size={14} />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            <div className="border-t border-white/[0.07] p-5">
              <div className="mb-4 flex items-center justify-between">
                <span className="text-xs text-white/30">مبلغ کل</span>

                <span className="font-black">
                  {total.toLocaleString("fa-IR")} تومان
                </span>
              </div>

              <button
                type="button"
                onClick={onCheckout}
                disabled={!items.length}
                className="w-full rounded-2xl bg-white py-4 text-sm font-black text-black disabled:opacity-30"
              >
                ادامه سفارش
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
