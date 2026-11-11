"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";

import type { MenuProduct } from "@/features/menu/types/menu.types";
import Template017Sheet from "./Template017Sheet";
import {
  E017,
  formatNumber,
  formatPrice,
  type Template017CartItem,
} from "./utils";

type Props = {
  open: boolean;
  items: Template017CartItem[];
  total: number;
  onIncrease: (product: MenuProduct) => void;
  onDecrease: (product: MenuProduct) => void;
  onRemove: (product: MenuProduct) => void;
  onClear: () => void;
  onCheckout: () => void;
  onClose: () => void;
};

export default function Template017CartSheet({
  open,
  items,
  total,
  onIncrease,
  onDecrease,
  onRemove,
  onClear,
  onCheckout,
  onClose,
}: Props) {
  return (
    <Template017Sheet open={open} title="سفارش شما" onClose={onClose}>
      {items.length === 0 ? (
        <div className="flex flex-col items-center px-6 pb-12 pt-6 text-center">
          <ShoppingBag size={30} style={{ color: E017.muted }} />

          <p className="mt-3 text-sm font-black">هنوز چیزی انتخاب نکرده‌اید</p>

          <p className="mt-1 text-xs" style={{ color: E017.muted }}>
            با دکمه «افزودن» کنار هر محصول، سفارش خود را بسازید.
          </p>
        </div>
      ) : (
        <>
          <ul
            className={`min-h-0 flex-1 overflow-y-auto px-6 ${E017.hideScrollbar}`}
          >
            <AnimatePresence initial={false}>
              {items.map(({ product, quantity }) => (
                <motion.li
                  key={product.id}
                  layout="position"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden py-4"
                  style={{ borderTop: `1px solid ${E017.border}` }}
                >
                  <div className="flex items-baseline justify-between gap-3">
                    <p className="text-base font-black">{product.name}</p>

                    <p
                      className="shrink-0 text-sm font-black tabular-nums"
                      style={{ color: E017.accent }}
                    >
                      {formatPrice(product.price * quantity)}
                    </p>
                  </div>

                  <div className="mt-3 flex items-center justify-between">
                    <div
                      className="inline-flex h-9 items-center rounded-full"
                      style={{ border: `1px solid ${E017.border}` }}
                    >
                      <button
                        type="button"
                        onClick={() => onDecrease(product)}
                        aria-label={`کم کردن ${product.name}`}
                        className="flex h-9 w-9 items-center justify-center"
                      >
                        <Minus size={14} />
                      </button>

                      <span className="w-6 text-center text-sm font-black tabular-nums">
                        {formatNumber(quantity)}
                      </span>

                      <button
                        type="button"
                        onClick={() => onIncrease(product)}
                        aria-label={`اضافه کردن ${product.name}`}
                        className="flex h-9 w-9 items-center justify-center"
                      >
                        <Plus size={14} />
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() => onRemove(product)}
                      aria-label={`حذف ${product.name}`}
                      className="flex h-10 w-10 items-center justify-center rounded-full"
                      style={{ color: E017.muted }}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>

          <div
            className="px-6 pb-[max(env(safe-area-inset-bottom),18px)] pt-4"
            style={{ borderTop: `1px solid ${E017.text}` }}
          >
            <div className="flex items-baseline justify-between pb-4">
              <span className="text-sm font-bold" style={{ color: E017.muted }}>
                مجموع
              </span>

              <span className="text-2xl font-black">{formatPrice(total)}</span>
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={onCheckout}
                className="h-12 flex-1 rounded-full text-sm font-black transition-transform active:scale-[0.98]"
                style={{ backgroundColor: E017.accent, color: E017.surface }}
              >
                ادامه و ثبت سفارش
              </button>

              <button
                type="button"
                onClick={onClear}
                className="h-12 rounded-full px-5 text-xs font-bold"
                style={{ border: `1px solid ${E017.border}` }}
              >
                پاک کردن
              </button>
            </div>
          </div>
        </>
      )}
    </Template017Sheet>
  );
}
