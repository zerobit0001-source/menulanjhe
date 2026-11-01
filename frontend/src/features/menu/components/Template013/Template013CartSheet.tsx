"use client";

import { Minus, Plus, Trash2 } from "lucide-react";

import type { MenuProduct } from "../../types/menu.types";
import Template013Sheet from "./Template013Sheet";
import {
  T013,
  formatNumber,
  formatPrice,
  type Template013CartItem,
} from "./utils";

type Props = {
  open: boolean;
  items: Template013CartItem[];
  total: number;
  onIncrease: (product: MenuProduct) => void;
  onDecrease: (product: MenuProduct) => void;
  onRemove: (product: MenuProduct) => void;
  onCheckout: () => void;
  onClose: () => void;
};

export default function Template013CartSheet({
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
    <Template013Sheet open={open} title="سفارش شما" onClose={onClose}>
      {items.length === 0 ? (
        <div className="px-6 pb-12 pt-6 text-center">
          <p className="text-sm font-bold" style={{ color: T013.text }}>
            سفارشی ثبت نشده است
          </p>

          <p className="mt-1 text-xs" style={{ color: T013.muted }}>
            از منو، محصولات دلخواه را اضافه کنید.
          </p>
        </div>
      ) : (
        <>
          <ul
            className={`min-h-0 flex-1 overflow-y-auto px-6 ${T013.hideScrollbar}`}
          >
            {items.map(({ product, quantity }) => (
              <li
                key={product.id}
                className="flex items-center gap-3 py-4"
                style={{ borderBottom: `1px solid ${T013.line}` }}
              >
                <div
                  className="h-14 w-14 shrink-0 overflow-hidden rounded-xl"
                  style={{ backgroundColor: T013.s2 }}
                >
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
                  <p
                    className="truncate text-sm font-bold"
                    style={{ color: T013.text }}
                  >
                    {product.name}
                  </p>

                  <p className="mt-0.5 text-xs" style={{ color: T013.accent }}>
                    {formatPrice(product.price * quantity)}
                  </p>
                </div>

                <div
                  className="flex items-center rounded-full"
                  style={{ border: `1px solid ${T013.line}` }}
                >
                  <button
                    type="button"
                    onClick={() => onDecrease(product)}
                    aria-label={`کم کردن ${product.name}`}
                    className="flex h-8 w-8 items-center justify-center"
                    style={{ color: T013.muted }}
                  >
                    <Minus size={14} />
                  </button>

                  <span
                    className="w-6 text-center text-sm font-bold tabular-nums"
                    style={{ color: T013.text }}
                  >
                    {formatNumber(quantity)}
                  </span>

                  <button
                    type="button"
                    onClick={() => onIncrease(product)}
                    aria-label={`اضافه کردن ${product.name}`}
                    className="flex h-8 w-8 items-center justify-center"
                    style={{ color: T013.accent }}
                  >
                    <Plus size={14} />
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => onRemove(product)}
                  aria-label={`حذف ${product.name}`}
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full"
                  style={{ color: T013.muted }}
                >
                  <Trash2 size={16} />
                </button>
              </li>
            ))}
          </ul>

          <div className="px-6 pb-[max(env(safe-area-inset-bottom),20px)] pt-4">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-sm" style={{ color: T013.muted }}>
                مبلغ کل
              </span>

              <span className="text-lg font-black" style={{ color: T013.text }}>
                {formatPrice(total)}
              </span>
            </div>

            <button
              type="button"
              onClick={onCheckout}
              className="h-14 w-full rounded-full text-sm font-black transition-transform active:scale-[0.98]"
              style={{ backgroundColor: T013.accent, color: T013.accentInk }}
            >
              ادامه و ثبت سفارش
            </button>
          </div>
        </>
      )}
    </Template013Sheet>
  );
}
