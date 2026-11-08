"use client";

import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";

import type { MenuProduct } from "@/features/menu/types/menu.types";
import { DoubleRule } from "./Ornaments";
import Template016Sheet from "./Template016Sheet";
import {
  V016,
  formatNumber,
  formatPrice,
  type Template016CartItem,
} from "./utils";

type Props = {
  open: boolean;
  items: Template016CartItem[];
  total: number;
  onIncrease: (product: MenuProduct) => void;
  onDecrease: (product: MenuProduct) => void;
  onRemove: (product: MenuProduct) => void;
  onClear: () => void;
  onCheckout: () => void;
  onClose: () => void;
};

/** The cart reads like a printed check: dotted leaders, double-ruled total. */
export default function Template016CartSheet({
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
    <Template016Sheet open={open} title="صورت‌حساب سفارش" onClose={onClose}>
      {items.length === 0 ? (
        <div className="flex flex-col items-center px-6 pb-12 pt-8 text-center">
          <ShoppingBag size={30} style={{ color: V016.beige }} />

          <p className="mt-3 text-sm font-black" style={{ color: V016.dark }}>
            هنوز چیزی انتخاب نکرده‌اید
          </p>

          <p className="mt-1 text-xs" style={{ color: V016.muted }}>
            با دکمه «افزودن» کنار هر محصول، سفارش خود را بسازید.
          </p>
        </div>
      ) : (
        <>
          <ul
            className={`min-h-0 flex-1 overflow-y-auto px-6 pt-2 ${V016.hideScrollbar}`}
          >
            {items.map(({ product, quantity }) => (
              <li
                key={product.id}
                className="py-3"
                style={{ borderBottom: `1px dotted ${V016.border}` }}
              >
                <div className="flex items-baseline gap-2">
                  <p className="text-sm font-black" style={{ color: V016.dark }}>
                    {product.name}
                  </p>

                  <span
                    aria-hidden
                    className="flex-1 border-b border-dotted"
                    style={{ borderColor: V016.border }}
                  />

                  <p className="text-sm font-black tabular-nums" style={{ color: V016.dark }}>
                    {formatPrice(product.price * quantity)}
                  </p>
                </div>

                <div className="mt-2 flex items-center justify-between">
                  <div
                    className="inline-flex h-8 items-center rounded-full"
                    style={{ border: `1px solid ${V016.border}`, color: V016.brown }}
                  >
                    <button
                      type="button"
                      onClick={() => onDecrease(product)}
                      aria-label={`کم کردن ${product.name}`}
                      className="flex h-8 w-8 items-center justify-center"
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
                      className="flex h-8 w-8 items-center justify-center"
                    >
                      <Plus size={14} />
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => onRemove(product)}
                    aria-label={`حذف ${product.name}`}
                    className="flex h-8 w-8 items-center justify-center rounded-full"
                    style={{ color: V016.muted }}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <div className="px-6 pb-[max(env(safe-area-inset-bottom),18px)] pt-3">
            <DoubleRule />

            <div className="flex items-center justify-between py-3">
              <span className="text-sm font-bold" style={{ color: V016.muted }}>
                مجموع
              </span>

              <span className="text-xl font-black" style={{ color: V016.dark }}>
                {formatPrice(total)}
              </span>
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={onCheckout}
                className="h-12 flex-1 text-sm font-black transition-transform active:scale-[0.98]"
                style={{
                  backgroundColor: V016.brown,
                  color: V016.bg,
                  boxShadow: `inset 0 0 0 3px ${V016.brown}, inset 0 0 0 4px ${V016.cream}88`,
                }}
              >
                ادامه و ثبت سفارش
              </button>

              <button
                type="button"
                onClick={onClear}
                className="h-12 px-4 text-xs font-bold"
                style={{ border: `1px solid ${V016.border}`, color: V016.dark }}
              >
                پاک کردن
              </button>
            </div>
          </div>
        </>
      )}
    </Template016Sheet>
  );
}
