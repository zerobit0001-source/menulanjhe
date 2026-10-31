"use client";

import { useState } from "react";
import { ArrowRight, Loader2 } from "lucide-react";

import { useMenuOrder } from "@/features/menu/hooks/useMenuOrder";
import {
  T011,
  formatPrice,
  toFa,
  type Template011CartItem,
} from "./utils";

type Props = {
  items: Template011CartItem[];
  total: number;
  qrToken?: string | null;
  fullHeight: string;
  onBack: () => void;
  onSuccess: (order: { id: string; total: number }) => void;
};

export default function Template011Checkout({
  items,
  total,
  qrToken,
  fullHeight,
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

  return (
    <div
      dir="rtl"
      className="relative overflow-y-auto bg-neutral-950 text-white"
      style={{ minHeight: fullHeight }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-amber-500/20 blur-3xl"
      />

      <div className="relative mx-auto max-w-2xl px-4 pb-10 pt-[max(env(safe-area-inset-top),20px)]">
        <div className="mb-6 flex items-center gap-3">
          <button
            type="button"
            onClick={onBack}
            disabled={isLoading}
            aria-label="بازگشت به منو"
            className={`flex h-11 w-11 items-center justify-center rounded-full ${T011.glass}`}
          >
            <ArrowRight size={19} />
          </button>

          <div>
            <h1 className="text-lg font-black">ثبت سفارش</h1>

            <p className="mt-0.5 text-xs text-white/55">
              اطلاعات سفارش خود را بررسی کنید
            </p>
          </div>
        </div>

        <section className={`rounded-3xl p-4 ${T011.glass}`}>
          <h2 className="mb-4 text-sm font-bold">سفارش شما</h2>

          <ul className="space-y-3">
            {items.map(({ product, quantity }) => (
              <li
                key={product.id}
                className="flex items-center justify-between gap-3"
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold">{product.name}</p>

                  <p className="mt-0.5 text-xs text-white/55">
                    {toFa(quantity)} عدد
                  </p>
                </div>

                <p className="shrink-0 text-sm font-bold">
                  {formatPrice(product.price * quantity)}
                </p>
              </li>
            ))}
          </ul>

          <div className="my-4 h-px bg-white/10" />

          <div className="flex justify-between">
            <span className="text-sm text-white/65">مبلغ کل</span>

            <span className="font-black">{formatPrice(total)}</span>
          </div>
        </section>

        <section className={`mt-4 rounded-3xl p-4 ${T011.glass}`}>
          <h2 className="mb-4 text-sm font-bold">اطلاعات سفارش</h2>

          <input
            value={name}
            onChange={(event) => setName(event.target.value)}
            disabled={isLoading}
            placeholder="نام شما (اختیاری)"
            aria-label="نام شما"
            className="h-12 w-full rounded-2xl border border-white/15 bg-white/8 px-4 text-sm outline-none placeholder:text-white/40 focus:border-amber-300/70"
          />

          <textarea
            value={notes}
            onChange={(event) => setNotes(event.target.value)}
            disabled={isLoading}
            placeholder="توضیحات سفارش (اختیاری)"
            aria-label="توضیحات سفارش"
            maxLength={150}
            rows={3}
            className="mt-3 w-full resize-none rounded-2xl border border-white/15 bg-white/8 px-4 py-3 text-sm outline-none placeholder:text-white/40 focus:border-amber-300/70"
          />
        </section>

        {error && (
          <p role="alert" className="mt-3 text-sm text-red-400">
            {error}
          </p>
        )}

        <button
          type="button"
          onClick={handleSubmit}
          disabled={isLoading || !items.length}
          className="mt-5 flex h-14 w-full items-center justify-center gap-2 rounded-full text-sm font-black transition-transform active:scale-[0.98] disabled:opacity-60"
          style={{ backgroundColor: T011.accent, color: T011.accentInk }}
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
    </div>
  );
}
