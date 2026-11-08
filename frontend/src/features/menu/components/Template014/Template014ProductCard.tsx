"use client";

import { Minus, Plus } from "lucide-react";

import type { MenuProduct } from "../../types/menu.types";
import { T014, formatNumber, formatPrice } from "./utils";

type Props = {
  product: MenuProduct;
  quantity: number;
  onAdd: (product: MenuProduct) => void;
  onDecrease: (product: MenuProduct) => void;
};

/** Text-only product card: name, description, price, availability, add control. */
export default function Template014ProductCard({
  product,
  quantity,
  onAdd,
  onDecrease,
}: Props) {
  const unavailable = !product.available;

  return (
    <article
      className="flex flex-col rounded-2xl p-4"
      style={{
        backgroundColor: T014.s1,
        border: `1px solid ${T014.line}`,
        boxShadow: "0 6px 18px rgba(0,0,0,0.22)",
        opacity: unavailable ? 0.65 : 1,
      }}
    >
      <div className="flex items-start justify-between gap-3">
        <h3
          className="text-[15px] font-black leading-7"
          style={{ color: T014.text }}
        >
          {product.name}
        </h3>

        {unavailable && (
          <span
            className="shrink-0 rounded-full px-2.5 py-0.5 text-[10px] font-bold"
            style={{ backgroundColor: T014.accent2, color: T014.text }}
          >
            ناموجود
          </span>
        )}
      </div>

      {product.description && (
        <p
          className="mt-1 line-clamp-2 text-xs leading-6"
          style={{ color: T014.muted }}
        >
          {product.description}
        </p>
      )}

      <div className="mt-auto flex items-center justify-between pt-4">
        <p className="text-sm font-black" style={{ color: T014.accent }}>
          {formatPrice(product.price)}
        </p>

        {quantity > 0 ? (
          <div
            className="flex items-center rounded-full p-1"
            style={{ backgroundColor: T014.s2, border: `1px solid ${T014.line}` }}
          >
            <button
              type="button"
              onClick={() => onDecrease(product)}
              aria-label={`کم کردن ${product.name}`}
              className="flex h-8 w-8 items-center justify-center rounded-full transition-colors hover:brightness-125"
              style={{ color: T014.text }}
            >
              <Minus size={15} />
            </button>

            <span
              className="w-7 text-center text-sm font-black tabular-nums"
              style={{ color: T014.text }}
              aria-live="polite"
            >
              {formatNumber(quantity)}
            </span>

            <button
              type="button"
              onClick={() => onAdd(product)}
              disabled={unavailable}
              aria-label={`اضافه کردن ${product.name}`}
              className="flex h-8 w-8 items-center justify-center rounded-full"
              style={{ backgroundColor: T014.accent, color: T014.accentInk }}
            >
              <Plus size={15} />
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => onAdd(product)}
            disabled={unavailable}
            aria-label={`افزودن ${product.name} به سفارش`}
            className="flex h-10 items-center gap-1.5 rounded-full px-4 text-xs font-black transition-transform active:scale-95 disabled:cursor-not-allowed disabled:opacity-40"
            style={{ backgroundColor: T014.accent, color: T014.accentInk }}
          >
            <Plus size={15} />
            افزودن
          </button>
        )}
      </div>
    </article>
  );
}
