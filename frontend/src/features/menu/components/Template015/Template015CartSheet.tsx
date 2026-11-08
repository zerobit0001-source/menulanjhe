"use client";

import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";

import type { MenuProduct } from "@/features/menu/types/menu.types";
import Template015Sheet from "./Template015Sheet";
import {
  P015,
  formatNumber,
  formatPrice,
  type Template015CartItem,
} from "./utils";

type Props = {
  open: boolean;
  items: Template015CartItem[];
  total: number;
  onIncrease: (product: MenuProduct) => void;
  onDecrease: (product: MenuProduct) => void;
  onRemove: (product: MenuProduct) => void;
  onCheckout: () => void;
  onClose: () => void;
};

export default function Template015CartSheet({
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
    <Template015Sheet open={open} title="سبد سفارش" onClose={onClose}>
      {items.length === 0 ? (
        <div className="flex flex-col items-center px-6 pb-12 pt-6 text-center">
          <span
            className="flex h-16 w-16 items-center justify-center rounded-full"
            style={{ backgroundColor: P015.soft, color: P015.accentStrong }}
          >
            <ShoppingBag size={28} />
          </span>

          <p className="mt-4 text-sm font-black">سبد سفارش خالی است</p>

          <p className="mt-1 text-xs" style={{ color: P015.muted }}>
            از منو، محصولات دلخواه را اضافه کنید.
          </p>
        </div>
      ) : (
        <>
          <ul
            className={`min-h-0 flex-1 overflow-y-auto px-6 ${P015.hideScrollbar}`}
          >
            {items.map(({ product, quantity }) => (
              <li
                key={product.id}
                className="flex items-center gap-3 py-4"
                style={{ borderBottom: `1px solid ${P015.border}` }}
              >
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-black">{product.name}</p>

                  <p
                    className="mt-0.5 text-xs font-bold"
                    style={{ color: P015.accentStrong }}
                  >
                    {formatPrice(product.price * quantity)}
                  </p>
                </div>

                <div
                  className="flex items-center rounded-full p-1"
                  style={{ backgroundColor: P015.soft }}
                >
                  <button
                    type="button"
                    onClick={() => onDecrease(product)}
                    aria-label={`کم کردن ${product.name}`}
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-white"
                    style={{ color: P015.accentStrong }}
                  >
                    <Minus size={14} />
                  </button>

                  <span className="w-7 text-center text-sm font-black tabular-nums">
                    {formatNumber(quantity)}
                  </span>

                  <button
                    type="button"
                    onClick={() => onIncrease(product)}
                    aria-label={`اضافه کردن ${product.name}`}
                    className="flex h-8 w-8 items-center justify-center rounded-full text-white"
                    style={{ backgroundColor: P015.accentStrong }}
                  >
                    <Plus size={14} />
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => onRemove(product)}
                  aria-label={`حذف ${product.name}`}
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full"
                  style={{ color: P015.muted }}
                >
                  <Trash2 size={16} />
                </button>
              </li>
            ))}
          </ul>

          <div className="px-6 pb-[max(env(safe-area-inset-bottom),20px)] pt-4">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-sm" style={{ color: P015.muted }}>
                {formatNumber(items.reduce((sum, item) => sum + item.quantity, 0))} مورد · مبلغ کل
              </span>

              <span className="text-lg font-black">{formatPrice(total)}</span>
            </div>

            <button
              type="button"
              onClick={onCheckout}
              className="h-14 w-full rounded-full text-sm font-black text-white transition-transform active:scale-[0.98]"
              style={{ backgroundColor: P015.accentStrong }}
            >
              ادامه و ثبت سفارش
            </button>
          </div>
        </>
      )}
    </Template015Sheet>
  );
}
