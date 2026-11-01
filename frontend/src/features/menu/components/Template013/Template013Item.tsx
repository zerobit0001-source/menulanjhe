"use client";

import { useState } from "react";
import { Minus, Plus } from "lucide-react";

import type { MenuProduct } from "../../types/menu.types";
import { T013, formatNumber } from "./utils";

type Props = {
  product: MenuProduct;
  quantity: number;
  signature: boolean;
  onOpen: (product: MenuProduct) => void;
  onAdd: (product: MenuProduct) => void;
  onDecrease: (product: MenuProduct) => void;
};

/** Editorial menu row: photo, name + description, hairline, price, quick add. */
export default function Template013Item({
  product,
  quantity,
  signature,
  onOpen,
  onAdd,
  onDecrease,
}: Props) {
  const [failed, setFailed] = useState(false);
  const hasImage = Boolean(product.image) && !failed;
  const disabled = !product.available;

  return (
    <article
      className={`flex gap-4 py-5 ${disabled ? "opacity-50" : ""}`}
      style={{ borderBottom: `1px solid ${T013.line}` }}
    >
      <button
        type="button"
        onClick={() => onOpen(product)}
        aria-label={`جزئیات ${product.name}`}
        className="h-24 w-24 shrink-0 overflow-hidden rounded-2xl"
        style={{ backgroundColor: T013.s2 }}
      >
        {hasImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={product.image}
            alt=""
            loading="lazy"
            draggable={false}
            onError={() => setFailed(true)}
            className="h-full w-full object-cover"
          />
        ) : (
          <span
            aria-hidden
            className="flex h-full w-full items-center justify-center text-3xl font-black"
            style={{ color: T013.s3 }}
          >
            {product.name.trim().charAt(0)}
          </span>
        )}
      </button>

      <div className="flex min-w-0 flex-1 flex-col">
        <button
          type="button"
          onClick={() => onOpen(product)}
          className="text-right"
        >
          <div className="flex items-center gap-2">
            <h3
              className="truncate text-[15px] font-bold"
              style={{ color: T013.text }}
            >
              {product.name}
            </h3>

            {signature && (
              <span
                className="shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold"
                style={{
                  color: T013.accent,
                  border: `1px solid ${T013.accent}66`,
                }}
              >
                ویژه
              </span>
            )}
          </div>

          {product.description && (
            <p
              className="mt-1 line-clamp-2 text-xs leading-6"
              style={{ color: T013.muted }}
            >
              {product.description}
            </p>
          )}
        </button>

        <div className="mt-auto flex items-center justify-between pt-2">
          <p className="text-sm font-bold" style={{ color: T013.accent }}>
            {disabled ? (
              <span style={{ color: T013.muted }}>ناموجود</span>
            ) : (
              formatNumber(product.price)
            )}
          </p>

          {quantity > 0 ? (
            <div
              className="flex items-center rounded-full"
              style={{ border: `1px solid ${T013.accent}80` }}
            >
              <button
                type="button"
                onClick={() => onDecrease(product)}
                aria-label={`کم کردن ${product.name}`}
                className="flex h-8 w-8 items-center justify-center rounded-full"
                style={{ color: T013.accent }}
              >
                <Minus size={14} />
              </button>

              <span
                className="w-6 text-center text-sm font-bold tabular-nums"
                style={{ color: T013.text }}
                aria-live="polite"
              >
                {formatNumber(quantity)}
              </span>

              <button
                type="button"
                onClick={() => onAdd(product)}
                disabled={disabled}
                aria-label={`اضافه کردن ${product.name}`}
                className="flex h-8 w-8 items-center justify-center rounded-full"
                style={{ color: T013.accent }}
              >
                <Plus size={14} />
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => onAdd(product)}
              disabled={disabled}
              aria-label={`افزودن ${product.name} به سفارش`}
              className="flex h-8 w-8 items-center justify-center rounded-full transition-colors active:scale-90 disabled:cursor-not-allowed"
              style={{
                border: `1px solid ${disabled ? T013.line : `${T013.accent}80`}`,
                color: disabled ? T013.muted : T013.accent,
              }}
            >
              <Plus size={15} />
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
