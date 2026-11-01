"use client";

import { useState } from "react";
import { ArrowRight, Loader2 } from "lucide-react";

import { useMenuOrder } from "@/features/menu/hooks/useMenuOrder";
import {
  T013,
  formatNumber,
  formatPrice,
  type Template013CartItem,
} from "./utils";

type Props = {
  items: Template013CartItem[];
  total: number;
  qrToken?: string | null;
  fullHeight: string;
  onBack: () => void;
  onSuccess: (order: { id: string; total: number }) => void;
};

export default function Template013Checkout({
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

  const field =
    "w-full rounded-2xl px-4 text-sm outline-none placeholder:text-[#A8A194]/60 focus:ring-1 focus:ring-[#C9AA71]/70";

  return (
    <div
      dir="rtl"
      className="overflow-y-auto"
      style={{
        minHeight: fullHeight,
        backgroundColor: T013.base,
        color: T013.text,
      }}
    >
      <div className="mx-auto max-w-2xl px-5 pb-10 pt-[max(env(safe-area-inset-top),20px)]">
        <div className="mb-7 flex items-center gap-3">
          <button
            type="button"
            onClick={onBack}
            disabled={isLoading}
            aria-label="بازگشت به منو"
            className="flex h-11 w-11 items-center justify-center rounded-full"
            style={{ backgroundColor: T013.s2 }}
          >
            <ArrowRight size={19} />
          </button>

          <div>
            <h1 className="text-lg font-black">ثبت سفارش</h1>

            <p className="mt-0.5 text-xs" style={{ color: T013.muted }}>
              سفارش خود را بررسی کنید
            </p>
          </div>
        </div>

        <section
          className="rounded-3xl p-5"
          style={{ backgroundColor: T013.s1, border: `1px solid ${T013.line}` }}
        >
          <h2 className="mb-4 text-sm font-bold" style={{ color: T013.accent }}>
            سفارش شما
          </h2>

          <ul>
            {items.map(({ product, quantity }) => (
              <li
                key={product.id}
                className="flex items-center justify-between gap-3 py-3"
                style={{ borderBottom: `1px solid ${T013.line}` }}
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-bold">{product.name}</p>

                  <p className="mt-0.5 text-xs" style={{ color: T013.muted }}>
                    {formatNumber(quantity)} عدد
                  </p>
                </div>

                <p className="shrink-0 text-sm font-bold">
                  {formatPrice(product.price * quantity)}
                </p>
              </li>
            ))}
          </ul>

          <div className="mt-4 flex justify-between">
            <span className="text-sm" style={{ color: T013.muted }}>
              مبلغ کل
            </span>

            <span className="font-black" style={{ color: T013.accent }}>
              {formatPrice(total)}
            </span>
          </div>
        </section>

        <section
          className="mt-4 rounded-3xl p-5"
          style={{ backgroundColor: T013.s1, border: `1px solid ${T013.line}` }}
        >
          <h2 className="mb-4 text-sm font-bold" style={{ color: T013.accent }}>
            اطلاعات سفارش
          </h2>

          <input
            value={name}
            onChange={(event) => setName(event.target.value)}
            disabled={isLoading}
            placeholder="نام شما (اختیاری)"
            aria-label="نام شما"
            className={`${field} h-12`}
            style={{ backgroundColor: T013.s2, color: T013.text }}
          />

          <textarea
            value={notes}
            onChange={(event) => setNotes(event.target.value)}
            disabled={isLoading}
            placeholder="توضیحات سفارش (اختیاری)"
            aria-label="توضیحات سفارش"
            maxLength={150}
            rows={3}
            className={`${field} mt-3 resize-none py-3`}
            style={{ backgroundColor: T013.s2, color: T013.text }}
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
          className="mt-6 flex h-14 w-full items-center justify-center gap-2 rounded-full text-sm font-black transition-transform active:scale-[0.98] disabled:opacity-60"
          style={{ backgroundColor: T013.accent, color: T013.accentInk }}
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
