"use client";

import { useState } from "react";
import { ArrowRight, Loader2 } from "lucide-react";

import { useMenuOrder } from "@/features/menu/hooks/useMenuOrder";
import { CornerTicks, TechLabel } from "./TechDetails";
import {
  N018,
  formatNumber,
  formatPrice,
  type Template018CartItem,
} from "./utils";

type Props = {
  items: Template018CartItem[];
  total: number;
  qrToken?: string | null;
  onBack: () => void;
  onSuccess: (order: { id: string; total: number }) => void;
};

export default function Template018Checkout({
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
    "w-full rounded-xl px-4 text-sm outline-none placeholder:text-[#D9DADC]/50 focus:border-[#FFC93C]";

  const fieldStyle = {
    backgroundColor: N018.panel,
    border: `1px solid ${N018.lineStrong}`,
    color: N018.fg,
  } as const;

  return (
    <div dir="rtl" className="mx-auto max-w-xl px-5 pb-12 pt-[max(env(safe-area-inset-top),18px)]">
      <button
        type="button"
        onClick={onBack}
        disabled={isLoading}
        className="mb-8 flex items-center gap-2 text-sm font-bold"
      >
        <ArrowRight size={18} />
        بازگشت به منو
      </button>

      <TechLabel accent>checkout</TechLabel>

      <h1 className="mb-6 text-3xl font-black leading-tight">ثبت سفارش</h1>

      <div
        className="relative rounded-2xl p-4"
        style={{ border: `1px solid ${N018.line}`, backgroundColor: N018.panel }}
      >
        <CornerTicks />

        <ul>
          {items.map(({ product, quantity }) => (
            <li
              key={product.id}
              className="flex items-baseline justify-between gap-3 py-2.5"
              style={{ borderBottom: `1px dashed ${N018.line}` }}
            >
              <span className="text-sm font-bold">
                {product.name}
                <span className="mr-2 text-xs font-normal" style={{ color: N018.muted }}>
                  × {formatNumber(quantity)}
                </span>
              </span>

              <span className="shrink-0 text-sm font-black tabular-nums">
                {formatPrice(product.price * quantity)}
              </span>
            </li>
          ))}
        </ul>

        <div className="flex items-baseline justify-between pt-4">
          <span className="text-sm font-bold" style={{ color: N018.muted }}>
            مبلغ کل
          </span>

          <span className="text-2xl font-black" style={{ color: N018.accent }}>
            {formatPrice(total)}
          </span>
        </div>
      </div>

      <div className="mt-5 space-y-3">
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
        <p
          role="alert"
          className="mt-3 rounded-lg px-3 py-2 text-sm font-bold"
          style={{ border: `1px solid ${N018.accent}`, color: N018.accent }}
        >
          {error}
        </p>
      )}

      <button
        type="button"
        onClick={handleSubmit}
        disabled={isLoading || !items.length}
        className="mt-6 flex h-14 w-full items-center justify-center gap-2 rounded-xl text-sm font-black transition-transform active:scale-[0.98] disabled:opacity-60"
        style={{ backgroundColor: N018.accent, color: N018.bg }}
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
    </div>
  );
}
