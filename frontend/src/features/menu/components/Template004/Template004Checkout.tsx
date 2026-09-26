"use client";

import { useState } from "react";
import { ArrowLeft, Loader2 } from "lucide-react";

import { useMenuOrder } from "@/features/menu/hooks/useMenuOrder";
import type { MenuProduct } from "@/features/menu/types/menu.types";

type CartItem = { product: MenuProduct; quantity: number };

type Props = {
  items: CartItem[];
  total: number;
  qrToken?: string | null;
  onBack: () => void;
  onSuccess: (order: { id: string; total: number }) => void;
};

export default function Template004Checkout({
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
    const result = await submitOrder({ items, qrToken, name, notes });
    if (!result) return;
    onSuccess(result);
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-2xl px-4 py-6">
        <div className="mb-6 flex items-center gap-3">
          <button
            type="button"
            onClick={onBack}
            className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gray-100"
          >
            <ArrowLeft size={18} />
          </button>

          <div>
            <h1 className="text-lg font-black text-gray-900">ثبت سفارش</h1>
            <p className="mt-0.5 text-xs text-gray-400">
              اطلاعات سفارش خود را بررسی کنید
            </p>
          </div>
        </div>

        <div className="rounded-3xl bg-gray-50 p-4">
          <h2 className="mb-4 text-sm font-bold text-gray-900">سفارش شما</h2>

          <div className="flex flex-col gap-3">
            {items.map((item) => (
              <div
                key={item.product.id}
                className="flex items-center justify-between gap-3"
              >
                <div>
                  <p className="text-sm font-semibold text-gray-800">
                    {item.product.name}
                  </p>
                  <p className="mt-1 text-xs text-gray-400">
                    {item.quantity} عدد
                  </p>
                </div>
                <p className="text-sm font-bold text-gray-900">
                  {(item.product.price * item.quantity).toLocaleString(
                    "fa-IR",
                  )}{" "}
                  تومان
                </p>
              </div>
            ))}
          </div>

          <div className="my-4 h-px bg-gray-200" />

          <div className="flex justify-between">
            <span className="text-sm text-gray-500">مبلغ کل</span>
            <span className="font-black text-gray-900">
              {total.toLocaleString("fa-IR")} تومان
            </span>
          </div>
        </div>

        <div className="mt-4 rounded-3xl bg-gray-50 p-4">
          <h2 className="mb-4 text-sm font-bold text-gray-900">
            اطلاعات سفارش
          </h2>

          <input
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="نام شما"
            className="h-11 w-full rounded-2xl bg-white px-3 text-sm outline-none ring-1 ring-gray-200 placeholder:text-gray-400"
          />

          <textarea
            value={notes}
            onChange={(event) => setNotes(event.target.value)}
            placeholder="توضیحات سفارش"
            maxLength={150}
            rows={3}
            className="mt-4 w-full resize-none rounded-2xl bg-white px-3 py-3 text-sm outline-none ring-1 ring-gray-200 placeholder:text-gray-400"
          />
        </div>

        {error && <p className="mt-3 text-sm text-red-500">{error}</p>}

        <button
          type="button"
          disabled={isLoading || !items.length}
          onClick={handleSubmit}
          className="mt-4 flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-[#FF9F1C] text-sm font-bold text-white transition hover:opacity-90 disabled:opacity-50"
        >
          {isLoading ? (
            <>
              <Loader2 size={18} className="animate-spin" />
              در حال ثبت سفارش...
            </>
          ) : (
            <>
              ثبت سفارش
              <ArrowLeft size={18} />
            </>
          )}
        </button>
      </div>
    </div>
  );
}
