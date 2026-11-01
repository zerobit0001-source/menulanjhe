"use client";

import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";

import type { MenuProduct } from "../../types/menu.types";
import Template011Sheet from "./Template011Sheet";
import {
  T011,
  formatPrice,
  toFa,
  type Template011CartItem,
} from "./utils";

type Props = {
  open: boolean;
  items: Template011CartItem[];
  total: number;
  onIncrease: (product: MenuProduct) => void;
  onDecrease: (product: MenuProduct) => void;
  onRemove: (product: MenuProduct) => void;
  onCheckout: () => void;
  onClose: () => void;
};

export default function Template011CartSheet({
  open,
  items,
  total,
  onIncrease,
  onDecrease,
  onRemove,
  onCheckout,
  onClose,
}: Props) {
  return (
    <Template011Sheet open={open} title="سبد سفارش" onClose={onClose}>
      {items.length === 0 ? (
        <div className="flex flex-col items-center px-6 pb-12 pt-6 text-center text-white/70">
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/10">
            <ShoppingBag size={28} />
          </span>

          <p className="mt-4 text-sm font-bold text-white">سبد سفارش خالی است</p>

          <p className="mt-1 text-xs">محصولات دلخواه را به سفارش اضافه کنید.</p>
        </div>
      ) : (
        <>
          <ul
            className={`flex-1 space-y-3 overflow-y-auto px-5 pb-4 ${T011.hideScrollbar}`}
          >
            {items.map(({ product, quantity }) => (
              <li
                key={product.id}
                className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/8 p-2.5"
              >
                <div className="h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-white/10">
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
                  <p className="truncate text-sm font-bold">{product.name}</p>

                  <p className="mt-0.5 text-xs text-white/60">
                    {formatPrice(product.price * quantity)}
                  </p>

                  <div className="mt-2 flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => onDecrease(product)}
                      aria-label={`کم کردن ${product.name}`}
                      className="flex h-7 w-7 items-center justify-center rounded-full bg-white/12 hover:bg-white/25"
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
                      className="flex h-7 w-7 items-center justify-center rounded-full bg-white/12 hover:bg-white/25"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => onRemove(product)}
                  aria-label={`حذف ${product.name}`}
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-red-300 hover:bg-red-500/20"
                >
                  <Trash2 size={17} />
                </button>
              </li>
            ))}
          </ul>

          <div className="border-t border-white/10 px-5 pb-[max(env(safe-area-inset-bottom),20px)] pt-4">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-sm text-white/70">مبلغ کل</span>

              <span className="text-lg font-black">{formatPrice(total)}</span>
            </div>

            <button
              type="button"
              onClick={onCheckout}
              disabled={items.length === 0}
              className="h-14 w-full rounded-full text-sm font-black transition-transform active:scale-[0.98] disabled:opacity-50"
              style={{ backgroundColor: T011.accent, color: T011.accentInk }}
            >
              ادامه و ثبت سفارش
            </button>
          </div>
        </>
      )}
    </Template011Sheet>
  );
}
