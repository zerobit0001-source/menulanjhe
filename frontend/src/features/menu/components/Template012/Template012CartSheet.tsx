"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";

import type { MenuProduct } from "../../types/menu.types";
import {
  T012,
  formatPrice,
  toFa,
  type Template012CartItem,
} from "./utils";

type Props = {
  open: boolean;
  items: Template012CartItem[];
  total: number;
  onIncrease: (product: MenuProduct) => void;
  onDecrease: (product: MenuProduct) => void;
  onRemove: (product: MenuProduct) => void;
  onCheckout: () => void;
  onClose: () => void;
};

export default function Template012CartSheet({
  open,
  items,
  total,
  onIncrease,
  onDecrease,
  onRemove,
  onCheckout,
  onClose,
}: Props) {
  useEffect(() => {
    if (!open) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            key="backdrop"
            aria-hidden
            className="absolute inset-0 z-50 bg-black/35 backdrop-blur-[2px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          <motion.section
            key="sheet"
            role="dialog"
            aria-modal="true"
            aria-label="سبد سفارش"
            className="absolute inset-x-0 bottom-0 z-[60] mx-auto flex max-h-[85%] w-full max-w-2xl flex-col rounded-t-[28px] bg-[#FAF7F2] shadow-2xl"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 32, stiffness: 320 }}
          >
            <div className="flex items-center justify-between px-5 pb-3 pt-5">
              <h2 className="text-base font-black text-[#1F2A24]">
                سبد سفارش
              </h2>

              <button
                type="button"
                onClick={onClose}
                aria-label="بستن سبد"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-black/5 text-[#1F2A24] hover:bg-black/10"
              >
                <X size={18} />
              </button>
            </div>

            {items.length === 0 ? (
              <div className="flex flex-col items-center px-6 pb-12 pt-6 text-center">
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-black/5 text-[#1F2A24]/50">
                  <ShoppingBag size={28} />
                </span>

                <p className="mt-4 text-sm font-black text-[#1F2A24]">
                  سبد سفارش خالی است
                </p>

                <p className="mt-1 text-xs text-[#1F2A24]/55">
                  با دکمه + محصولات را اضافه کنید.
                </p>
              </div>
            ) : (
              <>
                <ul
                  className={`flex-1 space-y-3 overflow-y-auto px-5 pb-4 ${T012.hideScrollbar}`}
                >
                  {items.map(({ product, quantity }) => (
                    <li
                      key={product.id}
                      className="flex items-center gap-3 rounded-2xl bg-white p-2.5 shadow-sm ring-1 ring-black/5"
                    >
                      <div className="h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-[#EFE9DE]">
                        {product.image ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={product.image}
                            alt=""
                            className="h-full w-full object-cover"
                          />
                        ) : null}
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-black text-[#1F2A24]">
                          {product.name}
                        </p>

                        <p
                          className="mt-0.5 text-xs font-bold"
                          style={{ color: T012.accent }}
                        >
                          {formatPrice(product.price * quantity)}
                        </p>

                        <div className="mt-2 flex items-center gap-1">
                          <button
                            type="button"
                            onClick={() => onDecrease(product)}
                            aria-label={`کم کردن ${product.name}`}
                            className="flex h-7 w-7 items-center justify-center rounded-full bg-black/5 hover:bg-black/10"
                          >
                            <Minus size={14} />
                          </button>

                          <span className="w-8 text-center text-sm font-black tabular-nums">
                            {toFa(quantity)}
                          </span>

                          <button
                            type="button"
                            onClick={() => onIncrease(product)}
                            aria-label={`اضافه کردن ${product.name}`}
                            className="flex h-7 w-7 items-center justify-center rounded-full text-white"
                            style={{ backgroundColor: T012.accent }}
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => onRemove(product)}
                        aria-label={`حذف ${product.name}`}
                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-red-500 hover:bg-red-50"
                      >
                        <Trash2 size={17} />
                      </button>
                    </li>
                  ))}
                </ul>

                <div className="border-t border-black/5 px-5 pb-[max(env(safe-area-inset-bottom),20px)] pt-4">
                  <div className="mb-3 flex items-center justify-between">
                    <span className="text-sm text-[#1F2A24]/60">مبلغ کل</span>

                    <span className="text-lg font-black text-[#1F2A24]">
                      {formatPrice(total)}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={onCheckout}
                    className="h-14 w-full rounded-full text-sm font-black text-white transition-transform active:scale-[0.98]"
                    style={{ backgroundColor: T012.accent }}
                  >
                    ادامه و ثبت سفارش
                  </button>
                </div>
              </>
            )}
          </motion.section>
        </>
      )}
    </AnimatePresence>
  );
}
