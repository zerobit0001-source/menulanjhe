"use client";

import { useState } from "react";
import { ArrowLeft, Loader2 } from "lucide-react";

import type { MenuProduct } from "@/features/menu/types/menu.types";
import { useMenuOrder } from "@/features/menu/hooks/useMenuOrder";

type CartItem = {
  product: MenuProduct;
  quantity: number;
};

type Props = {
  items: CartItem[];
  total: number;
  qrToken?: string | null;
  onBack: () => void;
  onSuccess: (order: { id: string; total: number }) => void;
};

export default function Template005Checkout({
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
    const result = await submitOrder({
      items,
      qrToken,
      name,
      notes,
    });

    if (!result) return;

    onSuccess(result);
  };

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-xl px-4 py-6">
        <button
          type="button"
          onClick={onBack}
          className="mb-6 flex items-center gap-2 text-sm font-bold text-slate-600"
        >
          <ArrowLeft size={18} />
          برگشت
        </button>

        <div className="rounded-[2rem] bg-white p-5 shadow-sm">
          <h1 className="text-xl font-black text-slate-950">ثبت سفارش</h1>

          <div className="mt-6 space-y-3">
            {items.map(({ product, quantity }) => (
              <div
                key={product.id}
                className="flex items-center justify-between rounded-2xl bg-slate-50 p-4"
              >
                <div>
                  <p className="text-sm font-bold">{product.name}</p>

                  <p className="mt-1 text-xs text-slate-400">
                    تعداد: {quantity}
                  </p>
                </div>

                <span className="text-sm font-black">
                  {(product.price * quantity).toLocaleString("fa-IR")} تومان
                </span>
              </div>
            ))}
          </div>

          <div className="my-6 h-px bg-slate-100" />

          <div className="space-y-4">
            <input
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="نام شما (اختیاری)"
              className="h-12 w-full rounded-xl border border-slate-200 px-4 text-sm outline-none focus:border-slate-400"
            />

            <textarea
              value={notes}
              onChange={(event) => setNotes(event.target.value)}
              placeholder="توضیحات سفارش (اختیاری)"
              rows={4}
              className="w-full resize-none rounded-xl border border-slate-200 p-4 text-sm outline-none focus:border-slate-400"
            />
          </div>

          {error && (
            <p className="mt-4 rounded-xl bg-red-50 p-3 text-xs font-bold text-red-500">
              {error}
            </p>
          )}

          <div className="mt-6 flex items-center justify-between">
            <span className="text-sm text-slate-400">مبلغ نهایی</span>

            <span className="text-lg font-black">
              {total.toLocaleString("fa-IR")} تومان
            </span>
          </div>

          <button
            type="button"
            onClick={handleSubmit}
            disabled={isLoading || !items.length}
            className="mt-5 flex h-13 w-full items-center justify-center gap-2 rounded-2xl bg-slate-950 text-sm font-black text-white disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isLoading && <Loader2 size={18} className="animate-spin" />}
            ثبت سفارش
          </button>
        </div>
      </div>
    </main>
  );
}
