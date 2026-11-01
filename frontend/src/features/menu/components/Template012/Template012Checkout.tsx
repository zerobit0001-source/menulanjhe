"use client";

import { useState } from "react";
import { ArrowRight, Loader2 } from "lucide-react";

import { useMenuOrder } from "@/features/menu/hooks/useMenuOrder";
import {
  T012,
  formatPrice,
  toFa,
  type Template012CartItem,
} from "./utils";

type Props = {
  items: Template012CartItem[];
  total: number;
  qrToken?: string | null;
  fullHeight: string;
  onBack: () => void;
  onSuccess: (order: { id: string; total: number }) => void;
};

export default function Template012Checkout({
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
    "w-full rounded-2xl bg-white px-4 text-sm text-[#1F2A24] outline-none ring-1 ring-black/5 placeholder:text-[#1F2A24]/40 focus:ring-2 focus:ring-[#1F6F4A]/50";

  return (
    <div
      dir="rtl"
      className="overflow-y-auto bg-[#FAF7F2]"
      style={{ minHeight: fullHeight }}
    >
      <div className="mx-auto max-w-2xl px-4 pb-10 pt-[max(env(safe-area-inset-top),20px)]">
        <div className="mb-6 flex items-center gap-3">
          <button
            type="button"
            onClick={onBack}
            disabled={isLoading}
            aria-label="بازگشت به منو"
            className="flex h-11 w-11 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-black/5"
          >
            <ArrowRight size={19} />
          </button>

          <div>
            <h1 className="text-lg font-black text-[#1F2A24]">ثبت سفارش</h1>

            <p className="mt-0.5 text-xs text-[#1F2A24]/55">
              اطلاعات سفارش خود را بررسی کنید
            </p>
          </div>
        </div>

        <section className="rounded-3xl bg-white p-4 shadow-sm ring-1 ring-black/5">
          <h2 className="mb-4 text-sm font-black text-[#1F2A24]">سفارش شما</h2>

          <ul className="space-y-3">
            {items.map(({ product, quantity }) => (
              <li
                key={product.id}
                className="flex items-center justify-between gap-3"
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-bold text-[#1F2A24]">
                    {product.name}
                  </p>

                  <p className="mt-0.5 text-xs text-[#1F2A24]/50">
                    {toFa(quantity)} عدد
                  </p>
                </div>

                <p className="shrink-0 text-sm font-black text-[#1F2A24]">
                  {formatPrice(product.price * quantity)}
                </p>
              </li>
            ))}
          </ul>

          <div className="my-4 h-px bg-black/5" />

          <div className="flex justify-between">
            <span className="text-sm text-[#1F2A24]/60">مبلغ کل</span>

            <span className="font-black text-[#1F2A24]">
              {formatPrice(total)}
            </span>
          </div>
        </section>

        <section className="mt-4 rounded-3xl bg-white p-4 shadow-sm ring-1 ring-black/5">
          <h2 className="mb-4 text-sm font-black text-[#1F2A24]">
            اطلاعات سفارش
          </h2>

          <input
            value={name}
            onChange={(event) => setName(event.target.value)}
            disabled={isLoading}
            placeholder="نام شما (اختیاری)"
            aria-label="نام شما"
            className={`${field} h-12 bg-[#FAF7F2]`}
          />

          <textarea
            value={notes}
            onChange={(event) => setNotes(event.target.value)}
            disabled={isLoading}
            placeholder="توضیحات سفارش (اختیاری)"
            aria-label="توضیحات سفارش"
            maxLength={150}
            rows={3}
            className={`${field} mt-3 resize-none bg-[#FAF7F2] py-3`}
          />
        </section>

        {error && (
          <p role="alert" className="mt-3 text-sm text-red-600">
            {error}
          </p>
        )}

        <button
          type="button"
          onClick={handleSubmit}
          disabled={isLoading || !items.length}
          className="mt-5 flex h-14 w-full items-center justify-center gap-2 rounded-full text-sm font-black text-white transition-transform active:scale-[0.98] disabled:opacity-60"
          style={{ backgroundColor: T012.accent }}
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
