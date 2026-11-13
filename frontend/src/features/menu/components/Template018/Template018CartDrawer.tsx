"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";

import type { MenuProduct } from "@/features/menu/types/menu.types";
import Template018Drawer from "./Template018Drawer";
import {
  N018,
  formatNumber,
  formatPrice,
  type Template018CartItem,
} from "./utils";

type Props = {
  open: boolean;
  items: Template018CartItem[];
  total: number;
  onIncrease: (product: MenuProduct) => void;
  onDecrease: (product: MenuProduct) => void;
  onRemove: (product: MenuProduct) => void;
  onClear: () => void;
  onCheckout: () => void;
  onClose: () => void;
};

export default function Template018CartDrawer({
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
    <Template018Drawer open={open} title="سفارش شما" onClose={onClose}>
      {items.length === 0 ? (
        <div className="flex flex-col items-center px-6 pb-12 pt-10 text-center">
          <ShoppingBag size={30} style={{ color: N018.muted }} />

          <p className="mt-3 text-sm font-black">هنوز چیزی انتخاب نکرده‌اید</p>

          <p className="mt-1 text-xs" style={{ color: N018.muted }}>
            با دکمه «افزودن» کنار هر محصول، سفارش خود را بسازید.
          </p>
        </div>
      ) : (
        <>
          <ul
            className={`min-h-0 flex-1 space-y-2 overflow-y-auto px-5 py-4 ${N018.hideScrollbar}`}
          >
            <AnimatePresence initial={false}>
              {items.map(({ product, quantity }) => (
                <motion.li
                  key={product.id}
                  layout="position"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="rounded-xl p-3.5"
                  style={{
                    border: `1px solid ${N018.line}`,
                    backgroundColor: N018.panel,
                  }}
                >
                  <div className="flex items-start justify-between gap-3">
                    <p className="text-sm font-black leading-6">{product.name}</p>

                    <p
                      className="shrink-0 text-sm font-black tabular-nums"
                      style={{ color: N018.accent }}
                    >
                      {formatPrice(product.price * quantity)}
                    </p>
                  </div>

                  <div className="mt-3 flex items-center justify-between">
                    <div
                      className="inline-flex h-9 items-center rounded-lg"
                      style={{ border: `1px solid ${N018.lineStrong}` }}
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
                      className="flex h-10 w-10 items-center justify-center rounded-lg"
                      style={{ color: N018.muted }}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>

          <div
            className="px-5 pb-[max(env(safe-area-inset-bottom),18px)] pt-4"
            style={{ borderTop: `1px solid ${N018.line}` }}
          >
            <div className="flex items-baseline justify-between pb-4">
              <span className="text-sm font-bold" style={{ color: N018.muted }}>
                مجموع
              </span>

              <span className="text-2xl font-black" style={{ color: N018.accent }}>
                {formatPrice(total)}
              </span>
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={onCheckout}
                className="h-12 flex-1 rounded-xl text-sm font-black transition-transform active:scale-[0.98]"
                style={{ backgroundColor: N018.accent, color: N018.bg }}
              >
                ادامه و ثبت سفارش
              </button>

              <button
                type="button"
                onClick={onClear}
                className="h-12 rounded-xl px-4 text-xs font-bold"
                style={{ border: `1px solid ${N018.lineStrong}` }}
              >
                پاک کردن
              </button>
            </div>
          </div>
        </>
      )}
    </Template018Drawer>
  );
}
