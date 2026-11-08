"use client";

import { useState } from "react";
import { ArrowRight, Loader2 } from "lucide-react";

import { useMenuOrder } from "@/features/menu/hooks/useMenuOrder";
import { DoubleRule, OrnamentalFrame } from "./Ornaments";
import {
  V016,
  formatNumber,
  formatPrice,
  type Template016CartItem,
} from "./utils";

type Props = {
  items: Template016CartItem[];
  total: number;
  qrToken?: string | null;
  onBack: () => void;
  onSuccess: (order: { id: string; total: number }) => void;
};

export default function Template016Checkout({
  items,
  total,
  qrToken,
  onBack,
  onSuccess,
}: Props) {
  const [name, setName] = useState("");
  const [notes, setNotes] = useState("");

  const { submitOrder, error, isLoading } = useMenuOrder();

  const handleSubmit = async () => {
    if (isLoading || !items.length) return;

    const result = await submitOrder({ items, qrToken, name, notes });

    if (!result) return;

    onSuccess(result);
  };

  const field =
    "w-full px-4 text-sm outline-none placeholder:text-[#8A715D]/70 focus:ring-1 focus:ring-[#9A6236]";

  const fieldStyle = {
    backgroundColor: V016.bg,
    border: `1px solid ${V016.border}`,
    color: V016.text,
  } as const;

  return (
    <div dir="rtl" className="mx-auto max-w-xl px-4 pb-10 pt-[max(env(safe-area-inset-top),18px)]">
      <button
        type="button"
        onClick={onBack}
        disabled={isLoading}
        className="mb-4 flex items-center gap-2 text-sm font-bold"
        style={{ color: V016.dark }}
      >
        <ArrowRight size={18} />
        بازگشت به منو
      </button>

      <OrnamentalFrame>
        <h1
          className="pb-3 text-center text-2xl font-black"
          style={{ color: V016.dark }}
        >
          ثبت سفارش
        </h1>

        <DoubleRule />

        <ul className="py-2">
          {items.map(({ product, quantity }) => (
            <li
              key={product.id}
              className="flex items-baseline gap-2 py-2"
            >
              <span className="text-sm font-bold" style={{ color: V016.dark }}>
                {product.name}
                <span className="mr-1 text-xs font-normal" style={{ color: V016.muted }}>
                  × {formatNumber(quantity)}
                </span>
              </span>

              <span
                aria-hidden
                className="flex-1 border-b border-dotted"
                style={{ borderColor: V016.border }}
              />

              <span className="text-sm font-black tabular-nums" style={{ color: V016.dark }}>
                {formatPrice(product.price * quantity)}
              </span>
            </li>
          ))}
        </ul>

        <DoubleRule />

        <div className="flex items-center justify-between py-3">
          <span className="text-sm font-bold" style={{ color: V016.muted }}>
            مبلغ کل
          </span>

          <span className="text-xl font-black" style={{ color: V016.brown }}>
            {formatPrice(total)}
          </span>
        </div>

        <div className="space-y-3 pt-2">
          <input
            value={name}
            onChange={(event) => setName(event.target.value)}
            disabled={isLoading}
            placeholder="نام شما (اختیاری)"
            aria-label="نام شما"
            className={`${field} h-12`}
            style={fieldStyle}
          />

          <textarea
            value={notes}
            onChange={(event) => setNotes(event.target.value)}
            disabled={isLoading}
            placeholder="توضیحات سفارش (اختیاری)"
            aria-label="توضیحات سفارش"
            maxLength={150}
            rows={3}
            className={`${field} resize-none py-3`}
            style={fieldStyle}
          />
        </div>

        {error && (
          <p role="alert" className="mt-3 text-sm text-red-700">
            {error}
          </p>
        )}

        <button
          type="button"
          onClick={handleSubmit}
          disabled={isLoading || !items.length}
          className="mt-5 flex h-14 w-full items-center justify-center gap-2 text-sm font-black transition-transform active:scale-[0.98] disabled:opacity-60"
          style={{
            backgroundColor: V016.brown,
            color: V016.bg,
            boxShadow: `inset 0 0 0 3px ${V016.brown}, inset 0 0 0 4px ${V016.cream}88`,
          }}
        >
          {isLoading ? (
            <>
              <Loader2 size={18} className="animate-spin" />
              در حال ثبت سفارش...
            </>
          ) : (
            "ثبت سفارش"
          )}
        </button>
      </OrnamentalFrame>
    </div>
  );
}
