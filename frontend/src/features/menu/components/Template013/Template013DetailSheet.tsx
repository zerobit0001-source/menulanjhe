"use client";

import { Minus, Plus, X } from "lucide-react";

import type { MenuProduct } from "../../types/menu.types";
import Template013Sheet from "./Template013Sheet";
import { T013, formatNumber, formatPrice } from "./utils";

type Props = {
  product: MenuProduct | null;
  quantity: number;
  onAdd: (product: MenuProduct) => void;
  onDecrease: (product: MenuProduct) => void;
  onClose: () => void;
};

/** Progressive disclosure: full description and image only on demand. */
export default function Template013DetailSheet({
  product,
  quantity,
  onAdd,
  onDecrease,
  onClose,
}: Props) {
  const disabled = !product?.available;

  return (
    <Template013Sheet
      open={Boolean(product)}
      title={product?.name ?? "جزئیات محصول"}
      onClose={onClose}
      hideTitle
      maxHeight="92%"
    >
      {product && (
        <div className="flex min-h-0 flex-1 flex-col overflow-y-auto">
          <div className="relative">
            <div
              className="aspect-4/3 w-full overflow-hidden"
              style={{ backgroundColor: T013.s2 }}
            >
              {product.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div
                  aria-hidden
                  className="flex h-full w-full items-center justify-center text-7xl font-black"
                  style={{ color: T013.s3 }}
                >
                  {product.name.trim().charAt(0)}
                </div>
              )}
            </div>

            <div
              aria-hidden
              className="absolute inset-x-0 bottom-0 h-24"
              style={{
                background: `linear-gradient(to top, ${T013.s1}, transparent)`,
              }}
            />

            <button
              type="button"
              onClick={onClose}
              aria-label="بستن"
              className="absolute left-4 top-3 flex h-9 w-9 items-center justify-center rounded-full backdrop-blur-md"
              style={{ backgroundColor: "rgba(20,19,17,0.6)", color: T013.text }}
            >
              <X size={17} />
            </button>
          </div>

          <div className="px-6 pb-3">
            <h2 className="text-xl font-black" style={{ color: T013.text }}>
              {product.name}
            </h2>

            <p className="mt-1 text-lg font-bold" style={{ color: T013.accent }}>
              {formatPrice(product.price)}
            </p>

            {product.description && (
              <p
                className="mt-3 text-sm leading-7"
                style={{ color: T013.muted }}
              >
                {product.description}
              </p>
            )}
          </div>

          <div
            className="mt-auto px-6 pb-[max(env(safe-area-inset-bottom),20px)] pt-3"
            style={{ borderTop: `1px solid ${T013.line}` }}
          >
            {quantity > 0 ? (
              <div className="flex h-14 items-center justify-between rounded-full px-2"
                style={{ backgroundColor: T013.s2 }}
              >
                <button
                  type="button"
                  onClick={() => onDecrease(product)}
                  aria-label="کم کردن"
                  className="flex h-10 w-10 items-center justify-center rounded-full"
                  style={{ backgroundColor: T013.s3, color: T013.text }}
                >
                  <Minus size={17} />
                </button>

                <span
                  className="text-base font-black tabular-nums"
                  style={{ color: T013.text }}
                  aria-live="polite"
                >
                  {formatNumber(quantity)} عدد در سفارش
                </span>

                <button
                  type="button"
                  onClick={() => onAdd(product)}
                  disabled={disabled}
                  aria-label="اضافه کردن"
                  className="flex h-10 w-10 items-center justify-center rounded-full"
                  style={{ backgroundColor: T013.accent, color: T013.accentInk }}
                >
                  <Plus size={17} />
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => onAdd(product)}
                disabled={disabled}
                className="h-14 w-full rounded-full text-sm font-black transition-transform active:scale-[0.98] disabled:opacity-40"
                style={{ backgroundColor: T013.accent, color: T013.accentInk }}
              >
                {disabled ? "ناموجود" : "افزودن به سفارش"}
              </button>
            )}
          </div>
        </div>
      )}
    </Template013Sheet>
  );
}
