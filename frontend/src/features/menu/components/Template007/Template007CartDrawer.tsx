"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";

import type { MenuProduct } from "@/features/menu/types/menu.types";

type CartItem = { product: MenuProduct; quantity: number };

type Props = {
  open: boolean;
  onClose: () => void;
  items: CartItem[];
  onIncrease: (product: MenuProduct) => void;
  onDecrease: (product: MenuProduct) => void;
  onRemove: (product: MenuProduct) => void;
  total: number;
  onCheckout: () => void;
};

export default function Template007CartDrawer({
  open,
  onClose,
  items,
  onIncrease,
  onDecrease,
  onRemove,
  total,
  onCheckout,
}: Props) {
  const itemsCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
          />

          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 340, damping: 34 }}
            className="fixed inset-x-0 bottom-0 z-50 mx-auto max-w-2xl rounded-t-[28px] border-t border-[#F5EBDD]/[0.08] bg-[#18110C]/95 backdrop-blur-xl"
          >
            <div className="flex items-center justify-between border-b border-[#F5EBDD]/[0.08] px-5 py-4">
              <div>
                <p className="text-sm font-bold text-[#F5EBDD]">سبد سفارش</p>
                <p className="text-xs text-[#CDBEAE]">{itemsCount} آیتم</p>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-[#241811] text-[#F5EBDD]"
              >
                <X size={16} />
              </button>
            </div>

            <div className="max-h-[50vh] overflow-y-auto px-5">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16">
                  <div className="mb-3 flex h-16 w-16 items-center justify-center rounded-full border border-[#F5EBDD]/[0.08] bg-[#241811]">
                    <ShoppingBag size={26} className="text-[#5A4B3D]" />
                  </div>
                  <p className="text-sm font-bold text-[#F5EBDD]">
                    سبد سفارش خالیه
                  </p>
                  <p className="mt-1 text-xs text-[#CDBEAE]">
                    غذای مورد علاقه‌ات رو اضافه کن
                  </p>
                </div>
              ) : (
                <motion.div layout className="flex flex-col">
                  <AnimatePresence initial={false}>
                    {items.map((item) => (
                      <motion.div
                        key={item.product.id}
                        layout
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="flex gap-3 border-b border-[#F5EBDD]/[0.06] py-4 last:border-b-0"
                      >
                        <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-[#241811]">
                          {item.product.image ? (
                            <img
                              src={item.product.image}
                              alt={item.product.name}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <ShoppingBag size={20} className="text-[#5A4B3D]" />
                          )}
                        </div>

                        <div className="flex min-w-0 flex-1 flex-col">
                          <div className="flex items-start justify-between gap-2">
                            <p className="text-sm font-bold text-[#F5EBDD]">
                              {item.product.name}
                            </p>
                            <button
                              type="button"
                              onClick={() => onRemove(item.product)}
                              className="flex h-6 w-6 items-center justify-center text-[#8A7A6C]"
                            >
                              <Trash2 size={13} />
                            </button>
                          </div>

                          <p className="mt-1 text-xs text-[#CDBEAE]">
                            {item.product.price.toLocaleString("fa-IR")} تومان
                          </p>

                          <div className="mt-auto flex items-center justify-between pt-2">
                            <div className="flex items-center gap-2 rounded-full border border-[#F5EBDD]/[0.08] px-1 py-1">
                              <button
                                type="button"
                                onClick={() => onDecrease(item.product)}
                                className="flex h-6 w-6 items-center justify-center text-[#F5EBDD]"
                              >
                                <Minus size={13} />
                              </button>

                              <motion.span
                                key={item.quantity}
                                initial={{ scale: 0.6 }}
                                animate={{ scale: 1 }}
                                transition={{
                                  type: "spring",
                                  stiffness: 500,
                                  damping: 20,
                                }}
                                className="w-4 text-center text-xs font-bold text-[#F5EBDD]"
                              >
                                {item.quantity}
                              </motion.span>

                              <button
                                type="button"
                                onClick={() => onIncrease(item.product)}
                                className="flex h-6 w-6 items-center justify-center text-[#F5EBDD]"
                              >
                                <Plus size={13} />
                              </button>
                            </div>

                            <p className="text-sm font-bold text-[#B98252]">
                              {(
                                item.product.price * item.quantity
                              ).toLocaleString("fa-IR")}{" "}
                              تومان
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </motion.div>
              )}
            </div>

            {items.length > 0 && (
              <div className="px-5 pb-6 pt-4">
                <div className="mb-4 flex items-center justify-between border-t border-[#F5EBDD]/[0.08] pt-4">
                  <span className="text-sm font-bold text-[#F5EBDD]">
                    مبلغ نهایی
                  </span>
                  <span className="text-lg font-black text-[#B98252]">
                    {total.toLocaleString("fa-IR")} تومان
                  </span>
                </div>

                <motion.button
                  type="button"
                  onClick={onCheckout}
                  whileTap={{ scale: 0.98 }}
                  className="h-12 w-full rounded-2xl bg-[#B98252] text-sm font-bold text-[#18110C] transition-colors hover:bg-[#CDA173]"
                >
                  ثبت سفارش
                </motion.button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
